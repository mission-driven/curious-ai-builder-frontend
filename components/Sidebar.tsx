import Link from 'next/link'

function NavSection({ title }: { title: string }) {
    return (
        <p className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
    )
}

function NavItem({ href = '#', icon, children, active = false }: { href?: string; icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`${active ? 'bg-indigo-100/80 text-gray-900' : 'text-gray-800 hover:bg-gray-100'} flex items-center gap-3 rounded-xl px-3 py-3 transition-colors`}
        >
            <span className="text-lg">{icon}</span>
            <span className="text-[15px] font-medium">{children}</span>
        </Link>
    )
}

export default function Sidebar() {
    return (
        <aside className="flex min-h-screen w-full max-w-[300px] flex-col border-r border-gray-200 bg-white px-3 py-4">
            {/* Logo */}
            <div className="flex items-center gap-3 px-3 py-2">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-black text-white">C</div>
                <span className="text-xl font-bold tracking-tight text-gray-900">CalStudio</span>
            </div>

            <div className="mt-4" />

            {/* Primary */}
            <NavItem href="/dashboard" icon={<span>🚀</span>}>
                Dashboard
            </NavItem>

            {/* Manage */}
            <NavSection title="Manage" />
            <div className="space-y-1">
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-gray-800 transition-colors hover:bg-gray-100">
                    <span className="text-lg">💳</span>
                    <span className="text-[15px] font-medium">Connect Stripe</span>
                </button>
                <NavItem icon={<span>🛍️</span>} href="/marketplace">Marketplace</NavItem>
                <NavItem icon={<span>👥</span>} href="/users">Users</NavItem>
            </div>

            {/* Support */}
            <NavSection title="Support" />
            <div className="space-y-3">
                <div className="px-3">
                    <p className="text-sm font-medium text-gray-800">Message Limit</p>
                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                        <div className="h-2 w-1/6 rounded-full bg-blue-500" />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">10/50</p>
                </div>
                <NavItem icon={<span>💬</span>}>Join Discord</NavItem>
                <NavItem icon={<span>📨</span>}>Feature Request</NavItem>
                <NavItem icon={<span>↩️</span>}>Changelog</NavItem>
            </div>

            <div className="flex-1" />

            {/* Logout */}
            <button className="mb-2 mt-6 flex items-center gap-3 rounded-xl px-3 py-3 text-gray-800 transition-colors hover:bg-gray-100">
                <span>📤</span>
                <span className="text-[15px] font-medium">Logout</span>
            </button>
        </aside>
    )
}


