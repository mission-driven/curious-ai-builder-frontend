import type { NextApiRequest, NextApiResponse } from 'next'

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

export default function handler(req: NextApiRequest, res: NextApiResponse<MarketplaceData | { error: string }>) {
    const { page = '1', limit = '20', category, search } = req.query

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)

    // 🎭 목업 마켓플레이스 앱 데이터
    const allApps: AppCard[] = [
        {
            id: '1',
            title: 'programmingUsingLLMs',
            description: '개발자들이 AI 지원 프로그래밍을 마스터할 수 있도록 도와줍니다. Copilot & Codeium을 활용한 실습으로 실제 프로젝트를 구축하고 일반적인 문제들을 해결해보세요.',
            price: '€9 for 100 chats',
            free: '3 free chats',
            category: 'development',
            rating: 4.8,
            totalChats: 12500,
            createdAt: '2024-01-15T10:30:00Z'
        },
        {
            id: '2',
            title: 'contentideation',
            description: '특정 틈새 시장의 크리에이터와 웹사이트 소유자를 위한 콘텐츠 아이디어 엔진입니다. 다양하고 매력적인 콘텐츠 프롬프트를 제공합니다.',
            price: '$4.99 for 100 chats',
            free: '10 free chats',
            category: 'content',
            rating: 4.6,
            totalChats: 8900,
            createdAt: '2024-01-20T14:15:00Z'
        },
        {
            id: '3',
            title: 'EmploymentLawyer',
            description: '고용법 변호사로서 여러분의 질문에 답변해드립니다.',
            price: '$14.99 for 25 chats',
            free: '5 free chats',
            category: 'legal',
            rating: 4.9,
            totalChats: 4500,
            createdAt: '2024-02-01T09:45:00Z'
        },
        {
            id: '4',
            title: 'CorporateAttorney',
            description: '기업 변호사로서 여러분의 질문에 답변해드립니다.',
            price: '$14.99 for 25 chats',
            free: '5 free chats',
            category: 'legal',
            rating: 4.7,
            totalChats: 3200,
            createdAt: '2024-02-05T16:20:00Z'
        },
        {
            id: '5',
            title: 'ytscript',
            description: '팟캐스트/유튜브 스크립트 어시스턴트입니다. 몇 가지 질문에 답하면 확장할 수 있는 매력적인 스크립트 개요를 받을 수 있습니다.',
            price: '$4.99 for 100 chats',
            free: '10 free chats',
            category: 'content',
            rating: 4.5,
            totalChats: 21000,
            createdAt: '2024-02-10T11:30:00Z'
        },
        {
            id: '6',
            title: 'CodeReviewer',
            description: '코드 리뷰를 도와주는 AI 어시스턴트입니다. 버그 찾기, 성능 최적화, 코드 스타일 개선을 지원합니다.',
            price: '$7.99 for 50 chats',
            free: '3 free chats',
            category: 'development',
            rating: 4.8,
            totalChats: 18000,
            createdAt: '2024-02-15T13:45:00Z'
        },
        {
            id: '7',
            title: 'SocialMediaManager',
            description: '소셜미디어 콘텐츠 기획과 스케줄링을 도와주는 AI입니다. 인스타그램, 트위터, 페이스북 포스트를 자동 생성합니다.',
            price: '$9.99 for 100 chats',
            free: '5 free chats',
            category: 'marketing',
            rating: 4.4,
            totalChats: 9500,
            createdAt: '2024-02-20T08:15:00Z'
        },
        {
            id: '8',
            title: 'PersonalTrainer',
            description: '개인 맞춤형 운동 계획과 영양 조언을 제공하는 AI 피트니스 트레이너입니다.',
            price: '$12.99 for 30 chats',
            free: '2 free chats',
            category: 'health',
            rating: 4.6,
            totalChats: 6800,
            createdAt: '2024-02-25T15:30:00Z'
        }
    ]

    // 필터링 로직
    let filteredApps = allApps

    // 카테고리 필터
    if (category && typeof category === 'string') {
        filteredApps = filteredApps.filter(app => app.category === category)
    }

    // 검색 필터
    if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase()
        filteredApps = filteredApps.filter(app =>
            app.title.toLowerCase().includes(searchLower) ||
            app.description.toLowerCase().includes(searchLower)
        )
    }

    // 페이지네이션
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedApps = filteredApps.slice(startIndex, endIndex)

    const responseData: MarketplaceData = {
        apps: paginatedApps,
        totalCount: filteredApps.length,
        page: pageNum,
        limit: limitNum
    }

    res.status(200).json(responseData)
}
