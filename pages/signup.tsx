import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [agree, setAgree] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // TODO: wire up real sign-up
        console.log({ name, email, password, confirm, agree })
    }

    return (
        <>
            <Head>
                <title>회원가입 - AI Builder</title>
            </Head>
            <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
                    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
                        {/* Left: marketing panel (hidden on small screens) */}
                        <section className="hidden md:block">
                            <div className="mx-auto w-full max-w-xl">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    🚀 Join creators building with AI Builder
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

                                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                    <div>
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
                                    </div>
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
                                            placeholder="Create a password"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        />
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

                                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700">
                                        Create account
                                    </button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="bg-white px-3 text-sm text-gray-500">or</span>
                                        </div>
                                    </div>

                                    <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 font-medium text-gray-800 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50">
                                        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M43.6 20.5H42V20H24v8h11.3C33.9 31.9 29.4 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20 19-9 19-20c0-1.1-.1-2.1-.4-3.1z" fill="#FFC107" />
                                            <path d="M6.3 14.7l6.6 4.8C14.5 16.2 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 5.1 29.6 3 24 3 16.2 3 9.6 7.4 6.3 14.7z" fill="#FF3D00" />
                                            <path d="M24 43c5.3 0 10.2-2 13.9-5.2l-6.4-5.2C29.3 34.8 26.8 36 24 36c-5.4 0-10-3.1-12.2-7.6l-6.5 5C8.4 38.6 15.7 43 24 43z" fill="#4CAF50" />
                                            <path d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.3-3.6 6.1-6.7 7.8l.1.1 6.4 5.2c-.5.4 8.9-5.3 8.9-16.1 0-1.1-.1-2.1-.4-3.1z" fill="#1976D2" />
                                        </svg>
                                        Continue with Google
                                    </button>
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


