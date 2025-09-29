import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signupLocal } from '@/lib/signup'
import { KakaoLoginButton } from '@/components/auth'

export default function SignupPage() {
    const router = useRouter()
    // const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [agree, setAgree] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isConfirmValid, setIsConfirmValid] = useState(false)
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    // password와 confirm이 일치하지 않으면 경고 메시지를 표시한다.
    useEffect(() => {
        if (password !== confirm) {
            setErrorConfirm('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            setIsConfirmValid(false)
        } else {
            setErrorConfirm('')
            setIsConfirmValid(true)
        }
    }, [confirm])

    // password가 유효하지 않으면 경고 메시지를 표시한다.
    useEffect(() => {
        if (password && password.length < 8 || password.length > 20) {
            setErrorPassword('비밀번호는 8자 이상이어야 합니다.')
            setIsPasswordValid(false)
        }
        else if (password && password.length > 20) {
            setErrorPassword('비밀번호는 20자 이하이어야 합니다.')
            setIsPasswordValid(false)
        }
        else {
            setErrorPassword('')
            setIsPasswordValid(true)
        }
    }, [password])

    // email이 유효하지 않으면 경고 메시지를 표시한다.
    useEffect(() => {
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorEmail('이메일 형식이 올바르지 않습니다.')
            setIsEmailValid(false)
        } else {
            setErrorEmail('')
            setIsEmailValid(true)
        }
    }, [email])

    // 폼 유효성 검사
    useEffect(() => {
        if (isEmailValid && isPasswordValid && isConfirmValid && agree) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }, [isEmailValid, isPasswordValid, isConfirmValid, agree])


    // 회원가입 처리
    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid || isLoading) return
        try {
            setIsLoading(true)
            const result = await signupLocal({ email, password })
            if (result.success) {
                const message = encodeURIComponent('인증용 이메일이 발송되었습니다. 이메일을 확인해주세요. 10초 후 로그인 페이지로 이동합니다.')
                const redirectUrl = `/redirect?message=${message}&goto=/login&delay=10000`;
                await router.push(redirectUrl)
                return
            }
            else {
                if (result.code == "EMAIL_ALREADY_USED") {
                    setErrorEmail('이미 회원가입이 되어 있습니다.')
                    setIsEmailValid(false)
                    return
                }
                else {
                    alert('큐리AI 고객팀에 문의해주세요 에러상황=>' + result.message + ' [ error code : ' + result.code + ']' + ' [ Serial Number : ' + result.serialNumber + ']' || '회원가입에 실패했습니다.')
                    return
                }
            }
        } catch (err) {
            alert('회원가입 중 오류가 발생했습니다. Serial Number : 09262111')
            return
        } finally {
            setIsLoading(false)
            return
        }
    }


    return (
        <>
            <Head>
                <title>회원가입 - Curi-AI</title>
            </Head>
            <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
                        {/* Left: marketing panel (hidden on small screens) */}
                        <section className="hidden md:block">
                            <div className="mx-auto w-full max-w-xl">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    🚀 Join creators building with Curi-AI
                                </h2>
                                <p className="mt-3 text-gray-700">
                                    Launch AI apps faster with hosted UI, auth, database and payments.
                                </p>
                                <div className="mt-8 overflow-hidden rounded-2xl">
                                    <div className="aspect-[4/3] w-full rounded-2xl bg-[url('https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                                </div>
                                <p className="mt-6 text-sm text-gray-600">
                                    Have questions? <a className="text-sky-600 hover:underline" href="#">Chat with us</a>
                                </p>
                            </div>
                        </section>

                        {/* Right: sign-up form */}
                        <section className="flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">Create your account</h1>
                                <p className="mt-1 text-center text-sm text-gray-600">Start building and monetizing your AI apps</p>

                                <form onSubmit={handleCreateAccount} className="mt-8 space-y-5">
                                    {/* <div>
                                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        />
                                    </div> */}
                                    <div>
                                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        />
                                        {errorEmail && <p className="text-red-500">{errorEmail}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        />
                                        {errorPassword && <p className="text-red-500">{errorPassword}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-gray-700">Confirm password</label>
                                        <input
                                            id="confirm"
                                            type="password"
                                            value={confirm}
                                            onChange={(e) => setConfirm(e.target.value)}
                                            placeholder="Re-enter your password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        />
                                        {errorConfirm && <p className="text-red-500">{errorConfirm}</p>}
                                    </div>
                                    <label className="flex items-center gap-2 text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            checked={agree}
                                            onChange={(e) => setAgree(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            required
                                        />
                                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy</a>
                                    </label>

                                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isFormValid || isLoading}>
                                        {isLoading ? '잠시만 기다려주세요...' : 'Create account'}
                                    </button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-3 text-sm text-gray-500">or</span>
                                        </div>
                                    </div>

                                    <KakaoLoginButton type="signup" disabled={isLoading} />
                                </form>

                                <p className="mt-6 text-center text-sm text-gray-600">
                                    Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign in</Link>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}


