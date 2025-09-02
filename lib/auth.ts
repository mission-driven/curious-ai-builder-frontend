import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

// JWT 토큰에서 사용자 정보 추출
export async function getUserFromToken(req: NextRequest) {
    try {
        const token = await getToken({ req })
        return token
    } catch (error) {
        console.error('Failed to get user from token:', error)
        return null
    }
}

// 권한 검증
export function hasPermission(user: any, requiredPermission: string): boolean {
    if (!user || !user.scopes) return false
    return user.scopes.includes(requiredPermission)
}

// 역할 검증
export function hasRole(user: any, requiredRole: string): boolean {
    if (!user || !user.roles) return false
    return user.roles.includes(requiredRole)
}
