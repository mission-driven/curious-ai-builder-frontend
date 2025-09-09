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
            "개발자들이 AI 지원 프로그래밍을 마스터할 수 있도록 도와줍니다. Copilot & Codeium을 활용한 실습으로 실제 프로젝트를 구축하고 일반적인 문제들을 해결해보세요.",
        price: '€9 for 100 chats',
        free: '3 free chats',
    },
    {
        title: 'contentideation',
        description:
            '특정 틈새 시장의 크리에이터와 웹사이트 소유자를 위한 콘텐츠 아이디어 엔진입니다. 다양하고 매력적인 콘텐츠 프롬프트를 제공합니다.',
        price: '$4.99 for 100 chats',
        free: '10 free chats',
    },
    {
        title: 'EmploymentLawyer',
        description: '고용법 변호사로서 여러분의 질문에 답변해드립니다.',
        price: '$14.99 for 25 chats',
        free: '5 free chats',
    },
    {
        title: 'CorporateAttorney',
        description: '기업 변호사로서 여러분의 질문에 답변해드립니다.',
        price: '$14.99 for 25 chats',
        free: '5 free chats',
    },
    {
        title: 'ytscript',
        description:
            '팟캐스트/유튜브 스크립트 어시스턴트입니다. 몇 가지 질문에 답하면 확장할 수 있는 매력적인 스크립트 개요를 받을 수 있습니다.',
        price: '$4.99 for 100 chats',
        free: '10 free chats',
    },
]

export default function MarketplacePage() {
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

                            {/* Search */}
                            <div className="mt-6">
                                <div className="relative max-w-xl">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-gray-400">🔍</span>
                                    <input
                                        placeholder="앱 이름으로 검색..."
                                        className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                            {/* Masonry Grid */}
                            <div className="mt-6 columns-1 gap-6 md:columns-2 xl:columns-3">
                                {/* Join card */}
                                <div className="mb-6 inline-block w-full break-inside-avoid rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5">
                                    <p className="text-lg font-semibold text-gray-900">📈 노출 확대</p>
                                    <p className="mt-2 text-sm text-gray-600">마켓플레이스에 등록하기</p>
                                    <button className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800">⚡ 지금 참여하기</button>
                                </div>

                                {MOCK_APPS.map((app, idx) => (
                                    <div key={idx} className="mb-6 inline-block w-full break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5">
                                        <p className="truncate text-lg font-semibold text-gray-900">{app.title}</p>
                                        <p className="mt-2 text-sm leading-6 text-gray-700">{app.description}</p>
                                        <div className="mt-4 text-sm">
                                            <p className="text-gray-500">가격</p>
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


