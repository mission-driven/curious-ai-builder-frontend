import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { KakaoLoginButton } from '@/components/auth'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: wire up real auth
        console.log({ email, password, remember })
    }

    return (
        <>
            <Head>
                <title>로그인 - AI Builder</title>
            </Head>
            <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
                        {/* Left: marketing panel (hidden on small screens) */}
                        <section className="hidden md:block">
                            <div className="mx-auto w-full max-w-xl">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    📙 Nano Banana Now Available!
                                </h2>
                                <p className="mt-3 text-gray-700">
                                    Experience Google&apos;s state-of-the-art image generation and editing model.
                                </p>
                                <div className="mt-8 overflow-hidden rounded-2xl">
                                    <div className="aspect-[4/3] w-full rounded-2xl bg-[url('https://images.unsplash.com/photo-1557825835-70d97c4aa4d9?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
                                </div>
                                <p className="mt-6 text-sm text-gray-600">
                                    Follow us on <a className="text-sky-600 hover:underline" href="#">X</a> to stay up to date with development
                                </p>
                            </div>
                        </section>

                        {/* Right: form (full width on small screens) */}
                        <section className="flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">Welcome back</h1>
                                <p className="mt-1 text-center text-sm text-gray-600">Sign in to your account to continue</p>

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 text-sm text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={remember}
                                                onChange={(e) => setRemember(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            Remember me
                                        </label>
                                        <Link href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                                    </div>

                                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700">
                                        Sign in
                                    </button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-3 text-sm text-gray-500">or</span>
                                        </div>
                                    </div>

                                    <KakaoLoginButton />
                                </form>

                                <p className="mt-6 text-center text-sm text-gray-600">
                                    Don&apos;t have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up here</Link>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </>
    )
}


