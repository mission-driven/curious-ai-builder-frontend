import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function RedirectPage() {
    const router = useRouter()
    const { message, goto, delay } = router.query as { message: string, goto: string, delay: string }
    if (!router.isReady) return <div>Loading...</div>;

    const [countDown, setCountDown] = useState(parseInt(delay) / 1000)

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(String(goto))
        }, parseInt(delay));
        return () => clearTimeout(timeout); // 언마운트 시 타임아웃 정리
    }, [delay, goto]);

    useEffect(() => {
        if (countDown > 0) {
            const timeout = setTimeout(() => setCountDown(countDown - 1), 1000)
            return () => clearTimeout(timeout);
        }
    }, [countDown])

    return (
        <>
            <Head>
                <title>Redirecting...</title>
            </Head>
            <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
                <div className="container mx-auto flex min-h-screen items-center px-4 py-10">
                    <div className="mx-auto w-full max-w-md">
                        <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">Redirecting...</h1>
                        <p className="mt-1 text-center text-sm text-gray-600">{message}</p>
                        <div className="mt-1 text-center text-sm text-gray-600">
                            {countDown} seconds left...
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}