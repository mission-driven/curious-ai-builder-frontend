export interface SignupPayload {
    email: string
    password: string
    name?: string
}

export interface SignupResponse {
    success: boolean
    redirect?: string
    message?: string
    code?: string
    serialNumber?: string
}

// 클라이언트에서 호출: Next API(/api/auth/signup/local)에 POST
export async function signupLocal(payload: SignupPayload): Promise<SignupResponse> {
    const res = await fetch('/api/auth/signup/local', {
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
                code: data?.code,
                message: data?.message || 'Signup failed',
                serialNumber: "09262018",
            }
        } catch (error) {
            return {
                success: false,
                code: 'UNKNOWN_ERROR',
                message: 'Signup failed',
                serialNumber: "09262018",
            }
        }
    }

    return {
        success: true
    }
}


