/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#f2b90d",
                "background-light": "#f8f8f5",
                "background-dark": "#0E0E0F",
                "design-dark": "#181611",
                void: "#0E0E0F",
                "metal-light": "#e0e0e0",
                "metal-dark": "#393528",
                "off-white": "#F5F5F3",
                "platinum": "#E5E4E2",
                "charcoal": "#221e10",
                "surface-dark": "#221e10",
            },
            fontFamily: {
                display: ["Manrope", "sans-serif"],
                serif: ["Playfair Display", "serif"],
                "serif-craft": ["Cormorant Garamond", "serif"],
            },
            backgroundImage: {
                'void-gradient': 'radial-gradient(circle at center, #232326 0%, #0E0E0F 60%)',
                'radial-glow': 'radial-gradient(circle at center, rgba(242, 185, 13, 0.08) 0%, rgba(24, 22, 17, 0) 70%)',
                'metallic-text': 'linear-gradient(to bottom right, #ffffff 20%, #bab29c 50%, #888274 80%)',
                'metallic-gradient': 'linear-gradient(90deg, transparent 0%, rgba(242, 185, 13, 0.3) 50%, transparent 100%)',
            },
            letterSpacing: {
                'widest-xl': '0.3em',
            }
        },
    },
    plugins: [],
}
