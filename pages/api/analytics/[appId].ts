import type { NextApiRequest, NextApiResponse } from 'next'

type AnalyticsData = {
    totalMessages: number
    totalUsers: number
    totalPayments: number
    totalViews: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse<AnalyticsData | { error: string }>) {
    const { appId } = req.query

    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    if (!appId || typeof appId !== 'string') {
        return res.status(400).json({ error: 'Invalid appId' })
    }

    // 🎭 목업 데이터 - 실제로는 DB에서 조회
    const mockData: AnalyticsData = {
        totalMessages: Math.floor(Math.random() * 100) + 10,
        totalUsers: Math.floor(Math.random() * 50) + 5,
        totalPayments: Math.floor(Math.random() * 20),
        totalViews: Math.floor(Math.random() * 200) + 20
    }

    // 실제 구현 시에는 여기서 DB 조회
    // const analytics = await getAnalyticsForApp(appId)

    res.status(200).json(mockData)
}
