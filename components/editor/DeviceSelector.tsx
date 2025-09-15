import { useState } from 'react'

export type DeviceType = 'tablet-landscape' | 'tablet-portrait' | 'mobile'

interface DeviceSelectorProps {
    onDeviceChange?: (device: DeviceType, dimensions: { width: string; height: string }) => void
}

interface DeviceConfig {
    id: DeviceType
    label: string
    icon: React.ReactNode
    dimensions: { width: string; height: string }
}

const DEVICES: DeviceConfig[] = [
    {
        id: 'tablet-landscape',
        label: '태블릿 가로',
        dimensions: { width: '1024px', height: '768px' },
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'tablet-portrait',
        label: '태블릿 세로',
        dimensions: { width: '768px', height: '1024px' },
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M12 22v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'mobile',
        label: '모바일',
        dimensions: { width: '375px', height: '812px' },
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
]

export default function DeviceSelector({ onDeviceChange }: DeviceSelectorProps) {
    const [selectedDevice, setSelectedDevice] = useState<DeviceType>('mobile')

    const handleDeviceSelect = (device: DeviceType) => {
        setSelectedDevice(device)
        const deviceConfig = DEVICES.find(d => d.id === device)
        if (deviceConfig && onDeviceChange) {
            onDeviceChange(device, deviceConfig.dimensions)
        }
    }

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
            {/* Device Selection Icons */}
            <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                    {DEVICES.map((device) => (
                        <button
                            key={device.id}
                            onClick={() => handleDeviceSelect(device.id)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${selectedDevice === device.id
                                ? 'bg-blue-100 border-blue-300 text-blue-600'
                                : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                                }`}
                            title={device.label}
                        >
                            {device.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Create App Button */}
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                앱 생성
            </button>
        </div>
    )
}
