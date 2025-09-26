import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setSession } from '@/lib/redis'


// 간단한 서버 콜백: access_token을 검증하고 세션 쿠키를 설정한 뒤 리다이렉트
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { access_token, type } = req.query

        if (!access_token || typeof access_token !== 'string') {
            res.status(400).json({ success: false, message: 'Missing access_token' })
            return
        }

        // 1) 카카오 API로 토큰 검증 및 사용자 정보 조회
        const userResp = await getKakaoUserInfo(access_token)

        if (!userResp.ok) {
            res.status(401).json({ success: false, message: 'Invalid access token' })
            return
        }

        const userFromKakao = await userResp.json()
        const provider_user_id = userFromKakao.id.toString()

        // 2) 백앤드 서버에 회원가입 또는 로그인 요청
        let respone = null
        if (type === 'signin') {
            respone = await requestSigninWithKakao(provider_user_id)
        }
        else if (type === 'signup') {
            respone = await requestSignupWithKakao(provider_user_id)
        }
        else {
            res.status(400).json({ success: false, message: `Invalid type: ${type}` })
            return
        }


        // 3) 백앤드 서버에서 회원가입 또는 로그인 요청 결과 처리
        if (respone.success) {
            console.log('ok')
        }
        else if (type === 'signin' && respone.error.code === 'OAUTH_USER_NOT_FOUND') {
            // 사용자가 회원가입이 안되어 있는 경우를 알리고 5초 뒤에
            // 회원가입 페이지로 리다이렉트 한다.
            // 쿼리스트링에 한글이 포함되어 있어 err_invalid_char가 발생할 수 있으므로, URI 인코딩을 적용한다.
            const message = encodeURIComponent('회원가입이 필요합니다. 5초 후 회원가입 페이지로 이동합니다.');
            const redirectUrl = `/redirect?message=${message}&goto=/signup&delay=5000`;
            res.writeHead(302, { Location: redirectUrl });
            res.end();
            return;
        }
        else if (type === 'signup' && respone.error.code === 'OAUTH_USER_ALREADY_SIGNED_UP') {
            // 사용자가 이미 회원가입이 되어 있는 경우
            // 로그인 페이지로 리다이렉트 한다.
            const message = encodeURIComponent('이미 회원가입이 되어 있습니다. 5초 후 로그인 페이지로 이동합니다.');
            const redirectUrl = `/redirect?message=${message}&goto=/signin&delay=5000`;
            res.writeHead(302, { Location: redirectUrl });
            res.end()
            return
        }
        else if (type === 'signup' && respone.error.code === 'OAUTH_EMAIL_ALREADY_USED_FOR_OTHER_PROVIDER') {
            // 사용자가 이미 회원가입이 되어 있는 경우
            // 로그인 페이지로 리다이렉트 한다.
            const message = encodeURIComponent('회원가입을 시도하신 "kakao"가 아닌 다른 서비스로 회원가입이 되어 있습니다. 5초 후 회원가입 페이지로 이동합니다.');
            const redirectUrl = `/redirect?message=${message}&goto=/signup&delay=5000`;
            res.writeHead(302, { Location: redirectUrl });
            res.end()
            return
        }

        else {
            // 실패 사유를 화면에 표시한다.
            res.status(500).json({
                success: false,
                message: `${respone.error.message} [error code: ${respone.error.code}]`,
                serialNumber: '09261506',
            })
            res.end()
            return
        }


        // 3) 난수 세션 토큰 생성
        const sessionToken = crypto.randomUUID()

        // 4) Redis에 세션 토큰 저장 (30일 TTL)
        const userId = respone.data.user.id
        const expireDays = 30
        const expireSeconds = expireDays * 24 * 60 * 60
        await setSession(sessionToken, String(userId), expireSeconds)

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
        res.status(500).json({
            success: false,
            message: `Server error: ${err}`,
            serialNumber: '09261503'
        })
    }
}


async function getKakaoUserInfo(access_token: string) {
    const userInfoResp = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    return userInfoResp
}

async function requestSigninWithKakao(provider_user_id: string) {
    const response = await fetch('http://curious-ai-builder-backend-app-1:8000/api/v1/auth/signin/oauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            provider: 'kakao',
            provider_user_id: provider_user_id

        })
    })
    return response.json()
}

async function requestSignupWithKakao(provider_user_id: string) {
    const response = await fetch('http://curious-ai-builder-backend-app-1:8000/api/v1/auth/signup/oauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            provider: 'kakao',
            provider_user_id: provider_user_id
        })
    })
    return response.json()
}