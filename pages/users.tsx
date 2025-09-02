import Head from 'next/head'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })
import Link from 'next/link'
import { useState } from 'react'

type User = {
    id: string
    name: string
    email: string
    total: number
    lastActive: string
    apps: string[]
}

const USERS: User[] = [
    {
        id: '1',
        name: '대연 김',
        email: 'david@mission-driven.kr',
        total: 8,
        lastActive: '9/1/2025, 6:47:19 AM',
        apps: ['test1kkjo', 'google'],
    },
]

export default function UsersPage() {
    const [openUser, setOpenUser] = useState<User | null>(null)
    return (
        <>
            <Head>
                <title>Users - AI Builder</title>
            </Head>
            <main className="min-h-screen bg-white">
                <div className="flex min-h-screen w-full">
                    <Sidebar />
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">User Management</h1>
                                    <p className="mt-1 text-sm text-gray-600">All Your App Users</p>
                                </div>
                            </div>

                            {/* Stat cards */}
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                                {[{ label: 'Total Unique Users', value: 1, icon: '🧑‍🤝‍🧑' }, { label: 'Total Messages', value: 8, icon: '💬' }, { label: 'Avg. Messages per User', value: 8, icon: '📈' }].map((s, i) => (
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

                            {/* Search & filter */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <div className="relative flex-1 min-w-[260px] max-w-xl">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-400">🔎</span>
                                    <input placeholder="Search users by name or email..." className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                                </div>
                                <button className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-300">All Apps ▾</button>
                            </div>

                            {/* Table */}
                            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3">User</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Total Messages</th>
                                            <th className="px-4 py-3">Last Active</th>
                                            <th className="px-4 py-3">Apps Used</th>
                                            <th className="px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-900">
                                        {USERS.map((u) => (
                                            <tr key={u.id}>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-indigo-700">{u.name.slice(0, 1)}</div>
                                                        <div>
                                                            <p className="font-medium">{u.name}</p>
                                                            <p className="text-xs text-gray-500">Joined 9/1/2025</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-gray-700">{u.email}</td>
                                                <td className="px-4 py-4">{u.total}</td>
                                                <td className="px-4 py-4 text-gray-700">{u.lastActive}</td>
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                                <p>Showing 1 to 1 of 1 users</p>
                                <div className="flex items-center gap-2">
                                    <button className="rounded-md bg-white px-2 py-1 ring-1 ring-gray-300">10 per page ▾</button>
                                    <button className="rounded-md bg-white px-2 py-1 ring-1 ring-gray-300">‹</button>
                                    <button className="rounded-md bg-white px-2 py-1 ring-1 ring-gray-300">›</button>
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


