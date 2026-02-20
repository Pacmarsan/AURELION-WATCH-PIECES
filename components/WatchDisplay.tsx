import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';

export const WatchDisplay: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square flex items-center justify-center"
        >
            <img
                src={IMAGES.heroWatch}
                alt="Luxury silver chronograph watch with dramatic lighting"
                className="w-full h-full object-contain drop-shadow-2xl opacity-90 hover:scale-[1.02] transition-transform duration-1000 ease-out select-none"
                draggable={false}
            />

            {/* Hotspot */}
            <div className="absolute top-[45%] left-[60%] group cursor-pointer z-20">
                <span className="relative flex h-3 w-3">
                    <motion.span
                        animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                    />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_15px_rgba(242,185,13,0.8)]"></span>
                </span>

                {/* Tooltip */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-40 pointer-events-none translate-x-2 group-hover:translate-x-0 ease-out">
                    <p className="text-[10px] uppercase tracking-widest text-primary border-l border-primary pl-3 py-1 font-medium bg-void/50 backdrop-blur-sm">
                        Sapphire Crystal
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
