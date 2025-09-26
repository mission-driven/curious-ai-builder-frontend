// 카카오 SDK 타입 정의
declare global {
    interface Window {
        Kakao: any
    }
}

// 카카오 SDK 스크립트 로드
export function loadKakaoSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject('Window is not available')
            return
        }

        // 이미 로드된 경우
        if (window.Kakao) {
            resolve()
            return
        }

        // 스크립트가 이미 로딩 중인 경우
        if (document.querySelector('script[src*="kakao.js"]')) {
            // 스크립트 로드 완료를 기다림
            const checkLoaded = () => {
                if (window.Kakao) {
                    resolve()
                } else {
                    setTimeout(checkLoaded, 100)
                }
            }
            checkLoaded()
            return
        }

        // 스크립트 동적 로드
        const script = document.createElement('script')
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
        script.async = true

        script.onload = () => {
            console.log('Kakao SDK script loaded')
            resolve()
        }

        script.onerror = () => {
            console.error('Failed to load Kakao SDK script')
            reject(new Error('Failed to load Kakao SDK'))
        }

        document.head.appendChild(script)
    })
}

// 카카오 SDK 초기화
export function initKakaoSDK() {
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_JAVASCRIPT_KEY
        if (kakaoAppKey) {
            window.Kakao.init(kakaoAppKey)
            console.log('Kakao SDK initialized with key:', kakaoAppKey.substring(0, 8) + '...')
        } else {
            console.error('NEXT_PUBLIC_KAKAO_APP_JAVASCRIPT_KEY is not defined')
        }
    }
}

// 카카오 로그인
export async function loginWithKakao(type: 'signin' | 'signup') {
    try {
        // SDK 로드 및 초기화
        await loadKakaoSDK()
        initKakaoSDK()

        if (!window.Kakao) {
            console.error('Kakao SDK is not available')
            return
        }

        window.Kakao.Auth.login({
            success: function (authObj: any) {
                console.log('Kakao login success:', authObj)
                // 토큰을 콜백 페이지로 전송
                if (authObj.access_token) {
                    window.location.href = `/api/auth/kakao/callback?access_token=${authObj.access_token}&type=${type}`
                } else {
                    console.error('No access token received')
                }
            },
            fail: function (err: any) {
                console.error('Kakao login failed:', err)
            }
        })
    } catch (error) {
        console.error('Failed to load Kakao SDK:', error)
    }
}