import type { NextApiRequest, NextApiResponse } from 'next'

// 간단한 서버 콜백: access_token을 검증하고 세션 쿠키를 설정한 뒤 리다이렉트
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { access_token } = req.query
        if (!access_token || typeof access_token !== 'string') {
            res.status(400).json({ success: false, message: 'Missing access_token' })
            return
        }

        // 1) 카카오 API로 토큰 검증 및 사용자 정보 조회
        const userResp = await fetch('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })

        if (!userResp.ok) {
            res.status(401).json({ success: false, message: 'Invalid access token' })
            return
        }

        const user = await userResp.json()

        // 2) 여기서 사용자 upsert 등 비즈니스 로직 수행 (목업)
        // TODO: DB에 사용자 저장/업데이트

        // 3) 서버 세션 생성 후 HttpOnly; Secure 쿠키 설정 (목업 토큰)
        const sessionToken = `sess_${user.id}_${Date.now()}`

        // 프로덕션 배포시 Secure 추가(HTTPS)
        const isProd = process.env.NODE_ENV === 'production'
        const cookie = [
            `session=${encodeURIComponent(sessionToken)}`,
            'Path=/',
            'HttpOnly',
            isProd ? 'Secure' : undefined,
            'SameSite=Lax',
            'Max-Age=2592000' // 30d
        ].filter(Boolean).join('; ')

        res.setHeader('Set-Cookie', cookie)

        // 4) 앱 페이지로 리다이렉트
        res.writeHead(302, { Location: '/dashboard' })
        res.end()
    } catch (err) {
        console.error('Kakao server callback error:', err)
        res.status(500).json({ success: false, message: 'Server error' })
    }
}


