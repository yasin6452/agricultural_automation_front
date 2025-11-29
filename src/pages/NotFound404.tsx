import React, { useState, useEffect } from 'react';
import { Home, ArrowRight, Search, RefreshCw } from 'lucide-react';

// Define particle type
interface Particle {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
}

export default function NotFound404() {
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setMounted(true);

        // Generate random particles for background animation
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10,
            size: 4 + Math.random() * 8
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated Background Particles */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-emerald-300/20 animate-float"
                    style={{
                        left: `${particle.left}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}

            {/* Main Content */}
            <div className={`relative z-10 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* 404 Number with Animation */}
                <div className="relative mb-8">
                    <div className="text-[200px] font-black leading-none select-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 animate-pulse-slow inline-block">
                            4
                        </span>
                        <span className="relative inline-block mx-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                                0
                            </span>
                            {/* Rotating Circle Animation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 border-4 border-emerald-400 rounded-full animate-spin-slow opacity-50"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 border-4 border-teal-400 rounded-full animate-spin-reverse opacity-50"></div>
                            </div>
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 animate-pulse-slow inline-block">
                            4
                        </span>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-70 blur-sm"></div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
                    صفحه مورد نظر یافت نشد!
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed animate-fade-in-delay">
                    متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
                </p>

                {/* Animated Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <Search className="text-emerald-500 animate-pulse" size={80} strokeWidth={1.5} />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-emerald-500/20 rounded-full blur-md animate-pulse"></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex items-center gap-2">
                            <Home size={24} />
                            <span>بازگشت به خانه</span>
                        </div>
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="group px-8 py-4 bg-white text-gray-800 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-emerald-500"
                    >
                        <div className="flex items-center gap-2">
                            <ArrowRight size={24} className="group-hover:animate-bounce-horizontal" />
                            <span>صفحه قبل</span>
                        </div>
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="group px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <RefreshCw size={24} className="group-hover:animate-spin" />
                    </button>
                </div>

                {/* Suggestions */}
                <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-lg mx-auto animate-fade-in-delay-3">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">پیشنهادات:</h3>
                    <ul className="text-right text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">✓</span>
                            <span>آدرس صفحه را بررسی کنید</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">✓</span>
                            <span>از منوی اصلی استفاده کنید</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-1">✓</span>
                            <span>به صفحه اصلی بازگردید</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0.5;
          }
          75% {
            opacity: 0.3;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
        </div>
    );
}