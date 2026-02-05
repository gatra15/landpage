'use client';

import { useState } from "react";
import ImageWithFallback from "@/components/figma/ImageWithFallback";
import { Navbar } from '@/components/Navbar';
import { VideoPlayer } from '@/components/VideoPlayer';
import { WifiStatus } from '@/components/WifiStatus';
import { Globe, Shield, Zap, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

const FEATURES = [
  { icon: Zap, title: "High Speed", desc: "Up to 100Mbps download speeds." },
  { icon: Shield, title: "Secure", desc: "Enterprise-grade WPA2/WPA3 isolation." },
  { icon: BookOpen, title: "Learn First", desc: "Access knowledge before you browse." },
  { icon: Globe, title: "Global Access", desc: "Available throughout the campus." }
];

export default function Home() {
  const [videoWatched, setVideoWatched] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              ACTIVE HOTSPOT ZONE
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Learn while you <br />
              <span className="text-green-600">Get Connected.</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-xl">
              Welcome to the MikroTik Educational Hotspot. To maintain a safe and productive environment, please watch the short video to unlock your high-speed internet session.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{f.title}</h4>
                    <p className="text-sm text-gray-500 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-30 -z-10"></div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1647880087466-a1318b812de5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWZpJTIwc2lnbmFsJTIwaWNvbiUyMDNkfGVufDF8fHx8MTc3MDI2NjI2MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Networking Hotspot"
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                <p className="text-sm font-bold text-gray-900 uppercase">Verified Area</p>
              </div>
            </div>
          </motion.div>
        </div>

        <section id="watch" className="py-16 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Step 1: Complete Training</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              The video player tracks your progress automatically. Once finished, the connection button will unlock below.
            </p>
          </div>

          <VideoPlayer
            videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
            onComplete={() => setVideoWatched(true)}
          />

          <div className="pt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight">Step 2: Get Online</h2>
            </div>
            <WifiStatus isReady={videoWatched} />
          </div>
        </section>
      </main>
    </div>
  );
}
