import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black py-20 px-6 border-t border-white/5 text-center relative z-20">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="font-serif text-2xl tracking-[0.4em] text-white mb-10 hover:text-primary transition-colors duration-500 cursor-default">
                    AURELION
                </h2>
                
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
                    {['Legal', 'Privacy', 'Contact', 'Press', 'Careers'].map((item) => (
                        <a 
                            key={item} 
                            href="#" 
                            className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>
                
                <p className="text-gray-700 text-[10px] tracking-widest">
                    © 2024 Aurelion Timepieces. Geneva, Switzerland.
                </p>
            </div>
        </footer>
    );
};