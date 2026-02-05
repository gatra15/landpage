import React from 'react';
import { Wifi, Lock, Unlock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

interface WifiStatusProps {
    isReady: boolean;
}

export function WifiStatus({ isReady }: WifiStatusProps) {
    const handleConnect = () => {
        if (!isReady) return;

        Swal.fire({
            title: 'Connecting...',
            text: 'Redirecting to MikroTik Gateway',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                // In a real Mikrotik setup, you would redirect here
                console.log("Simulating MikroTik redirect: /login?username=free_user");
                Swal.fire({
                    title: 'Connected!',
                    text: 'Enjoy your free high-speed internet session.',
                    icon: 'success',
                    confirmButtonColor: '#16a34a'
                });
            }
        });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-12 p-1 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className={`rounded-[22px] p-8 transition-colors ${isReady ? 'bg-green-50/50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-8">
                    <div className={`p-4 rounded-2xl ${isReady ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <Wifi className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-500">Current Status</p>
                        <p className={`text-lg font-bold ${isReady ? 'text-green-600' : 'text-gray-400'}`}>
                            {isReady ? 'Ready to Connect' : 'Connection Locked'}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 p-1 rounded-full ${isReady ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                            {isReady ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Success Theme</p>
                            <p className="text-sm text-gray-500">
                                {isReady
                                    ? "Great job! You've successfully completed the required video."
                                    : "Watch the video above to unlock 2 hours of high-speed Wi-Fi."}
                            </p>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        disabled={!isReady}
                        onClick={handleConnect}
                        className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${isReady
                            ? 'bg-green-600 text-white shadow-lg shadow-green-500/30 hover:bg-green-700 cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <span>Connect to Free Wi-Fi</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>

            <div className="px-8 py-4 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    Powered by RouterOS v7.x
                </p>
            </div>
        </div>
    );
}
