import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ success: false, message: 'Method Not Allowed' })
    }

    // 세션 쿠키 만료 (즉시 만료시키는 Set-Cookie 전송)
    const isProd = process.env.NODE_ENV === 'production'
    const cookie = [
        'session=; Path=/',
        'HttpOnly',
        isProd ? 'Secure' : undefined,
        'SameSite=Lax',
        'Max-Age=0'
    ].filter(Boolean).join('; ')

    res.setHeader('Set-Cookie', cookie)

    // 클라이언트에서 후속 이동을 위해 200 반환
    return res.status(200).json({ success: true })
}


