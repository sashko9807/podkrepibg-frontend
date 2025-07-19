import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { apiClient } from 'service/apiClient'
import { serialize } from 'cookie'
import { IrisHookHash } from 'components/client/iris-pay/IRISPayComponent'

const JWT_SECRET = process.env.NEXTAUTH_SECRET!
const BACKEND_SECRET = process.env.PG_PAYLOAD_SECRET!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  // 1) Verify JWT and step
  const token = req.cookies['payment_jwt']
  let payload: any
  try {
    payload = jwt.verify(token || '', JWT_SECRET)
  } catch {
    return res.status(401).json({ error: 'Invalid or missing session token' })
  }

  if (payload.step !== 'paymentSessionCreated') {
    return res.status(400).json({ error: 'Payment session not created or already completed' })
  }

  // 2) Get the payment data from request body
  const paymentData = req.body
  if (!paymentData || !paymentData.hookHash || !paymentData.metadata) {
    return res.status(400).json({ error: 'Invalid payment data' })
  }

  const paymentSignature = crypto
    .createHmac('sha256', BACKEND_SECRET)
    .update(JSON.stringify({ hookHash: paymentData.hookHash }))
    .digest('hex')
  const payment = await apiClient.post<IrisHookHash>(
    '/iris-pay/verify-payment',
    { hookHash: paymentData.hookHash },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-pbg-signature': paymentSignature,
      },
    },
  )

  if (payment.status !== 200) {
    console.error(payment)
    return res.status(400).json({ error: 'Payment verification failed' })
  }

  // 3) Build & sign payload for backend
  const bodyObj = {
    hookHash: paymentData.hookHash,
    status: payment.data.status,
    amount: Number(payment.data.sum) * 100,
    billingName: paymentData.billingName,
    billingEmail: paymentData.billingEmail,
    metadata: paymentData.metadata,
  }
  const body = JSON.stringify(bodyObj)
  const signature = crypto.createHmac('sha256', BACKEND_SECRET).update(body).digest('hex')

  // 4) Forward to internal backend
  const backendRes = await apiClient.post(`/iris-pay/finish`, bodyObj, {
    headers: {
      'Content-Type': 'application/json',
      'x-pbg-signature': signature,
    },
  })

  if (backendRes.status !== 200) {
    console.error(backendRes.data)
    return res.status(502).json({ error: 'Backend rejected payment' })
  }

  // 5) Clear the cookie
  res.setHeader(
    'Set-Cookie',
    serialize('payment_jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    }),
  )

  return res.status(200).json({ success: true })
}
