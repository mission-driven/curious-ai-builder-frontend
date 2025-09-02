import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-1 h-5 w-5 text-emerald-600">
            <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    )
}

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
        <>
            <Head>
                <title>AI Builder - AI 에이전트 생성 플랫폼</title>
                <meta name="description" content="사용자가 Custom AI App을 생성하고, 마켓플레이스를 통해 공유하며, 수익화할 수 있는 AI 에이전트 플랫폼" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Landing-only GNB */}
            <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/60 border-b border-gray-200/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900">
                        <span className="inline-block h-6 w-6 rounded bg-gray-900 text-white text-xs flex items-center justify-center">AI</span>
                        <span>AI Builder</span>
                    </Link>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
                        <Link href="#resources" className="hover:text-gray-900">Resources</Link>
                        <Link href="#product" className="hover:text-gray-900">Product</Link>
                        <Link href="#pricing" className="hover:text-gray-900">Pricing</Link>
                        <Link href="#apps" className="hover:text-gray-900">Apps</Link>
                    </nav>
                    {/* Auth Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Log in</Link>
                        <Link href="/signup" className="text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-full px-4 py-2 transition-colors">Sign Up</Link>
                    </div>
                    {/* Mobile menu button */}
                    <button
                        aria-label="Open menu"
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                            <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6.75a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6.75a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {/* Mobile dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200/60 bg-white/80 backdrop-blur">
                        <div className="container mx-auto px-4 py-3 flex flex-col gap-2 text-sm">
                            <Link href="#resources" className="py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                            <Link href="#product" className="py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Product</Link>
                            <Link href="#pricing" className="py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                            <Link href="#apps" className="py-2 text-gray-700 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Apps</Link>
                            <div className="pt-2 flex items-center gap-3">
                                <Link href="/login" className="text-gray-700 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                                <Link href="/signup" className="font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-full px-4 py-2" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
            <main className="relative min-h-screen pt-20 overflow-hidden">
                {/* Soft gradient background */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50 to-cyan-100" />
                {/* Subtle grid overlay */}
                <div className="pointer-events-none absolute inset-0 -z-10 [background:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent_70%)]" />

                <section className="container mx-auto px-4 py-20">
                    <div className="mx-auto max-w-5xl text-center">
                        <p className="text-[clamp(28px,6vw,64px)] font-extrabold leading-[1.05] text-gray-900 tracking-tight">
                            Create and Deploy
                        </p>
                        <h1 className="mt-2 text-[clamp(28px,6.5vw,60px)] font-extrabold leading-[1.05] tracking-tight">
                            <span className="align-middle">Custom AI Apps </span>
                            <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">(GPTs, Voice & More)</span>
                        </h1>
                        <div className="mt-6 text-[clamp(16px,2.5vw,22px)] text-gray-700">
                            <p>Bundle and sell apps into a white-labeled storefront.</p>
                            <p className="mt-1">Includes UI, Hosting, Auth, Database & Payments. No coding required.</p>
                        </div>

                        {/* Big input with glow */}
                        <div className="relative mx-auto mt-10 max-w-4xl">
                            <div className="absolute -inset-1 rounded-2xl bg-fuchsia-500/20 blur-xl"></div>
                            <div className="relative rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
                                <input
                                    aria-label="Describe your AI assistant idea"
                                    placeholder="Describe your AI assistant idea... (e.g., 'A customer support chatbot for e-commerce stores')"
                                    className="w-full rounded-2xl border-0 bg-transparent px-6 py-8 text-[clamp(14px,2.2vw,18px)] text-gray-800 placeholder:text-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Idea chips */}
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
                            <span className="text-gray-500">Need ideas? Try these:</span>
                            <button className="rounded-full bg-white px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50">📚 Study Buddy</button>
                            <button className="rounded-full bg-white px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50">💪 Fitness Coach</button>
                            <button className="rounded-full bg-white px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50">🔎 Recipe Generator</button>
                            <button className="rounded-full bg-white px-3 py-1.5 text-gray-700 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50">✈️ Travel Planner</button>
                        </div>

                        {/* Powered by pill */}
                        <div className="mx-auto mt-6 w-fit rounded-full bg-white/70 px-3 py-1.5 text-sm text-gray-700 shadow-sm ring-1 ring-gray-900/10 backdrop-blur">
                            <span className="mr-2 text-gray-500">Powered by</span>
                            <span className="font-semibold text-violet-700">Claude 4</span>
                            <svg className="ml-1 inline h-4 w-4 text-violet-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.75a.75.75 0 00-1.5 0V10c0 .199.079.39.22.53l2.5 2.5a.75.75 0 001.06-1.06l-2.28-2.28V6.25z" clipRule="evenodd" /></svg>
                        </div>

                        {/* CTA buttons */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button className="rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-fuchsia-600/20 transition-transform hover:scale-[1.02]">
                                Create App →
                            </button>
                            <button className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-lg font-semibold text-gray-800 shadow-sm ring-1 ring-gray-900/10 hover:bg-gray-50">
                                <span className="grid h-6 w-6 place-items-center rounded-full border border-gray-300 text-gray-700">▶</span>
                                Watch Demo
                            </button>
                        </div>

                        {/* Trust row */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-gray-600">
                            <div className="flex -space-x-2">
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-pink-300 ring-2 ring-white" />
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-300 to-cyan-300 ring-2 ring-white" />
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-300 to-lime-300 ring-2 ring-white" />
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-300 to-violet-300 ring-2 ring-white" />
                                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-300 to-blue-400 ring-2 ring-white" />
                            </div>
                            <div className="flex items-center gap-1 text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.764.347c-.833.061-1.171 1.102-.536 1.651l3.62 3.123-1.106 4.637c-.193.811.691 1.44 1.405.986L10 15.347l4.079 2.682c.714.454 1.598-.175 1.405-.986l-1.106-4.637 3.62-3.123c.635-.549.297-1.59-.536-1.651l-4.764-.347-1.83-4.401z" /></svg>
                                ))}
                            </div>
                            <p className="text-gray-700">trusted by 5,000+ creators</p>
                        </div>
                    </div>
                </section>

                {/* Logos row */}
                <section className="container mx-auto px-4 pb-8">
                    <p className="text-center text-sm text-gray-500">Leading Educators, Consultants, Startups, Businesses Use AI Builder</p>
                    <div className="mt-6 grid grid-cols-2 gap-6 opacity-80 sm:grid-cols-3 md:grid-cols-6">
                        {['TEXAS', 'MICHIGAN', 'UCL', 'TRILOGY', 'VERIZON', 'PORTER'].map((name) => (
                            <div key={name} className="flex items-center justify-center rounded-md bg-white px-3 py-3 text-xs font-semibold tracking-wide text-gray-700 shadow-sm ring-1 ring-gray-900/10">
                                {name}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sub headline section */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-[clamp(24px,5.6vw,48px)] font-extrabold tracking-tight text-gray-900">
                        Build, launch, whitelabel <span className="text-red-600 underline decoration-red-300/60">your custom AI app</span>
                    </h2>
                    <p className="mt-3 max-w-4xl text-lg text-gray-600">
                        AI Builder comes with everything you need to create and distribute your custom AI solution without code in minutes
                    </p>
                </section>

                {/* Monetization section */}
                <section className="container mx-auto grid grid-cols-1 items-start gap-10 px-4 pb-24 md:grid-cols-2">
                    <div>
                        <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">Monetization</span>
                        <h3 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Earn Revenue From Your AI Apps</h3>
                        <p className="mt-3 text-gray-700">Turn your expertise into income by monetizing your AI apps. AI Builder integrates with Stripe to handle all payment processing securely.</p>
                        <ul className="mt-6 space-y-5">
                            <li className="flex gap-3">
                                <CheckIcon />
                                <div>
                                    <p className="font-semibold text-gray-900">Flexible Pricing Models</p>
                                    <p className="text-gray-600">Offer one-time payments or subscriptions for apps</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon />
                                <div>
                                    <p className="font-semibold text-gray-900">Global Support</p>
                                    <p className="text-gray-600">Available for creators in 100+ countries worldwide</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <CheckIcon />
                                <div>
                                    <p className="font-semibold text-gray-900">Earnings Dashboard</p>
                                    <p className="text-gray-600">Track all your revenue in one centralized place</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* Earnings card mock */}
                    <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl ring-1 ring-gray-900/10">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <div>
                                <p className="font-medium text-gray-800">Total earnings <span className="ml-1 align-middle" title="sample">ⓘ</span></p>
                                <p className="mt-1 text-xl font-semibold text-gray-900">$34.31 USD</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="rounded-md bg-gray-100 px-2 py-1">Past year</span>
                                <span className="rounded-md bg-gray-100 px-2 py-1">PayMeForMyAI</span>
                            </div>
                        </div>
                        {/* Mini chart */}
                        <svg viewBox="0 0 400 140" className="mt-4 h-36 w-full">
                            <rect x="0" y="0" width="400" height="140" rx="10" fill="#F8FAFC" />
                            <path d="M10 120 L80 120 L150 120 L220 110 L290 90 L360 20" stroke="#2563EB" strokeWidth="3" fill="none" />
                            <circle cx="360" cy="20" r="4" fill="#2563EB" />
                        </svg>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <span>Feb 1</span>
                            <span>Today</span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
