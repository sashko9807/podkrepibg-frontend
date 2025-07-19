import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { serialize } from 'cookie'
import { apiClient } from 'service/apiClient'

const JWT_SECRET = process.env.NEXTAUTH_SECRET!
const BACKEND_SECRET = process.env.PG_PAYLOAD_SECRET!
const TTL_SECONDS = 5 * 60 // same expiration

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const token = req.cookies['payment_jwt']
  let payload: any
  try {
    payload = jwt.verify(token || '', JWT_SECRET)
  } catch {
    return res.status(401).json({ error: 'Invalid or missing session token' })
  }

  if (payload.step !== 'initialSession') {
    return res.status(400).json({ error: 'Session already initialized' })
  }

  try {
    // 1) Sign the request body
    const body = JSON.stringify(req.body)
    const signature = crypto.createHmac('sha256', BACKEND_SECRET).update(body).digest('hex')

    // 2) Create the payment session with backend
    const response = await apiClient.post('/iris-pay/create-payment-session', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-pbg-signature': signature,
      },
    })

    const { hookHash, userHash } = response.data

    // 3) Re‑issue token with next step
    const newToken = jwt.sign(
      {
        step: 'paymentSessionCreated',
        hookHash,
        userHash,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + TTL_SECONDS,
      },
      JWT_SECRET,
    )

    res.setHeader(
      'Set-Cookie',
      serialize('payment_jwt', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: TTL_SECONDS,
      }),
    )

    res.status(200).json({ hookHash, userHash })
  } catch (error: any) {
    console.error('Error creating payment session:', error)
    return res.status(500).json({
      error: 'Failed to create payment session',
      details: error.response?.data || error.message,
    })
  }
}
