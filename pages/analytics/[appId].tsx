import Head from 'next/head'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../../components/Sidebar'), { ssr: false })
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

type AnalyticsData = {
    totalMessages: number
    totalUsers: number
    totalPayments: number
    totalViews: number
}

export default function AnalyticsPage() {
    const router = useRouter()
    const { appId } = router.query
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!appId) return

        const fetchAnalytics = async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/analytics/${appId}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch analytics')
                }

                const data = await response.json()
                setAnalytics(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [appId])

    if (loading) {
        return (
            <>
                <Head>
                    <title>분석 - 로딩 중 | Curi-AI</title>
                </Head>
                <Sidebar />
                <main className="min-h-screen bg-white pl-sidebar">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Loading analytics...</p>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    if (error || !analytics) {
        return (
            <>
                <Head>
                    <title>분석 - 오류 | Curi-AI</title>
                </Head>
                <Sidebar />
                <main className="min-h-screen bg-white pl-sidebar">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-red-600">Error: {error || 'Failed to load analytics'}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>분석 - {appId} | Curi-AI</title>
            </Head>
            <Sidebar />
            <main className="min-h-screen bg-white pl-sidebar">
                <div className="w-full">
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            <div className="flex items-baseline gap-3">
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{appId}</h1>
                                <span className="text-sm text-gray-600">사용자 분석</span>
                            </div>

                            {/* Stat cards */}
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                                {[
                                    { label: '총 메시지', value: analytics.totalMessages, icon: '💬' },
                                    { label: '총 사용자', value: analytics.totalUsers, icon: '🧑‍🤝‍🧑' },
                                    { label: '총 결제', value: analytics.totalPayments, icon: '💲' },
                                    { label: '총 조회수', value: analytics.totalViews, icon: '👁️' }
                                ].map((s, i) => (
                                    <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{s.icon}</span>
                                            <div>
                                                <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
                                                <p className="text-sm text-gray-600">{s.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Last prompts - TODO: 별도 API로 분리 예정 */}
                            <p className="mt-10 text-lg font-semibold text-gray-900">
                                최근 100개 프롬프트 by 사용자 ({analytics.totalMessages} 총계)
                            </p>
                            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                <div className="p-8 text-center text-gray-500">
                                    <p>프롬프트 데이터는 별도 API로 관리됩니다.</p>
                                    <p className="text-sm mt-2">TODO: /api/prompts/[appId] 구현 예정</p>
                                </div>
                            </div>

                            <button className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Pro Plus 구독하기</button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}



