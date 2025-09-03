import Link from 'next/link'
import { useRouter } from 'next/router'

function NavSection({ title }: { title: string }) {
    return (
        <p className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
    )
}

function NavItem({ href = '#', children, active = false }: { href?: string; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`${active ? 'bg-indigo-100/80 text-gray-900' : 'text-gray-800 hover:bg-gray-100'} flex items-center gap-3 rounded-xl px-3 py-3 transition-colors`}
        >
            <span className="text-[15px] font-medium">{children}</span>
        </Link>
    )
}

export default function Sidebar() {
    const router = useRouter()
    const currentPath = router.pathname

    return (
        <aside className="fixed left-0 top-0 z-50 h-screen w-sidebar flex-col border-r border-gray-200 bg-white px-3 py-4">
            {/* Logo */}
            <div className="flex items-center gap-3 px-3 py-2">
                <div className="grid h-8 w-8 place-items-center rounded bg-black text-white text-sm font-bold">C</div>
                <span className="text-lg font-bold text-gray-900">CalStudio</span>
            </div>

            {/* Navigation */}
            <nav className="mt-6 flex-1">
                <NavSection title="Dashboard" />
                <NavItem href="/dashboard" active={currentPath === '/dashboard'}>Dashboard</NavItem>

                <NavSection title="Manage" />
                <NavItem href="/marketplace" active={currentPath === '/marketplace'}>Marketplace</NavItem>
                <NavItem href="/users" active={currentPath === '/users'}>Users</NavItem>
            </nav>

            {/* Support */}
            <div className="mt-auto">
                <NavSection title="Support" />
                <NavItem href="#" active={false}>Help Center</NavItem>
                <NavItem href="#" active={false}>Contact</NavItem>
            </div>

            {/* Message limit */}
            <div className="mt-4 rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Message Limit</p>
                <p className="text-sm font-semibold text-gray-900">0 / 100</p>
            </div>

            {/* Logout */}
            <button className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200">
                Logout
            </button>
        </aside>
    )
}


