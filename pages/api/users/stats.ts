import type { NextApiRequest, NextApiResponse } from 'next'

type UserStats = {
    totalUniqueUsers: number
    totalMessages: number
    avgMessagesPerUser: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse<UserStats | { error: string }>) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    // 🎭 목업 사용자 통계 데이터
    const mockStats: UserStats = {
        totalUniqueUsers: 156,
        totalMessages: 2847,
        avgMessagesPerUser: 18.2
    }

    // 실제 구현 시에는 여기서 DB 조회
    // const stats = await getUserStats()

    res.status(200).json(mockStats)
}
