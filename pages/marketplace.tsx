import Head from 'next/head'
import dynamic from 'next/dynamic'
const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false })

type AppCard = {
    title: string
    description: string
    price: string
    free?: string
}

const MOCK_APPS: AppCard[] = [
    {
        title: 'programmingUsingLLMs',
        description:
            "Help developers master AI-assisted programming. Hands-on with Copilot & Codeium; build real projects and tackle common challenges.",
        price: '€9 for 100 chats',
        free: '3 free chats',
    },
    {
        title: 'contentideation',
        description:
            'Content ideation engine for niche-specific creators and website owners. Diverse and engaging content prompts.',
        price: '$4.99 for 100 chats',
        free: '10 free chats',
    },
    {
        title: 'EmploymentLawyer',
        description: 'I will act as your Employment Lawyer, ask your question',
        price: '$14.99 for 25 chats',
        free: '5 free chats',
    },
    {
        title: 'CorporateAttorney',
        description: 'I will act as your corporate attorney, ask your question',
        price: '$14.99 for 25 chats',
        free: '5 free chats',
    },
    {
        title: 'ytscript',
        description:
            'Podcast/YouTube script assistant. Answer a few questions and receive an engaging script outline you can expand on.',
        price: '$4.99 for 100 chats',
        free: '10 free chats',
    },
]

export default function MarketplacePage() {
    return (
        <>
            <Head>
                <title>Marketplace - AI Builder</title>
            </Head>
            <Sidebar />
            <main className="min-h-screen bg-white pl-sidebar">
                <div className="w-full">
                    <section className="flex-1 bg-gray-50/40">
                        <div className="px-6 py-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Marketplace</h1>
                            <p className="mt-1 max-w-2xl text-gray-600">Join the marketplace to showcase your AI apps to a wider audience and connect with potential users.</p>

                            {/* Search */}
                            <div className="mt-6">
                                <div className="relative max-w-xl">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-400">🔍</span>
                                    <input
                                        placeholder="Search apps by name..."
                                        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {/* Join card */}
                                <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5">
                                    <p className="text-lg font-semibold text-gray-900">📈 Expand exposure</p>
                                    <p className="mt-2 text-sm text-gray-600">Get listed into the Marketplace</p>
                                    <button className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">⚡ Join now</button>
                                </div>

                                {MOCK_APPS.map((app, idx) => (
                                    <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-5">
                                        <p className="truncate text-lg font-semibold text-gray-900">{app.title}</p>
                                        <p className="mt-2 text-sm leading-6 text-gray-700">{app.description}</p>
                                        <div className="mt-4 text-sm">
                                            <p className="text-gray-500">Price</p>
                                            <p className="mt-1 text-emerald-600 font-semibold">{app.price}</p>
                                            {app.free && <p className="text-gray-400">{app.free}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}


