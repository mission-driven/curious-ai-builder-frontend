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
                <title>대시보드 - Curi-AI</title>
            </Head>
            <Sidebar />
            <main className="min-h-screen bg-white pl-sidebar">
                <div className="w-full">
                    {/* Main content */}
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            {/* 1. Welcome */}
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Curi-AI에 오신 것을 환영합니다 👋</h1>

                            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold text-gray-900">시작해보세요!</p>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">📋 3/3 Completed</span>
                                </div>
                                <div className="mt-4 rounded-xl bg-gray-50/80 p-4">
                                    <ul className="space-y-6">
                                        <li className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">첫 번째 AI 앱 만들기</p>
                                                <p className="text-gray-600">몇 분 안에 나만의 AI 앱을 만들어보세요</p>
                                            </div>
                                            <span className="text-green-500">✔</span>
                                        </li>
                                        <li className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">앱 출시하기</p>
                                                <p className="text-gray-600">앱을 라이브로 만들고 다른 사람들과 공유하세요</p>
                                            </div>
                                            <span className="text-green-500">✔</span>
                                        </li>
                                        <li className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">앱에 10개의 메시지 받기</p>
                                                <p className="text-gray-600">사용자들로부터 피드백을 수집하세요</p>
                                            </div>
                                            <span className="text-green-500">✔</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    <Link href="/create-app" className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">Create App</Link>
                                    <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50">Subscribe - $0 / mo</button>
                                </div>
                            </div>

                            {/* 2. Watch & Learn */}
                            <div className="mt-10 flex items-center justify-between">
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">배우고 따라하기 🔥</h2>
                                <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">모든 튜토리얼 보기 &gt;</Link>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {[
                                    { title: '첫 번째 AI 앱 만들기', desc: '다양한 옵션을 사용하여 첫 번째 AI 앱을 만드는 방법을 배워보세요.' },
                                    { title: '파일 생성하기', desc: 'PowerPoint, PDF, Word 문서, CSV 등을 생성하는 AI 앱을 만들어보세요.' },
                                    { title: 'AI 앱 수익화하기', desc: '일회성 결제와 구독을 통해 AI 앱을 수익화하는 방법을 배워보세요.' },
                                    { title: 'AI 스튜디오 구축하기', desc: '앱들을 구독 서비스로 묶는 방법을 배워보세요.' },
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
                                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">내 AI 앱들 💰</h2>
                                <Link href="/create-app" className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Create App</Link>
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
                                                    <td className="py-4"><Link href={`/analytics/app-${i}`} className="text-blue-600 hover:underline">Analytics</Link></td>
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


