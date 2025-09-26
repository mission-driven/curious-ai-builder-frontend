import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteSession } from '@/lib/redis'

/**
 * 로그아웃 API
 * 세션 쿠키를 삭제하고 Redis에서 세션을 제거합니다
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ success: false, message: 'Method not allowed' })
        return
    }

    try {
        // 쿠키에서 세션 토큰 추출
        const sessionToken = req.cookies.session

        if (!sessionToken) {
            res.status(400).json({ success: false, message: 'No session found' })
            return
        }

        // Redis에서 세션 삭제
        await deleteSession(sessionToken)

        // 쿠키 삭제 (과거 날짜로 설정)
        res.setHeader('Set-Cookie', [
            'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        ])

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })

    } catch (error) {
        console.error('Logout error:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}