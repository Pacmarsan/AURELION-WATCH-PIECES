import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroContentProps {
    onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onNavigate }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-20 text-center flex flex-col items-center gap-8 -mt-8 md:-mt-12"
        >
            <h2 className="text-glow text-gray-200 text-sm md:text-base font-light tracking-[0.4em] uppercase opacity-80">
                Precision, Refined.
            </h2>

            <button
                onClick={() => onNavigate('gallery')}
                className="group relative inline-flex items-center justify-center px-12 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border border-white/10 rounded-full shadow-lg hover:border-primary/50"
            >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-void duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                    <ArrowRight className="w-4 h-4" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease text-[10px] md:text-xs uppercase tracking-widest font-bold">
                    Enter Boutique
                </span>
                <span className="relative invisible text-xs uppercase tracking-widest">Enter Boutique</span>
            </button>
        </motion.div>
    );
};
