import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';
import {
    Calendar,
    Timer,
    Ruler,
    Diamond,
    Settings2,
    Waves,
    ShieldCheck,
    Eye,
    Menu,
    X
} from 'lucide-react';

interface VerticalGalleryProps {
    onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

export const VerticalGallery: React.FC<VerticalGalleryProps> = ({ onNavigate }) => {
    return (
        <div className="bg-background-dark text-white overflow-hidden font-display antialiased w-full h-screen relative">

            {/* Gallery Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/10">
                <div className="px-6 md:px-12 py-6">
                    <div className="relative flex items-center justify-between">
                        <nav className="hidden md:flex items-center gap-10">
                            <button
                                onClick={() => onNavigate('home')}
                                className="text-off-white/70 hover:text-off-white text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500"
                            >
                                Home
                            </button>
                            <button
                                className="text-off-white text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500 cursor-default"
                            >
                                Collection
                            </button>
                        </nav>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" onClick={() => onNavigate('home')}>
                            <h2 className="font-serif text-2xl md:text-3xl text-off-white tracking-[0.1em] uppercase hover:text-primary transition-colors">
                                Aurelion
                            </h2>
                        </div>

                        <nav className="hidden md:flex items-center gap-10">
                            <button
                                onClick={() => onNavigate('craft')}
                                className="text-off-white/70 hover:text-off-white text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500"
                            >
                                Craft
                            </button>
                            <button
                                onClick={() => onNavigate('contact')}
                                className="text-off-white/70 hover:text-off-white text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-500"
                            >
                                Contact
                            </button>
                        </nav>

                        <button className="md:hidden text-off-white ml-auto">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Scroll Indicator */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 items-center">
                <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-white/20"></div>
                <span className="text-[10px] text-primary font-mono writing-mode-vertical rotate-180 tracking-widest" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
                <div className="h-16 w-[1px] bg-gradient-to-t from-transparent via-white/20 to-white/20"></div>
            </div>

            {/* Main Snap Container */}
            <main className="snap-container h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">

                {/* Section 1: Pilot */}
                <section className="snap-section h-screen w-full relative flex items-center justify-center overflow-hidden group snap-start">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#181611] via-background-dark to-black z-0"></div>
                    <div className="absolute top-0 right-0 w-[60vw] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="container mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center relative z-10 pt-24 pb-10">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-5/12 flex flex-col justify-center lg:pr-12 order-2 lg:order-1 mt-8 lg:mt-0"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-primary font-mono text-sm">01</span>
                                <div className="h-[1px] w-12 bg-primary/30"></div>
                                <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Pilot Series</span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                                The Celestial <br /> <span className="italic text-white/80">Navigator</span>
                            </h1>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mb-10 font-light border-l border-primary/20 pl-6">
                                Titanium Grade 5. Midnight Blue Dial. A tribute to the stars that guided ancient voyagers across the dark seas.
                            </p>
                            <div className="flex items-center gap-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                                <button className="px-8 py-3 bg-transparent border border-white/20 hover:border-primary hover:bg-primary/5 hover:text-primary text-white text-sm font-bold uppercase tracking-widest rounded transition-all duration-300">
                                    Explore
                                </button>
                                <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <span>Book Viewing</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Image Content */}
                        <div className="w-full lg:w-7/12 h-[50vh] lg:h-full flex items-center justify-center relative order-1 lg:order-2 group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out">
                            <div className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-primary/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <div
                                    className="w-[320px] lg:w-[500px] aspect-[3/4] bg-contain bg-center bg-no-repeat drop-shadow-2xl"
                                    style={{ backgroundImage: `url('${IMAGES.gallery.pilot}')` }}
                                ></div>
                            </motion.div>

                            {/* Specs */}
                            <div className="absolute bottom-10 lg:bottom-auto lg:top-[40%] lg:right-0 lg:-translate-y-1/2 flex flex-row lg:flex-col gap-4 lg:gap-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 delay-300">
                                <SpecItem icon={Timer} label="Movement" value="Caliber 900" delay="0ms" />
                                <SpecItem icon={Ruler} label="Diameter" value="42mm" delay="100ms" />
                                <SpecItem icon={Diamond} label="Crystal" value="Sapphire" delay="200ms" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Diver */}
                <section className="snap-section h-screen w-full relative flex items-center justify-center overflow-hidden group border-t border-white/5 snap-start">
                    <div className="absolute inset-0 bg-gradient-to-bl from-black via-surface-dark to-[#050505] z-0"></div>

                    <div className="container mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row-reverse items-center relative z-10 pt-24 pb-10">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-5/12 flex flex-col justify-center lg:pl-12 order-2 lg:order-1 mt-8 lg:mt-0 text-left lg:text-right"
                        >
                            <div className="flex items-center lg:justify-end gap-4 mb-6">
                                <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Dive Series</span>
                                <div className="h-[1px] w-12 bg-primary/30"></div>
                                <span className="text-primary font-mono text-sm">02</span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                                The Onyx <br /> <span className="italic text-white/80">Diver</span>
                            </h1>
                            <div className="flex justify-start lg:justify-end">
                                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mb-10 font-light border-l lg:border-l-0 lg:border-r border-primary/20 pl-6 lg:pl-0 lg:pr-6">
                                    Black Ceramic. 300m Depth Rating. Engineered for the abyss, forged in silence. The ultimate tool for the deep.
                                </p>
                            </div>
                            <div className="flex items-center lg:justify-end gap-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                                <button className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
                                    <span>Specifications</span>
                                    <Settings2 className="w-5 h-5 text-primary" />
                                </button>
                                <button className="px-8 py-3 bg-primary text-[#181611] hover:bg-white hover:text-black text-sm font-bold uppercase tracking-widest rounded transition-all duration-300">
                                    Discover
                                </button>
                            </div>
                        </motion.div>

                        {/* Image Content */}
                        <div className="w-full lg:w-7/12 h-[50vh] lg:h-full flex items-center justify-center relative order-1 lg:order-2 group-hover:scale-[1.02] transition-transform duration-[1500ms] ease-out">
                            <div className="absolute w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] bg-white/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <div
                                    className="w-[320px] lg:w-[500px] aspect-[3/4] bg-contain bg-center bg-no-repeat drop-shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000"
                                    style={{ backgroundImage: `url('${IMAGES.gallery.diver}')` }}
                                ></div>
                            </motion.div>

                            {/* Specs */}
                            <div className="absolute bottom-10 lg:bottom-auto lg:top-[40%] lg:left-0 lg:-translate-y-1/2 flex flex-row lg:flex-col gap-4 lg:gap-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 delay-300">
                                <SpecItem icon={Waves} label="Water Res." value="300m / 1000ft" align="left" delay="0ms" />
                                <SpecItem icon={ShieldCheck} label="Material" value="Black Ceramic" align="left" delay="100ms" />
                                <SpecItem icon={Eye} label="Lume" value="Super-LumiNova" align="left" delay="200ms" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Gold */}
                <section className="snap-section h-screen w-full relative flex items-center justify-center overflow-hidden group border-t border-white/5 snap-start">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181611] via-background-dark to-black z-0"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[40vh] bg-gradient-to-t from-primary/10 to-transparent opacity-50"></div>

                    <div className="container mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center relative z-10 pt-24 pb-10">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-5/12 flex flex-col justify-center lg:pr-12 order-2 lg:order-1 mt-8 lg:mt-0"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-primary font-mono text-sm">03</span>
                                <div className="h-[1px] w-12 bg-primary/30"></div>
                                <span className="text-white/50 text-xs font-bold uppercase tracking-[0.2em]">Masterpiece</span>
                            </div>
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                                The Aurelion <br /> <span className="italic text-primary">Gold</span>
                            </h1>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mb-10 font-light border-l border-primary/20 pl-6">
                                18k Solid Gold. Skeleton Movement. The beating heart of horology exposed in its rawest, most elegant form.
                            </p>
                            <div className="flex items-center gap-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                                <button className="px-8 py-3 bg-transparent border border-primary/40 text-primary hover:bg-primary hover:text-[#181611] text-sm font-bold uppercase tracking-widest rounded transition-all duration-300">
                                    View Craftsmanship
                                </button>
                            </div>
                        </motion.div>

                        {/* Image Content */}
                        <div className="w-full lg:w-7/12 h-[50vh] lg:h-full flex items-center justify-center relative order-1 lg:order-2">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute w-[350px] h-[350px] lg:w-[550px] lg:h-[550px] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-primary/40 transition-colors duration-500"></div>
                                <div className="absolute w-[400px] h-[400px] lg:w-[650px] lg:h-[650px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>

                                <div
                                    className="w-[320px] lg:w-[500px] aspect-[3/4] bg-contain bg-center bg-no-repeat drop-shadow-2xl z-10 hover:scale-105 transition-transform duration-700"
                                    style={{ backgroundImage: `url('${IMAGES.gallery.goldMasterpiece}')` }}
                                ></div>

                                {/* Pointers */}
                                <div className="absolute top-1/4 left-1/4 translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 flex items-center gap-3">
                                    <div className="w-12 h-[1px] bg-primary/50"></div>
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest">18k Gold</span>
                                </div>
                                <div className="absolute bottom-1/3 right-1/4 -translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 flex items-center gap-3 flex-row-reverse text-right">
                                    <div className="w-12 h-[1px] bg-primary/50"></div>
                                    <span className="text-primary text-xs font-bold uppercase tracking-widest">Open Heart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Contact */}
                <section className="snap-section h-screen w-full relative flex items-center justify-center bg-[#181611] border-t border-white/5 snap-start">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent"></div>
                    <div className="text-center relative z-10 flex flex-col items-center gap-8 px-4">
                        <Diamond className="w-12 h-12 text-primary mb-4" strokeWidth={1} />
                        <h2 className="font-serif text-4xl md:text-6xl text-white mb-2">Your Private Appointment</h2>
                        <p className="text-white/60 max-w-lg leading-relaxed">
                            Experience the Aurelion collection in person at our private showroom.
                            Reserved exclusively for serious collectors.
                        </p>
                        <form className="w-full max-w-md mt-8 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onNavigate('contact'); }}>
                            <input className="w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-colors" placeholder="Email Address" type="email" />
                            <button className="w-full bg-primary text-[#181611] font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
                                Request Invitation
                            </button>
                        </form>
                        <div className="flex gap-8 mt-12 text-white/40 text-xs uppercase tracking-widest">
                            <a className="hover:text-primary transition-colors" href="#">Instagram</a>
                            <a className="hover:text-primary transition-colors" href="#">Twitter</a>
                            <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

const SpecItem = ({ icon: Icon, label, value, align = "right", delay }: { icon: any, label: string, value: string, align?: "left" | "right", delay: string }) => (
    <div
        className={`flex flex-col ${align === "left" ? "items-start" : "lg:items-end"} text-center ${align === "left" ? "text-left" : "lg:text-right"} gap-1 backdrop-blur-sm bg-black/20 p-3 rounded-lg border border-white/5`}
        style={{ transitionDelay: delay }}
    >
        <Icon className="w-5 h-5 text-primary/80 mb-1" strokeWidth={1.5} />
        <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{label}</span>
        <span className="text-white text-sm font-medium">{value}</span>
    </div>
);