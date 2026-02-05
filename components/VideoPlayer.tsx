'use client';

import { useState, useRef } from 'react';
import { Play, CheckCircle2, AlertCircle, RefreshCw, Volume2, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPlayerProps {
    onComplete: () => void;
    videoUrl: string;
}

export function VideoPlayer({ onComplete, videoUrl }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setProgress((current / total) * 100);
            setDuration(total);
        }
    };

    const handleEnded = () => {
        setIsFinished(true);
        setIsPlaying(false);
        onComplete();
    };

    const reset = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setIsFinished(false);
            setProgress(0);
            togglePlay();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-gray-900 rounded-2xl shadow-2xl group border border-green-500/20">
            <div className="relative aspect-video flex items-center justify-center bg-black">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onClick={togglePlay}
                    playsInline
                    src={videoUrl}
                />

                {/* Overlay Controls */}
                <AnimatePresence>
                    {!isPlaying && !isFinished && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                        >
                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 hover:scale-110 transition-all shadow-xl shadow-green-500/20"
                            >
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </button>
                        </motion.div>
                    )}

                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10"
                        >
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 mb-4">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Course Completed!</h3>
                            <p className="text-gray-300 mb-6">Your internet access is now ready.</p>
                            <button
                                onClick={reset}
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Watch Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Custom Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800/50 group-hover:h-3 transition-all">
                    <motion.div
                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>

                {/* Live Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Live Educational Stream
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                            <Volume2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Digital Safety Essentials</h2>
                            <p className="text-gray-500 text-sm">Mandatory viewing for public hotspot usage.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {!isFinished ? (
                            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-100">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wide">Requirement in progress</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                                <CheckCircle2 className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wide">Requirement Met</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
