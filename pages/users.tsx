import Head from 'next/head'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })
import Link from 'next/link'
import { useState, useEffect } from 'react'

type UserStats = {
    totalUniqueUsers: number
    totalMessages: number
    avgMessagesPerUser: number
}

type User = {
    id: string
    name: string
    email: string
    total: number
    lastActive: string
    apps: string[]
    joinDate: string
}

type UsersData = {
    users: User[]
    totalCount: number
    page: number
    limit: number
}

export default function UsersPage() {
    const [openUser, setOpenUser] = useState<User | null>(null)
    const [userStats, setUserStats] = useState<UserStats | null>(null)
    const [statsLoading, setStatsLoading] = useState(true)
    const [statsError, setStatsError] = useState<string | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [usersLoading, setUsersLoading] = useState(true)
    const [usersError, setUsersError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedApp, setSelectedApp] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                setStatsLoading(true)
                const response = await fetch('/api/users/stats')

                if (!response.ok) {
                    throw new Error('Failed to fetch user stats')
                }

                const data = await response.json()
                setUserStats(data)
            } catch (err) {
                setStatsError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setStatsLoading(false)
            }
        }

        fetchUserStats()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setUsersLoading(true)
                const params = new URLSearchParams()
                params.append('page', currentPage.toString())
                params.append('limit', '10')
                if (searchTerm) params.append('search', searchTerm)
                if (selectedApp) params.append('app', selectedApp)

                const response = await fetch(`/api/users/list?${params.toString()}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }

                const data: UsersData = await response.json()
                setUsers(data.users)
                setTotalCount(data.totalCount)
            } catch (err) {
                setUsersError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setUsersLoading(false)
            }
        }

        fetchUsers()
    }, [currentPage, searchTerm, selectedApp])
    return (
        <>
            <Head>
                <title>사용자 관리 - Curi-AI</title>
            </Head>
            <Sidebar />
            <main className="min-h-screen bg-white pl-sidebar">
                <div className="w-full">
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">사용자 관리</h1>
                                    <p className="mt-1 text-sm text-gray-600">모든 앱 사용자</p>
                                </div>
                            </div>

                            {/* Stat cards */}
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                {statsLoading ? (
                                    // 로딩 상태
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
                                                <div className="flex-1">
                                                    <div className="h-8 w-16 animate-pulse rounded bg-gray-200 mb-2"></div>
                                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : statsError ? (
                                    // 에러 상태
                                    <div className="col-span-3 rounded-2xl border border-red-200 bg-red-50 p-5">
                                        <div className="text-center">
                                            <p className="text-red-600">통계 로드 실패: {statsError}</p>
                                            <button
                                                onClick={() => window.location.reload()}
                                                className="mt-2 text-red-600 hover:underline"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    </div>
                                ) : userStats ? (
                                    // 정상 상태
                                    [
                                        { label: '총 고유 사용자', value: userStats.totalUniqueUsers, icon: '🧑‍🤝‍🧑' },
                                        { label: '총 메시지', value: userStats.totalMessages, icon: '💬' },
                                        { label: '사용자당 평균 메시지', value: userStats.avgMessagesPerUser.toFixed(1), icon: '📈' }
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
                                    ))
                                ) : null}
                            </div>

                            {/* Search & filter */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <div className="relative flex-1 min-w-[260px] max-w-xl">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-400">🔎</span>
                                    <input
                                        placeholder="이름이나 이메일로 사용자 검색..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <select
                                    value={selectedApp}
                                    onChange={(e) => setSelectedApp(e.target.value)}
                                    className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-300"
                                >
                                    <option value="">모든 앱</option>
                                    <option value="test1kkjo">test1kkjo</option>
                                    <option value="google">google</option>
                                    <option value="contentideation">contentideation</option>
                                    <option value="ytscript">ytscript</option>
                                    <option value="programmingUsingLLMs">programmingUsingLLMs</option>
                                    <option value="CodeReviewer">CodeReviewer</option>
                                    <option value="EmploymentLawyer">EmploymentLawyer</option>
                                    <option value="SocialMediaManager">SocialMediaManager</option>
                                    <option value="PersonalTrainer">PersonalTrainer</option>
                                    <option value="CorporateAttorney">CorporateAttorney</option>
                                </select>
                            </div>

                            {/* Table */}
                            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3">사용자</th>
                                            <th className="px-4 py-3">이메일</th>
                                            <th className="px-4 py-3">총 메시지</th>
                                            <th className="px-4 py-3">마지막 활동</th>
                                            <th className="px-4 py-3">사용한 앱</th>
                                            <th className="px-4 py-3">작업</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-900">
                                        {usersLoading ? (
                                            // 로딩 상태
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={i}>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                                                            <div className="flex-1">
                                                                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 mb-1"></div>
                                                                <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="h-4 w-8 animate-pulse rounded bg-gray-200"></div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="h-4 w-4 animate-pulse rounded bg-gray-200"></div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : usersError ? (
                                            // 에러 상태
                                            <tr>
                                                <td colSpan={6} className="px-4 py-8 text-center">
                                                    <p className="text-red-600">사용자 목록 로드 실패: {usersError}</p>
                                                    <button
                                                        onClick={() => window.location.reload()}
                                                        className="mt-2 text-red-600 hover:underline"
                                                    >
                                                        Retry
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : users.length > 0 ? (
                                            // 정상 상태
                                            users.map((u) => (
                                                <tr key={u.id}>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-indigo-700">{u.name.slice(0, 1)}</div>
                                                            <div>
                                                                <p className="font-medium">{u.name}</p>
                                                                <p className="text-xs text-gray-500">가입일 {new Date(u.joinDate).toLocaleDateString('ko-KR')}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-gray-700">{u.email}</td>
                                                    <td className="px-4 py-4">{u.total}</td>
                                                    <td className="px-4 py-4 text-gray-700">{new Date(u.lastActive).toLocaleString('ko-KR')}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {u.apps.map((a) => (
                                                                <Link key={a} href={`/analytics/${a}`} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-blue-700 hover:underline">{a}</Link>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <button onClick={() => setOpenUser(u)} className="text-gray-700">👁️</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            // 빈 상태
                                            <tr>
                                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                                    <p>검색 결과가 없습니다.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                                <p>{totalCount}명의 사용자 중 {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalCount)} 표시</p>
                                <div className="flex items-center gap-2">
                                    <button className="rounded-md bg-white px-2 py-1 ring-1 ring-gray-300">10 per page ▾</button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="rounded-md bg-white px-2 py-1 ring-1 ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                        disabled={currentPage * 10 >= totalCount}
                                        className="rounded-md bg-white px-2 py-1 ring-1 ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ›
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* User detail modal */}
            {openUser && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setOpenUser(null)} />
                    <div className="absolute inset-0 grid place-items-center p-4">
                        <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold text-gray-900">User Details</p>
                                <button onClick={() => setOpenUser(null)} className="rounded-full p-1 text-gray-500 hover:bg-gray-100">✕</button>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-4">
                                    <div className="grid h-14 w-14 place-items-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">{openUser.name.slice(0, 1)}</div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">{openUser.name}</p>
                                        <p className="text-sm text-gray-600">{openUser.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">Total Messages</p>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">{openUser.total}</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">Last Active</p>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">{openUser.lastActive}</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">Join Date</p>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">2025. 9. 1.</p>
                                    </div>
                                    <div className="rounded-xl bg-gray-50 p-4">
                                        <p className="text-xs text-gray-500">Apps Used</p>
                                        <p className="mt-1 text-lg font-semibold text-gray-900">{openUser.apps.length}</p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 text-base font-semibold text-gray-900">App Usage</p>
                            <div className="mt-2 overflow-hidden rounded-xl border border-gray-200">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3">Bot Name</th>
                                            <th className="px-4 py-3">Messages</th>
                                            <th className="px-4 py-3">Last Active</th>
                                            <th className="px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-900">
                                        {openUser.apps.map((a, i) => (
                                            <tr key={a}>
                                                <td className="px-4 py-3">{a}</td>
                                                <td className="px-4 py-3">{i === 0 ? 6 : 2}</td>
                                                <td className="px-4 py-3">2025. 9. 1. 오후 3:47:19</td>
                                                <td className="px-4 py-3"><Link href={`/analytics/${a}`} className="text-blue-600 hover:underline">View Analytics</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


