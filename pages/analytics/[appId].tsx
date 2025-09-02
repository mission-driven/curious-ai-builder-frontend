import Head from 'next/head'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../../components/Sidebar'), { ssr: false })
import Link from 'next/link'

type Props = { appId: string }

export default function AnalyticsPage({ appId }: Props) {

    return (
        <>
            <Head>
                <title>Analytics - {appId} | AI Builder</title>
            </Head>
            <main className="min-h-screen bg-white">
                <div className="flex min-h-screen w-full">
                    <Sidebar />
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            <div className="flex items-baseline gap-3">
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">{appId}</h1>
                                <span className="text-sm text-gray-600">User Analytics</span>
                            </div>

                            {/* Stat cards */}
                            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                                {[{ label: 'Total Messages', value: 6, icon: '💬' }, { label: 'Total Users', value: 1, icon: '🧑‍🤝‍🧑' }, { label: 'Total Payments', value: 0, icon: '💲' }, { label: 'Total Views', value: 2, icon: '👁️' }].map((s, i) => (
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

                            {/* Last prompts */}
                            <p className="mt-10 text-lg font-semibold text-gray-900">Last 100 Prompts by 사용자 (6 total)</p>
                            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3">Messages</th>
                                            <th className="px-4 py-3">Time of Message</th>
                                            <th className="px-4 py-3">Response</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-900">
                                        <tr>
                                            <td className="px-4 py-3">"ddd\\|\dd..." <Link href="#" className="text-blue-600 hover:underline">(view chat)</Link></td>
                                            <td className="px-4 py-3">Mon, Sep 1, 2025, 5:54:18 AM UTC</td>
                                            <td className="px-4 py-3"><Link href="#" className="text-blue-600 hover:underline">"Hi there! I noticed you typed ..."</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <button className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Subscribe to Pro Plus</button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: { params: { appId: string } }) {
    const { appId } = context.params
    return { props: { appId } }
}


