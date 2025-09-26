import { cn } from '@/lib/utils'
import { loginWithKakao } from '@/lib/kakao'
import { useState } from 'react'

interface KakaoLoginButtonProps {
    onClick?: () => void
    className?: string
    children?: React.ReactNode
    disabled?: boolean
    type?: 'signin' | 'signup'
}

export default function KakaoLoginButton({
    onClick,
    className,
    children,
    disabled = false,
    type = 'signin'
}: KakaoLoginButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        // 기본 카카오 로그인 동작
        setIsLoading(true)
        try {
            await loginWithKakao(type)
        } catch (error) {
            console.error('Kakao login error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            type="button"
            onClick={onClick || handleClick}
            disabled={disabled || isLoading}
            className={cn(
                'flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-2.5 font-medium text-gray-800 shadow-sm ring-1 ring-gray-900/10 hover:bg-[#FDD835] disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                className
            )}
        >
            {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-800 border-t-transparent" />
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a11.14 11.14 0 0 1-2.727-.337l-2.654.655a.5.5 0 0 1-.614-.614l.655-2.654A11.14 11.14 0 0 1 1.5 11.185C1.5 6.664 6.201 3 12 3Z" fill="#3C1E1E" />
                </svg>
            )}
            {children || (isLoading ? "Loading..." : "Continue with Kakao")}
        </button>
    )
}
