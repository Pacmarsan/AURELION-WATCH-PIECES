import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (name: string, href: string) => {
        if (name === 'Collection') {
            onNavigate('gallery');
        } else if (name === 'Home') {
            onNavigate('home');
        } else if (name === 'Craft') {
            onNavigate('craft');
        } else if (name === 'Contact') {
            onNavigate('contact');
        } else {
            // For other links, we might just scroll or navigate if there were other pages
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-void/90 backdrop-blur-md py-2 border-b border-white/5' : 'bg-transparent py-4 border-b border-white/5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between relative">

                {/* Desktop Left Links */}
                <div className="hidden lg:flex flex-1 gap-12 items-center">
                    {NAV_LINKS.slice(0, 2).map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleLinkClick(link.name, link.href)}
                            className="text-[10px] uppercase tracking-widest-xl text-off-white/60 hover:text-primary transition-colors duration-300 font-medium"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-off-white/80 flex-1 flex justify-start"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="w-5 h-5" strokeWidth={1} />
                </button>

                {/* Logo - Centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
                    <button onClick={() => onNavigate('home')} className="group block">
                        <h1 className="font-serif text-xl md:text-2xl tracking-[0.4em] text-off-white group-hover:text-primary transition-colors duration-700">
                            AURELION
                        </h1>
                    </button>
                </div>

                {/* Desktop Right Links */}
                <div className="hidden lg:flex flex-1 justify-end gap-12 items-center">
                    {NAV_LINKS.slice(2).map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleLinkClick(link.name, link.href)}
                            className="text-[10px] uppercase tracking-widest-xl text-off-white/60 hover:text-primary transition-colors duration-300 font-medium"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Mobile Icons */}
                <div className="lg:hidden flex flex-1 justify-end gap-5">
                    <button className="text-off-white/60 hover:text-white transition-colors">
                        <Search className="w-5 h-5" strokeWidth={1} />
                    </button>
                    <button className="text-off-white/60 hover:text-white transition-colors">
                        <ShoppingBag className="w-5 h-5" strokeWidth={1} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="fixed inset-0 bg-void z-50 flex flex-col items-center justify-center lg:hidden"
                    >
                        <button
                            className="absolute top-8 right-8 text-off-white/60 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" strokeWidth={1} />
                        </button>

                        <div className="flex flex-col gap-10 text-center">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleLinkClick(link.name, link.href)}
                                    className="font-serif text-3xl text-off-white hover:text-primary transition-colors italic"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};