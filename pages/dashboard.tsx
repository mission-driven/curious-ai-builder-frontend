import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

function NavSection({ title }: { title: string }) {
    return (
        <p className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
    )
}

function NavItem({ href = '#', icon, children, active = false }: { href?: string; icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`${active ? 'bg-indigo-100/80 text-gray-900' : 'text-gray-800 hover:bg-gray-100'} flex items-center gap-3 rounded-xl px-3 py-3 transition-colors`}
        >
            <span className="text-lg">{icon}</span>
            <span className="text-[15px] font-medium">{children}</span>
        </Link>
    )
}

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard - AI Builder</title>
            </Head>
            <main className="min-h-screen bg-white">
                <div className="flex min-h-screen w-full">
                    <Sidebar />
                    {/* Main content */}
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            {/* 1. Welcome */}
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Welcome to CalStudio 👋</h1>

                            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold text-gray-900">Let&apos;s Get Started!</p>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">📋 3/3 Completed</span>
                                </div>
                                <div className="mt-4 rounded-xl bg-gray-50/80 p-4">
                                    <ul className="space-y-6">
                                        <li className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">Create your first AI app</p>
                                                <p className="text-gray-600">Build your custom AI app in minutes</p>
                                            </div>
                                            <span className="text-green-500">✔</span>
                                        </li>
                                        <li className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">Launch your app</p>
                                                <p className="text-gray-600">Make your app live and share with others</p>
                                            </div>
                                            <span className="text-green-500">✔</span>
                                        </li>
                                        <li className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">Get 10 messages to your app</p>
                                                <p className="text-gray-600">Collect feedback from your users</p>
                                            </div>
                                            <span className="text-green-500">✔</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    <button className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">Create App</button>
                                    <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50">Subscribe - $0 / mo</button>
                                </div>
                            </div>

                            {/* 2. Watch & Learn */}
                            <div className="mt-10 flex items-center justify-between">
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Watch & Learn 🔥</h2>
                                <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">View All Tutorials &gt;</Link>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {[
                                    { title: 'Building your first AI app', desc: 'Learn how to build your very first AI app with the different options available.' },
                                    { title: 'Generate Files', desc: 'Create AI apps that generate PowerPoints, PDFs, Word docs, CSVs and more.' },
                                    { title: 'Monetize Your AI App', desc: 'Learn how to monetize your AI app with one-time payments and subscriptions.' },
                                    { title: 'Build Your AI Studio', desc: 'Learn how to bundle your apps as a subscription service.' },
                                ].map((card, idx) => (
                                    <div key={idx} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                        <div className="h-40 w-full bg-gradient-to-r from-fuchsia-400 via-orange-300 to-amber-300" />
                                        <div className="p-4">
                                            <p className="text-lg font-semibold text-gray-900">{card.title}</p>
                                            <p className="mt-1 text-sm text-gray-600">{card.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 3. Your AI Apps */}
                            <div className="mt-10 flex items-center justify-between">
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Your AI Apps 💰</h2>
                                <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Create App</button>
                            </div>
                            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="text-gray-500">
                                            <tr>
                                                <th className="py-3"></th>
                                                <th className="py-3">Image</th>
                                                <th className="py-3">Name</th>
                                                <th className="py-3">Pricing</th>
                                                <th className="py-3">Live Usage</th>
                                                <th className="py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-gray-900">
                                            {[1, 2].map((i) => (
                                                <tr key={i} className="align-middle">
                                                    <td className="py-4 text-gray-400">⋮</td>
                                                    <td className="py-4">
                                                        <div className="grid h-12 w-12 place-items-center rounded bg-black text-white">C</div>
                                                    </td>
                                                    <td className="py-4"><Link href="#" className="text-blue-600 hover:underline">app-{i} ↗</Link></td>
                                                    <td className="py-4 text-gray-500">NA</td>
                                                    <td className="py-4"><Link href="#" className="text-blue-600 hover:underline">Analytics</Link></td>
                                                    <td className="py-4"><Link href="#" className="text-blue-600 hover:underline">Embed ↓</Link> <span className="mx-1">/</span> <Link href="#" className="text-blue-600 hover:underline">Publish ↑</Link></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
                                    <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50">View More Options</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}


