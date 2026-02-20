import React from 'react';

export const HeroBackground: React.FC = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none"></div>
    );
};
