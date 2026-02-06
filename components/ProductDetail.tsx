import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';
import { 
    Settings, 
    Diamond, 
    Brush, 
    ArrowRight, 
    ChevronDown, 
    ArrowUpRight,
    AtSign,
    Globe
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
    return (
        <div className="flex flex-col bg-design-dark min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden w-full">
                <div className="absolute inset-0 bg-radial-glow pointer-events-none z-0"></div>
                
                {/* Background Text */}
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black tracking-[-0.05em] text-[#221e10] select-none z-0 whitespace-nowrap pointer-events-none"
                >
                    SIGNATURE
                </motion.h1>

                <div className="container mx-auto px-4 z-10 relative h-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
                    
                    {/* Left Specs */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col gap-24 lg:gap-32 w-full lg:w-1/4 items-center lg:items-end text-center lg:text-right order-2 lg:order-1"
                    >
                        <div className="group flex flex-col gap-2 relative">
                            <div className="hidden lg:block absolute -right-8 top-1/2 w-16 h-[1px] bg-[#544e3b] group-hover:bg-primary/50 transition-colors duration-500"></div>
                            <h3 className="text-gradient-platinum text-xl lg:text-2xl font-light tracking-wide">CALIBER 9000</h3>
                            <p className="text-[#888274] text-xs tracking-[0.1em] uppercase">Automatic Movement <br/> 28,800 vph</p>
                        </div>
                        <div className="group flex flex-col gap-2 relative">
                            <div className="hidden lg:block absolute -right-8 top-1/2 w-16 h-[1px] bg-[#544e3b] group-hover:bg-primary/50 transition-colors duration-500"></div>
                            <h3 className="text-gradient-platinum text-xl lg:text-2xl font-light tracking-wide">SAPPHIRE</h3>
                            <p className="text-[#888274] text-xs tracking-[0.1em] uppercase">Double-domed <br/> Anti-reflective</p>
                        </div>
                    </motion.div>

                    {/* Center Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-[3/4] flex items-center justify-center order-1 lg:order-2 group cursor-zoom-in"
                    >
                        <div 
                            className="relative z-10 w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-2xl filter contrast-125 transition-transform duration-700 ease-[0.25,0.1,0.25,1] group-hover:scale-125" 
                            style={{ backgroundImage: `url("${IMAGES.signature.hero}")` }}
                        >
                        </div>
                        <div className="absolute inset-0 rounded-full shadow-[0_0_100px_-20px_rgba(242,185,13,0.15)] pointer-events-none transition-opacity duration-500 group-hover:opacity-50"></div>
                    </motion.div>

                    {/* Right Specs */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col gap-24 lg:gap-32 w-full lg:w-1/4 items-center lg:items-start text-center lg:text-left order-3"
                    >
                        <div className="group flex flex-col gap-2 relative">
                            <div className="hidden lg:block absolute -left-8 top-1/2 w-16 h-[1px] bg-[#544e3b] group-hover:bg-primary/50 transition-colors duration-500"></div>
                            <h3 className="text-primary/90 text-xl lg:text-2xl font-light tracking-wide">72HR RESERVE</h3>
                            <p className="text-[#888274] text-xs tracking-[0.1em] uppercase">Twin barrel <br/> mainspring system</p>
                        </div>
                        <div className="group flex flex-col gap-2 relative">
                            <div className="hidden lg:block absolute -left-8 top-1/2 w-16 h-[1px] bg-[#544e3b] group-hover:bg-primary/50 transition-colors duration-500"></div>
                            <h3 className="text-gradient-platinum text-xl lg:text-2xl font-light tracking-wide">TITANIUM</h3>
                            <p className="text-[#888274] text-xs tracking-[0.1em] uppercase">Grade 5 Brushed <br/> Casing Finish</p>
                        </div>
                    </motion.div>

                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="relative z-20 mt-12 mb-12 flex flex-col items-center gap-6"
                >
                    <p className="text-[#bab29c] text-sm font-light italic tracking-widest max-w-md text-center px-4">
                        "Time is not measured by clocks, but by moments."
                    </p>
                    <button className="group relative flex items-center gap-3 overflow-hidden rounded-sm bg-primary px-8 py-3 text-background-dark transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        <span className="text-sm font-bold tracking-[0.15em]">RESERVE VIEWING</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </motion.div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <span className="text-[10px] tracking-[0.2em] text-[#544e3b]">EXPLORE</span>
                    <ChevronDown className="w-4 h-4 text-[#544e3b]" />
                </div>
            </section>

            {/* Precision Engineering Section */}
            <section className="bg-[#13110d] py-24 border-t border-[#2a261a]">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                    >
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">PRECISION <span className="text-primary font-serif italic">Engineering</span></h2>
                            <p className="text-[#888274] text-lg font-light leading-relaxed">
                                Every component of the Aurelion Signature is finished by hand. From the chamfered bridges to the polished screw heads, no detail is too small for perfection.
                            </p>
                        </div>
                        <a className="text-primary hover:text-white text-sm font-bold tracking-[0.15em] flex items-center gap-2 transition-colors" href="#">
                            FULL SPECIFICATIONS <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 border-t border-[#2a261a]">
                        
                        {/* Card 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="group relative p-8 border-l border-b md:border-b-0 border-[#2a261a] hover:bg-[#1a1814] transition-colors duration-500"
                        >
                            <div 
                                className="mb-6 h-48 w-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                                style={{ backgroundImage: `url("${IMAGES.signature.movement}")` }}
                            ></div>
                            <div className="flex items-center gap-3 mb-2">
                                <Settings className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                <h4 className="text-white text-lg font-medium tracking-wide">The Movement</h4>
                            </div>
                            <p className="text-[#888274] text-sm leading-relaxed">In-house Caliber 9000 with exposed tourbillon, visible through the sapphire caseback.</p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="group relative p-8 border-l border-b md:border-b-0 border-[#2a261a] hover:bg-[#1a1814] transition-colors duration-500"
                        >
                            <div 
                                className="mb-6 h-48 w-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                                style={{ backgroundImage: `url("${IMAGES.signature.material}")` }}
                            ></div>
                            <div className="flex items-center gap-3 mb-2">
                                <Diamond className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                <h4 className="text-white text-lg font-medium tracking-wide">The Material</h4>
                            </div>
                            <p className="text-[#888274] text-sm leading-relaxed">Aerospace-grade titanium meeting sapphire crystal for unyielding durability.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="group relative p-8 border-l border-r border-[#2a261a] hover:bg-[#1a1814] transition-colors duration-500"
                        >
                            <div 
                                className="mb-6 h-48 w-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                                style={{ backgroundImage: `url("${IMAGES.signature.finish}")` }}
                            ></div>
                            <div className="flex items-center gap-3 mb-2">
                                <Brush className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                <h4 className="text-white text-lg font-medium tracking-wide">The Finish</h4>
                            </div>
                            <p className="text-[#888274] text-sm leading-relaxed">Hand-brushed platinum accents on a slate dial, creating a play of light and shadow.</p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Detail Page Footer */}
            <footer className="border-t border-[#2a261a] bg-[#181611] px-6 py-12 lg:px-20 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <h5 className="text-off-white font-serif text-lg tracking-[0.1em] uppercase">Aurelion</h5>
                        <p className="text-[#544e3b] text-sm">© 2024 Aurelion Timepieces.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['Privacy', 'Terms', 'Boutiques'].map(item => (
                            <a key={item} className="text-[#888274] hover:text-white text-xs tracking-[0.1em] transition-colors" href="#">{item}</a>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <a className="text-[#888274] hover:text-primary transition-colors" href="#">
                            <AtSign className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                        <a className="text-[#888274] hover:text-primary transition-colors" href="#">
                            <Globe className="w-5 h-5" strokeWidth={1.5} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};