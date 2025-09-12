import Head from 'next/head'
import dynamic from 'next/dynamic'

const AppView = dynamic(() => import('../../components/AppView'), { ssr: false })

export default function PublicAppPage() {
    return (
        <>
            <Head>
                <title>AI App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <AppView />
        </>
    )
}
