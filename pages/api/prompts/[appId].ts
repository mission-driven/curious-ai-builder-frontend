import type { NextApiRequest, NextApiResponse } from 'next'

type Prompt = {
    id: string
    userId: string
    userName: string
    prompt: string
    response: string
    timestamp: string
}

type PromptsData = {
    prompts: Prompt[]
    totalCount: number
    page: number
    limit: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse<PromptsData | { error: string }>) {
    const { appId } = req.query
    const { page = '1', limit = '20' } = req.query

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    if (!appId || typeof appId !== 'string') {
        return res.status(400).json({ error: 'Invalid appId' })
    }

    const pageNum = parseInt(page as string, 10)
    const limitNum = parseInt(limit as string, 10)

    // 🎭 목업 프롬프트 데이터 생성
    const mockPrompts: Prompt[] = Array.from({ length: Math.min(limitNum, 20) }, (_, i) => ({
        id: `prompt_${appId}_${i + 1}`,
        userId: `user_${Math.floor(Math.random() * 10) + 1}`,
        userName: `사용자${Math.floor(Math.random() * 10) + 1}`,
        prompt: `프롬프트 예시 ${i + 1}: ${appId}에 대한 질문입니다.`,
        response: `응답 예시 ${i + 1}: ${appId}에 대한 답변입니다.`,
        timestamp: new Date(Date.now() - i * 3600000).toISOString()
    }))

    const responseData: PromptsData = {
        prompts: mockPrompts,
        totalCount: 100, // 전체 프롬프트 수 (목업)
        page: pageNum,
        limit: limitNum
    }

    // 실제 구현 시에는 여기서 DB 조회
    // const prompts = await getPromptsForApp(appId, pageNum, limitNum)

    res.status(200).json(responseData)
}
