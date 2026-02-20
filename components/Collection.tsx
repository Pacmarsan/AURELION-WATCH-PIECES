import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1]
        }
    }
};

export const Collection: React.FC = () => {
    return (
        <section id="collection" className="bg-background-dark py-24 px-6 md:px-20 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary text-xs tracking-widest uppercase block mb-3 font-medium">The Collection</span>
                        <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">Timeless Engineering</h3>
                    </motion.div>

                    <motion.a
                        href="#"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-[10px] md:text-xs uppercase tracking-widest border-b border-primary/30 pb-1 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300"
                    >
                        View All Timepieces
                    </motion.a>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
                >
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            className={`group cursor-pointer`}
                        >
                            <div className="bg-[#1a1a1c] aspect-[4/5] relative overflow-hidden rounded-sm mb-6 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60 z-10 duration-500 group-hover:opacity-40"></div>

                                <img
                                    src={product.image}
                                    alt={product.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 ease-out"
                                />

                                <div className="absolute bottom-6 left-6 z-20 transform transition-transform duration-500 group-hover:translate-y-[-5px]">
                                    <span className="text-white font-serif text-xl md:text-2xl italic block mb-2">{product.name}</span>
                                    <p className="text-gray-400 text-xs tracking-wide">{product.price}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};