import axios from 'axios'

// API 기본 설정
const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 요청 인터셉터 - JWT 토큰 추가
apiClient.interceptors.request.use(
    (config) => {
        // NextAuth에서 토큰을 가져와서 헤더에 추가
        // 실제 구현에서는 NextAuth의 getToken() 사용
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 인증 에러 처리
            console.error('Authentication failed')
        }
        return Promise.reject(error)
    }
)

export default apiClient
