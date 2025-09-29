import crypto from 'crypto'
import { setSession } from '@/lib/redis'

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

        // 1) 백엔드에 로그인 위임
        const resp = await fetch(`${backendUrl}/api/v1/auth/signin/local`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await resp.json().catch(() => ({}))

        if (data.success) {
            const sessionToken = crypto.randomUUID()
            const expireDays = 30
            const expireSeconds = expireDays * 24 * 60 * 60
            await setSession(sessionToken, String(data.user.id), expireSeconds)
            res.status(200).json({ success: true, sessionToken: sessionToken })
            return
        } else {
            if (data.code === 'USER_PASSWORD_MISMATCH') {
                res.status(401).json({ success: false, message: '비밀번호가 일치하지 않습니다.' })
                return
            }
            else if (data.code === 'USER_NOT_FOUND') {
                res.status(401).json({ success: false, message: '존재하지 않는 사용자입니다.' })
                return
            }
            // 기타 오류 처리
            res.status(400).json({
                success: false,
                code: data.error?.code,
                message: data.error?.message || '로그인에 실패했습니다.'
            })
            return
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            code: error.code,
            message: '예상치 못한 오류가 발생했습니다 : ' + error.message
        })
        return
    }
}
