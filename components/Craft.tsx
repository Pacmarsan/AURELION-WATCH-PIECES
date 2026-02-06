import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';
import { 
    Infinity as InfinityIcon,
    Diamond,
    Globe,
    ArrowRight,
    Settings,
    Brush,
    ChevronDown,
    ArrowUpRight,
    ChevronRight
} from 'lucide-react';

export const Craft: React.FC = () => {
    return (
        <div className="flex flex-col bg-background-dark min-h-screen font-display text-off-white selection:bg-primary/30 selection:text-white">
            {/* --- Section 1: Knurled Crown Hero --- */}
            <section className="flex-grow flex flex-col lg:flex-row w-full min-h-[calc(100vh-64px)] pt-16">
                
                {/* Left: Interactive Image */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="lg:w-[60%] relative h-[50vh] lg:h-auto overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-background-dark z-0"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full z-0"></div>
                    
                    <div className="absolute inset-0 z-10">
                        <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-100" 
                            style={{ backgroundImage: `url("${IMAGES.craft.hero}")` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background-dark/90 lg:to-background-dark"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark lg:hidden"></div>
                    </div>

                    {/* Hotspot */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        className="absolute top-[40%] left-[55%] z-20 flex items-center justify-center w-12 h-12 cursor-pointer group/hotspot"
                    >
                        <div className="absolute w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(242,185,13,0.6)]"></div>
                        <div className="absolute w-full h-full border border-primary/30 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute w-full h-full border border-primary/50 rounded-full scale-150 opacity-0 group-hover/hotspot:opacity-100 group-hover/hotspot:scale-100 transition-all duration-500"></div>
                        
                        {/* Tooltip */}
                        <div className="absolute left-14 top-1/2 -translate-y-1/2 w-48 opacity-0 group-hover/hotspot:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-[#221e10]/90 backdrop-blur border border-white/10 p-3 rounded text-left">
                                <p className="text-primary text-[10px] uppercase tracking-widest font-bold mb-1">Ruby Bearing</p>
                                <p className="text-gray-400 text-xs leading-relaxed">Synthetic corundum for frictionless rotation.</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Content */}
                <div className="lg:w-[40%] flex flex-col justify-center px-8 py-16 lg:py-0 lg:pr-24 lg:pl-16 relative z-20 bg-background-dark">
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-lg mx-auto lg:mx-0 flex flex-col"
                    >
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] mb-10 font-medium text-white/30">
                            <span className="hover:text-white transition-colors cursor-pointer">Home</span>
                            <ChevronRight className="w-3 h-3 text-white/20" />
                            <span className="hover:text-white transition-colors cursor-pointer">Collection</span>
                            <ChevronRight className="w-3 h-3 text-white/20" />
                            <span className="text-white">Signature</span>
                        </div>

                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-8 bg-primary"></div>
                                    <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Precision Engineering</span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif-craft font-light text-white leading-[1.1] tracking-[-0.02em]">
                                    THE <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">KNURLED</span><br/>CROWN
                                </h1>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/20 via-primary/40 to-transparent"></div>

                            <div className="flex flex-col gap-6">
                                <p className="text-[#bab29c] text-base lg:text-lg font-light leading-relaxed">
                                    Carved from a single block of 18k gold, the tactile feedback of the crown is tuned to a precise resistance, offering a connection between the wearer and the movement within. Every ridge is hand-polished to ensure a frictionless interaction, embodying the perfect balance of form and function.
                                </p>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-4 border-l border-white/5 pl-8">
                                {[
                                    { label: "Material", value: "18k Rose Gold" },
                                    { label: "Finish", value: "Hand-Polished Chamfers" },
                                    { label: "Diameter", value: "6.5mm" },
                                    { label: "Resistance", value: "100m / 330ft" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-1">
                                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">{item.label}</p>
                                        <p className="text-white text-sm tracking-wide">{item.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <button className="group flex items-center gap-4 text-white hover:text-primary transition-colors duration-300">
                                    <span className="text-xs font-bold uppercase tracking-[0.25em]">Explore the Movement</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Section 2: Craft Cards --- */}
            <section className="w-full bg-[#221e10] py-32 px-6 lg:px-20 border-t border-white/5 relative z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <CraftCard 
                            icon={InfinityIcon} 
                            title="Micro-Engineering" 
                            text="Tolerances measured in microns. Every component is a testament to our obsession with absolute perfection." 
                            delay={0.2}
                        />
                        <CraftCard 
                            icon={Diamond} 
                            title="Hand-Finished" 
                            text="From the sapphire crystal to the escapement, no detail is too small. Every edge beveled by hand." 
                            delay={0.4}
                        />
                        <CraftCard 
                            icon={Globe} 
                            title="Swiss Made" 
                            text="Certified precision from Geneva. A heritage of horology that spans centuries of innovation." 
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* --- Section 3: Signature Hero --- */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden w-full border-t border-white/5 bg-[#181611]">
                <div className="absolute inset-0 bg-radial-glow pointer-events-none z-0"></div>
                
                {/* Background Text */}
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 0.5, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black tracking-[-0.05em] text-[#221e10] select-none z-0 whitespace-nowrap pointer-events-none"
                >
                    SIGNATURE
                </motion.h1>

                <div className="container mx-auto px-4 z-10 relative h-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 py-24">
                    
                    {/* Left Specs */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
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
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
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
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative z-20 mt-8 mb-16 flex flex-col items-center gap-6"
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

            {/* --- Section 4: Precision Engineering --- */}
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
        </div>
    );
};

const CraftCard = ({ icon: Icon, title, text, delay }: { icon: any, title: string, text: string, delay: number }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="group p-10 border border-white/5 bg-background-dark hover:border-primary/20 transition-all duration-700 rounded-sm"
    >
        <div className="text-primary mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
            <Icon className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h3 className="text-white text-base font-bold uppercase tracking-widest mb-4">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed font-light">
            {text}
        </p>
    </motion.div>
);