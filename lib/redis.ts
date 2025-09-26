import { createClient, RedisClientType } from 'redis'

// Redis 클라이언트 인스턴스
let redis: RedisClientType | null = null

/**
 * Redis 클라이언트를 초기화하고 반환합니다
 * @returns Redis 클라이언트 인스턴스
 */
export async function getRedisClient(): Promise<RedisClientType> {
    if (redis && redis.isOpen) {
        return redis
    }

    // Redis 연결 설정
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

    redis = createClient({
        url: redisUrl,
        socket: {
            reconnectStrategy: (retries) => {
                if (retries > 10) {
                    console.error('Redis connection failed after 10 retries')
                    return new Error('Redis connection failed')
                }
                return Math.min(retries * 100, 3000)
            }
        }
    })

    // 에러 핸들링
    redis.on('error', (err) => {
        console.error('Redis Client Error:', err)
    })

    redis.on('connect', () => {
        console.log('Redis Client Connected')
    })

    redis.on('ready', () => {
        console.log('Redis Client Ready')
    })

    redis.on('end', () => {
        console.log('Redis Client Disconnected')
    })

    // 연결
    await redis.connect()

    return redis
}

/**
 * Redis 클라이언트를 안전하게 종료합니다
 */
export async function closeRedisClient(): Promise<void> {
    if (redis && redis.isOpen) {
        await redis.quit()
        redis = null
    }
}

/**
 * 세션을 Redis에 저장합니다
 * @param sessionToken 세션 토큰
 * @param userId 사용자 ID
 * @param ttl TTL (초, 기본값: 30일)
 */
export async function setSession(sessionToken: string, userId: string, ttl: number = 30 * 24 * 60 * 60): Promise<void> {
    const client = await getRedisClient()
    await client.setEx(sessionToken, ttl, userId)
}

/**
 * 세션에서 사용자 ID를 조회합니다
 * @param sessionToken 세션 토큰
 * @returns 사용자 ID 또는 null
 */
export async function getSession(sessionToken: string): Promise<string | null> {
    const client = await getRedisClient()
    return await client.get(sessionToken)
}

/**
 * 세션을 삭제합니다
 * @param sessionToken 세션 토큰
 */
export async function deleteSession(sessionToken: string): Promise<void> {
    const client = await getRedisClient()
    await client.del(sessionToken)
}

/**
 * 세션의 TTL을 확인합니다
 * @param sessionToken 세션 토큰
 * @returns TTL (초) 또는 -1 (만료됨), -2 (키가 존재하지 않음)
 */
export async function getSessionTTL(sessionToken: string): Promise<number> {
    const client = await getRedisClient()
    return await client.ttl(sessionToken)
}

/**
 * 세션의 TTL을 연장합니다
 * @param sessionToken 세션 토큰
 * @param ttl 새로운 TTL (초)
 */
export async function extendSession(sessionToken: string, ttl: number = 30 * 24 * 60 * 60): Promise<void> {
    const client = await getRedisClient()
    await client.expire(sessionToken, ttl)
}

/**
 * 사용자의 모든 세션을 조회합니다
 * @param userId 사용자 ID
 * @returns 세션 토큰 배열
 */
export async function getUserSessions(userId: string): Promise<string[]> {
    const client = await getRedisClient()
    const pattern = `*`
    const keys = await client.keys(pattern)

    const sessions: string[] = []
    for (const key of keys) {
        const value = await client.get(key)
        if (value === userId) {
            sessions.push(key)
        }
    }

    return sessions
}

/**
 * 사용자의 모든 세션을 삭제합니다
 * @param userId 사용자 ID
 */
export async function deleteUserSessions(userId: string): Promise<void> {
    const sessions = await getUserSessions(userId)
    const client = await getRedisClient()

    if (sessions.length > 0) {
        await client.del(sessions)
    }
}

/**
 * Redis 연결 상태를 확인합니다
 * @returns 연결 상태
 */
export async function isRedisConnected(): Promise<boolean> {
    try {
        const client = await getRedisClient()
        await client.ping()
        return true
    } catch (error) {
        console.error('Redis connection check failed:', error)
        return false
    }
}

/**
 * Redis 정보를 조회합니다
 * @returns Redis 서버 정보
 */
export async function getRedisInfo(): Promise<string> {
    const client = await getRedisClient()
    return await client.info()
}
