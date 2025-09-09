import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

type AppCard = {
    id: string
    title: string
    description: string
    price: string
    free?: string
    category: string
    rating: number
    totalChats: number
    createdAt: string
}

type MarketplaceData = {
    apps: AppCard[]
    totalCount: number
    page: number
    limit: number
}

export default function MarketplacePage() {
    const [apps, setApps] = useState<AppCard[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        const fetchApps = async () => {
            try {
                setLoading(true)
                const params = new URLSearchParams()
                if (searchTerm) params.append('search', searchTerm)
                if (selectedCategory) params.append('category', selectedCategory)

                const response = await fetch(`/api/marketplace/apps?${params.toString()}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch apps')
                }

                const data: MarketplaceData = await response.json()
                setApps(data.apps)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchApps()
    }, [searchTerm, selectedCategory])

    if (loading) {
        return (
            <>
                <Head>
                    <title>마켓플레이스 - Curi-AI</title>
                </Head>
                <Sidebar />
                <main className="min-h-screen bg-white pl-sidebar">
                    <div className="w-full">
                        <section className="flex-1 bg-gray-50/40">
                            <div className="px-6 py-8">
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                        <p className="mt-2 text-gray-600">마켓플레이스 로딩 중...</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Head>
                    <title>마켓플레이스 - Curi-AI</title>
                </Head>
                <Sidebar />
                <main className="min-h-screen bg-white pl-sidebar">
                    <div className="w-full">
                        <section className="flex-1 bg-gray-50/40">
                            <div className="px-6 py-8">
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <p className="text-red-600">Error: {error}</p>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="mt-2 text-blue-600 hover:underline"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>마켓플레이스 - Curi-AI</title>
            </Head>
            <Sidebar />
            <main className="min-h-screen bg-white pl-sidebar">
                <div className="w-full">
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">마켓플레이스</h1>
                            <p className="mt-1 max-w-2xl text-gray-600">마켓플레이스에 참여하여 더 넓은 관객에게 AI 앱을 선보이고 잠재 사용자들과 연결하세요.</p>

                            {/* Search & Filter */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <div className="relative flex-1 min-w-[260px] max-w-xl">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-400">🔍</span>
                                    <input
                                        placeholder="앱 이름으로 검색..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-300"
                                >
                                    <option value="">모든 카테고리</option>
                                    <option value="development">개발</option>
                                    <option value="content">콘텐츠</option>
                                    <option value="legal">법률</option>
                                    <option value="marketing">마케팅</option>
                                    <option value="health">건강</option>
                                </select>
                            </div>

                            {/* Masonry Grid */}
                            <div className="mt-6 columns-1 gap-6 md:columns-2 xl:columns-3">
                                {/* Join card */}
                                <div className="mb-6 inline-block w-full break-inside-avoid rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5">
                                    <p className="text-lg font-semibold text-gray-900">📈 노출 확대</p>
                                    <p className="mt-2 text-sm text-gray-600">마켓플레이스에 등록하기</p>
                                    <button className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">⚡ 지금 참여하기</button>
                                </div>

                                {apps.map((app) => (
                                    <div key={app.id} className="mb-6 inline-block w-full break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <p className="truncate text-lg font-semibold text-gray-900">{app.title}</p>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <span>⭐</span>
                                                <span>{app.rating}</span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-gray-700">{app.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-sm">
                                                <p className="text-gray-500">가격</p>
                                                <p className="mt-1 text-emerald-600 font-semibold">{app.price}</p>
                                                {app.free && <p className="text-gray-400">{app.free}</p>}
                                            </div>
                                            <div className="text-right text-xs text-gray-500">
                                                <p>{app.totalChats.toLocaleString()} 채팅</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {apps.length === 0 && !loading && (
                                <div className="mt-8 text-center text-gray-500">
                                    <p>검색 결과가 없습니다.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}


