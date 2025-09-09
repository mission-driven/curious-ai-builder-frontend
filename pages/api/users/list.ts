import type { NextApiRequest, NextApiResponse } from 'next'

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

export default function handler(req: NextApiRequest, res: NextApiResponse<UsersData | { error: string }>) {
    const { page = '1', limit = '10', search, app } = req.query

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)

    // 🎭 목업 사용자 데이터
    const allUsers: User[] = [
        {
            id: '1',
            name: '대연 김',
            email: 'david@mission-driven.kr',
            total: 8,
            lastActive: '2025-01-09T06:47:19Z',
            apps: ['test1kkjo', 'google'],
            joinDate: '2025-01-09T00:00:00Z'
        },
        {
            id: '2',
            name: '민수 박',
            email: 'minsu@example.com',
            total: 15,
            lastActive: '2025-01-08T14:30:00Z',
            apps: ['contentideation', 'ytscript'],
            joinDate: '2025-01-05T00:00:00Z'
        },
        {
            id: '3',
            name: '지영 이',
            email: 'jiyoung@example.com',
            total: 23,
            lastActive: '2025-01-08T09:15:00Z',
            apps: ['programmingUsingLLMs', 'CodeReviewer'],
            joinDate: '2025-01-03T00:00:00Z'
        },
        {
            id: '4',
            name: '현우 최',
            email: 'hyunwoo@example.com',
            total: 7,
            lastActive: '2025-01-07T16:45:00Z',
            apps: ['EmploymentLawyer'],
            joinDate: '2025-01-06T00:00:00Z'
        },
        {
            id: '5',
            name: '서연 정',
            email: 'seoyeon@example.com',
            total: 31,
            lastActive: '2025-01-08T11:20:00Z',
            apps: ['SocialMediaManager', 'ytscript', 'contentideation'],
            joinDate: '2025-01-02T00:00:00Z'
        },
        {
            id: '6',
            name: '준호 김',
            email: 'junho@example.com',
            total: 12,
            lastActive: '2025-01-07T13:10:00Z',
            apps: ['PersonalTrainer'],
            joinDate: '2025-01-04T00:00:00Z'
        },
        {
            id: '7',
            name: '수진 홍',
            email: 'sujin@example.com',
            total: 19,
            lastActive: '2025-01-08T08:30:00Z',
            apps: ['CorporateAttorney', 'EmploymentLawyer'],
            joinDate: '2025-01-01T00:00:00Z'
        },
        {
            id: '8',
            name: '태현 강',
            email: 'taehyun@example.com',
            total: 6,
            lastActive: '2025-01-06T19:25:00Z',
            apps: ['programmingUsingLLMs'],
            joinDate: '2025-01-07T00:00:00Z'
        },
        {
            id: '9',
            name: '예린 송',
            email: 'yerin@example.com',
            total: 27,
            lastActive: '2025-01-08T15:40:00Z',
            apps: ['ytscript', 'SocialMediaManager', 'contentideation'],
            joinDate: '2024-12-30T00:00:00Z'
        },
        {
            id: '10',
            name: '동현 윤',
            email: 'donghyun@example.com',
            total: 14,
            lastActive: '2025-01-07T12:55:00Z',
            apps: ['CodeReviewer', 'programmingUsingLLMs'],
            joinDate: '2025-01-05T00:00:00Z'
        }
    ]

    // 필터링 로직
    let filteredUsers = allUsers

    // 검색 필터 (이름 또는 이메일)
    if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase()
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        )
    }

    // 앱 필터
    if (app && typeof app === 'string') {
        filteredUsers = filteredUsers.filter(user =>
            user.apps.includes(app)
        )
    }

    // 페이지네이션
    const startIndex = (pageNum - 1) * limitNum
    const endIndex = startIndex + limitNum
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    const responseData: UsersData = {
        users: paginatedUsers,
        totalCount: filteredUsers.length,
        page: pageNum,
        limit: limitNum
    }

    res.status(200).json(responseData)
}
