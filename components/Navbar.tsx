import { Wifi, Shield, Zap, Globe } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-green-600 p-2 rounded-lg">
                    <Wifi className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">MikroTik</h1>
                    <p className="text-xs text-green-600 font-medium -mt-1 uppercase tracking-wider">Education Hotspot</p>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <a href="#" className="hover:text-green-600 transition-colors">How it works</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            </div>

            <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-500">SYSTEM READY</span>
            </div>
        </nav>
    );
}
