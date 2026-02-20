import React from 'react';
import { motion } from 'framer-motion';

export const ScrollIndicator: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, y: [0, 10, 0] }}
            transition={{
                opacity: { delay: 1.5, duration: 1 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        >
            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </motion.div>
    );
};
