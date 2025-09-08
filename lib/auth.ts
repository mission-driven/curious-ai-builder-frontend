import { NextRequest } from 'next/server'

// Session 기반 사용자 인증 유틸리티
export async function getUserFromSession(req: NextRequest) {
    try {
        // NextAuth session에서 사용자 정보 추출
        // 실제 구현에서는 NextAuth의 getSession() 사용
        return null
    } catch (error) {
        console.error('Failed to get user from session:', error)
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
