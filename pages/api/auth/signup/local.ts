import type { NextApiRequest, NextApiResponse } from 'next'

// 클라이언트 -> 이 API -> 백엔드 POST -> 세션 쿠키 설정 -> /dashboard 리다이렉트 응답
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method not allowed' })
        return
    }

    try {
        const { email, password } = req.body || {}
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' })
            return
        }

        const backendUrl = process.env.BACKEND_URL

        // 1) 백엔드에 회원가입 위임
        const resp = await fetch(`${backendUrl}/api/v1/auth/signup/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await resp.json().catch(() => ({}))
        console.error(data)
        if (data.success) {
            res.status(200).json({ success: true })
            return
        } else {
            res.status(400).json({
                success: false,
                code: data.error.code,
                message: data.error.message
            })
            return
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            code: error.code,
            message: error.message
        })
        return
    }
}


