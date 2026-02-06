import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    return (
        <div className="flex flex-col bg-background-dark min-h-screen font-display text-white selection:bg-primary/30 selection:text-white relative overflow-hidden">
            
            <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[500px] relative z-10 flex flex-col gap-20"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-3xl md:text-4xl font-serif italic tracking-widest text-white/90"
                        >
                            Private Inquiries Only
                        </motion.h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="w-8 h-[1px] bg-primary/40 mx-auto"
                        ></motion.div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-white/40 text-[11px] uppercase tracking-[0.2em] max-w-xs mx-auto leading-loose"
                        >
                            A dedicated concierge will attend to your request within twenty-four hours.
                        </motion.p>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="group relative"
                        >
                            <input 
                                autoComplete="off" 
                                className="peer w-full bg-transparent border-b border-white/10 text-white font-light py-4 placeholder-transparent focus:border-primary/60 focus:outline-none focus:ring-0 transition-colors duration-500" 
                                id="name" 
                                name="name" 
                                placeholder="Full Name" 
                                required 
                                type="text"
                            />
                            <label 
                                className="absolute left-0 -top-4 text-[10px] tracking-widest-xl uppercase text-primary/80 transition-all 
                                peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-4 peer-placeholder-shown:tracking-widest 
                                peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary/80 cursor-text pointer-events-none" 
                                htmlFor="name"
                            >
                                Full Name
                            </label>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="group relative"
                        >
                            <input 
                                autoComplete="off" 
                                className="peer w-full bg-transparent border-b border-white/10 text-white font-light py-4 placeholder-transparent focus:border-primary/60 focus:outline-none focus:ring-0 transition-colors duration-500" 
                                id="email" 
                                name="email" 
                                placeholder="Email Address" 
                                required 
                                type="email"
                            />
                            <label 
                                className="absolute left-0 -top-4 text-[10px] tracking-widest-xl uppercase text-primary/80 transition-all 
                                peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-4 peer-placeholder-shown:tracking-widest 
                                peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary/80 cursor-text pointer-events-none" 
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="group relative"
                        >
                            <textarea 
                                ref={textareaRef}
                                className="peer w-full bg-transparent border-b border-white/10 text-white font-light py-4 placeholder-transparent focus:border-primary/60 focus:outline-none focus:ring-0 transition-colors duration-500 min-h-[50px] resize-none overflow-hidden" 
                                id="message" 
                                name="message" 
                                placeholder="Message" 
                                required 
                                rows={1}
                                onInput={handleInput}
                            ></textarea>
                            <label 
                                className="absolute left-0 -top-4 text-[10px] tracking-widest-xl uppercase text-primary/80 transition-all 
                                peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-4 peer-placeholder-shown:tracking-widest 
                                peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary/80 cursor-text pointer-events-none" 
                                htmlFor="message"
                            >
                                Message
                            </label>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="pt-8"
                        >
                            <button className="group relative w-full overflow-hidden border border-white/20 py-5 text-[11px] font-medium tracking-[0.3em] uppercase text-white/90 hover:border-white/60 hover:text-white focus:outline-none transition-all duration-500">
                                <span className="relative z-10">Send Inquiry</span>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </button>
                        </motion.div>
                    </form>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="text-[9px] text-white/20 uppercase tracking-[0.4em]">
                            Secure Digital Encryption Active
                        </p>
                    </motion.div>
                </motion.div>
            </main>

            {/* Fixed Location Text */}
            <div className="fixed bottom-10 right-10 hidden md:block z-50 pointer-events-none opacity-20">
                <p className="text-[9px] font-display text-white rotate-90 origin-bottom-right tracking-widest uppercase">
                    London — Geneva — Tokyo
                </p>
            </div>
        </div>
    );
};