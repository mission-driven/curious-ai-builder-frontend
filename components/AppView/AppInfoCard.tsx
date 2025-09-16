interface AppInfoCardProps {
    name: string;
    description: string;
}

export default function AppInfoCard({ name, description }: AppInfoCardProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold">C</div>
            <div>
                <div className="font-semibold">{name}</div>
                <div className="text-sm">{description}</div>
            </div>
        </div>
    )
}

