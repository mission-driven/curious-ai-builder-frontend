export interface SigninPayload {
    email: string
    password: string
}

export interface SigninResponse {
    success: boolean
    sessionToken?: string
    message?: string
}

// 클라이언트에서 호출: Next API(/api/auth/signin/local)에 POST
export async function signinLocal(payload: SigninPayload): Promise<SigninResponse> {
    const res = await fetch('/api/auth/signin/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
    })

    const data = await res.json()
    // API는 JSON을 반환하고, 서버에서 세션 쿠키를 설정함
    if (!res.ok) {
        try {
            return {
                success: false,
                message: data?.message || 'Signin failed',
            }
        } catch (error) {
            return {
                success: false,
                message: 'Signin failed' + error,
            }
        }
    } else {
        const sessionToken = data.sessionToken
        return {
            success: true,
            sessionToken: sessionToken
        }
    }
}
