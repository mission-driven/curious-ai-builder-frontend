import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function KakaoCallbackPage() {
    const router = useRouter()
    const { access_token, refresh_token, error } = router.query
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
    const [message, setMessage] = useState('카카오 로그인을 처리하고 있습니다...')

    useEffect(() => {
        const handleKakaoCallback = async () => {
            if (access_token) {
                try {
                    console.log('Kakao access token:', access_token)
                    setMessage('사용자 정보를 확인하고 있습니다...')

                    // 🔒 보안: 카카오 API로 직접 토큰 검증 및 사용자 정보 조회
                    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    })

                    if (!userResponse.ok) {
                        throw new Error('Invalid access token')
                    }

                    const userData = await userResponse.json()
                    console.log('Kakao user data:', userData)

                    setMessage('로그인 정보를 저장하고 있습니다...')

                    // 🔒 보안: 검증된 사용자 정보만 백엔드로 전송
                    // TODO: 백엔드 구현 후 실제 API 호출로 변경
                    console.log('백엔드로 전송할 데이터:', {
                        kakao_id: userData.id,
                        nickname: userData.kakao_account?.profile?.nickname || '',
                        email: userData.kakao_account?.email || '',
                        profile_image: userData.kakao_account?.profile?.profile_image_url || '',
                    })

                    // 🎭 목업: 백엔드 응답 시뮬레이션
                    await new Promise(resolve => setTimeout(resolve, 1000)) // 1초 대기

                    // 목업 성공 응답
                    const mockResponse = {
                        data: {
                            success: true,
                            user: {
                                id: userData.id,
                                nickname: userData.kakao_account?.profile?.nickname || '',
                                email: userData.kakao_account?.email || '',
                                profile_image: userData.kakao_account?.profile?.profile_image_url || ''
                            },
                            session_token: 'mock_session_token_12345'
                        }
                    }

                    if (mockResponse.data.success) {
                        setStatus('success')
                        setMessage('로그인 성공! 대시보드로 이동합니다...')

                        // TODO: 실제 세션 토큰을 쿠키나 localStorage에 저장
                        console.log('세션 토큰 저장:', mockResponse.data.session_token)

                        // 2초 후 대시보드로 리다이렉트
                        setTimeout(() => {
                            router.push('/dashboard')
                        }, 2000)
                    } else {
                        throw new Error('Mock login failed')
                    }
                } catch (error) {
                    console.error('Kakao authentication failed:', error)
                    setStatus('error')
                    setMessage('로그인에 실패했습니다. 다시 시도해주세요.')

                    // 3초 후 로그인 페이지로 리다이렉트
                    setTimeout(() => {
                        router.push('/login?error=kakao_auth_failed')
                    }, 3000)
                }
            } else if (error) {
                console.error('Kakao login error:', error)
                setStatus('error')
                setMessage('카카오 로그인 중 오류가 발생했습니다.')

                // 3초 후 로그인 페이지로 리다이렉트
                setTimeout(() => {
                    router.push('/login?error=kakao_auth_failed')
                }, 3000)
            }
        }

        if (access_token || error) {
            handleKakaoCallback()
        }
    }, [access_token, refresh_token, error, router])

    const getStatusIcon = () => {
        switch (status) {
            case 'processing':
                return (
                    <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                )
            case 'success':
                return (
                    <div className="mb-4 inline-block h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )
            case 'error':
                return (
                    <div className="mb-4 inline-block h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )
        }
    }

    const getStatusColor = () => {
        switch (status) {
            case 'processing':
                return 'text-gray-700'
            case 'success':
                return 'text-green-700'
            case 'error':
                return 'text-red-700'
        }
    }

    return (
        <>
            <Head>
                <title>Kakao Login - {status === 'processing' ? 'Processing...' : status === 'success' ? 'Success' : 'Error'}</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    {getStatusIcon()}
                    <p className={`text-lg ${getStatusColor()}`}>{message}</p>
                    {status === 'error' && (
                        <button
                            onClick={() => router.push('/login')}
                            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            로그인 페이지로 돌아가기
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
