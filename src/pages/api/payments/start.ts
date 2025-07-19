import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const JWT_SECRET = process.env.NEXTAUTH_SECRET!
const TTL_SECONDS = 5 * 60 // 5 min

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const token = jwt.sign(
    {
      step: 'initialSession',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TTL_SECONDS,
    },
    JWT_SECRET,
  )

  res.setHeader(
    'Set-Cookie',
    serialize('payment_jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: TTL_SECONDS,
    }),
  )

  res.status(200).json({ ok: true })
}
