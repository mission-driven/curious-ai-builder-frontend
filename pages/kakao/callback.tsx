import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function KakaoCallbackPage() {
    const router = useRouter()

    useEffect(() => {
        // TODO: 카카오 OAuth 콜백 처리 로직 구현
        // 1. URL에서 authorization code 추출
        // 2. 카카오 API로 access token 요청
        // 3. 사용자 정보 조회
        // 4. 세션 생성 및 대시보드로 리다이렉트

        console.log('Kakao OAuth callback received')

        // 임시로 대시보드로 리다이렉트
        router.push('/dashboard')
    }, [router])

    return (
        <>
            <Head>
                <title>카카오 로그인 처리 중... - AI Builder</title>
            </Head>
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">카카오 로그인을 처리하고 있습니다...</p>
                </div>
            </main>
        </>
    )
}
