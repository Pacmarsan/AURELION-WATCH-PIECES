import React from 'react';
import { HeroBackground } from './HeroBackground';
import { WatchDisplay } from './WatchDisplay';
import { HeroContent } from './HeroContent';
import { ScrollIndicator } from './ScrollIndicator';

interface HeroProps {
    onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <section className="relative flex-grow flex flex-col items-center justify-center min-h-[100vh] w-full bg-void-gradient overflow-hidden pt-20">
            <HeroBackground />
            <WatchDisplay />
            <HeroContent onNavigate={onNavigate} />
            <ScrollIndicator />
        </section>
    );
};
