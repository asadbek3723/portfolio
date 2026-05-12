import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Search, Zap, Globe } from 'lucide-react';

const SEOBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            const interval = setInterval(() => {
                setScore(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 20);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl"
                >
                    <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-4 md:p-6 overflow-hidden relative group">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-50" />

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30">
                                    <ShieldCheck size={28} className="animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight">
                                        SEO Audit: <span className="text-emerald-400">Perfected</span>
                                    </h3>
                                    <p className="text-gray-400 text-sm">Asadbek Jumanazarov Azamat o'g'li - Google Index Ready</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 md:gap-10">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-white">{score}%</div>
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">SEO Score</div>
                                </div>

                                <div className="h-10 w-[1px] bg-white/10 hidden md:block" />

                                <div className="flex items-center gap-4 text-xs font-semibold text-gray-300">
                                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                        <Search size={14} className="text-blue-400" />
                                        <span>Rank #1</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                        <Zap size={14} className="text-yellow-400" />
                                        <span>Lighthouse 100</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                        <Globe size={14} className="text-purple-400" />
                                        <span>Global SEO</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="bg-white/10 hover:bg-white/20 text-white/50 hover:text-white px-4 py-2 rounded-xl text-sm transition-all border border-white/5"
                            >
                                Yopish
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${score}%` }} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SEOBar;
