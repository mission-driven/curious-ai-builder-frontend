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
export async function loginWithKakao() {
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
                // TODO: 백엔드로 인가 코드 전송
                // redirectToCallback(authObj.code)
            },
            fail: function (err: any) {
                console.error('Kakao login failed:', err)
            }
        })
    } catch (error) {
        console.error('Failed to load Kakao SDK:', error)
    }
}

// 카카오 로그아웃
export function logoutFromKakao() {
    if (typeof window === 'undefined' || !window.Kakao) {
        console.error('Kakao SDK is not loaded')
        return
    }

    window.Kakao.Auth.logout(function () {
        console.log('Kakao logout success')
        // TODO: 세션 정리 및 리다이렉트
    })
}

// 카카오 사용자 정보 가져오기
export function getKakaoUserInfo() {
    if (typeof window === 'undefined' || !window.Kakao) {
        console.error('Kakao SDK is not loaded')
        return Promise.reject('Kakao SDK is not loaded')
    }

    // SDK 초기화 확인
    if (!window.Kakao.isInitialized()) {
        initKakaoSDK()
    }

    return new Promise((resolve, reject) => {
        window.Kakao.API.request({
            url: '/v2/user/me',
            success: function (response: any) {
                console.log('Kakao user info:', response)
                resolve(response)
            },
            fail: function (error: any) {
                console.error('Failed to get Kakao user info:', error)
                reject(error)
            }
        })
    })
}

// 카카오 로그인 상태 확인
export function isKakaoLoggedIn() {
    if (typeof window === 'undefined' || !window.Kakao) {
        return false
    }

    // SDK 초기화 확인
    if (!window.Kakao.isInitialized()) {
        initKakaoSDK()
    }

    return window.Kakao.Auth.getAccessToken() !== null
}

// 카카오 액세스 토큰 가져오기
export function getKakaoAccessToken() {
    if (typeof window === 'undefined' || !window.Kakao) {
        return null
    }

    // SDK 초기화 확인
    if (!window.Kakao.isInitialized()) {
        initKakaoSDK()
    }

    return window.Kakao.Auth.getAccessToken()
}

// 카카오 환경변수 확인 (디버깅용)
export function checkKakaoEnv() {
    const env = {
        javascriptKey: process.env.NEXT_PUBLIC_KAKAO_APP_JAVASCRIPT_KEY,
        restApiKey: process.env.NEXT_PUBLIC_KAKAO_APP_REST_API_KEY,
        clientSecret: process.env.KAKAO_LOGIN_SECRET_CLIENT
    }

    console.log('Kakao Environment Variables:', {
        javascriptKey: env.javascriptKey ? env.javascriptKey.substring(0, 8) + '...' : 'Not set',
        restApiKey: env.restApiKey ? env.restApiKey.substring(0, 8) + '...' : 'Not set',
        clientSecret: env.clientSecret ? env.clientSecret.substring(0, 8) + '...' : 'Not set'
    })

    return env
}
