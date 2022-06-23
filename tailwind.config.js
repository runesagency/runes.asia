module.exports = {
    mode: "jit",
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false,
    theme: {
        corePlugins: {
            container: false,
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#FFFFFF",
            black: "#272727",
            lime: "#D2D8B3",
            navy: "#90A9B7",
            pink: "#E5989B",
            purple: "#B5838D",
            yellow: {
                light: "#EFD09E",
                dark: "#D4AA7D",
            },
        },
        fontFamily: {
            vidaloka: ["Vidaloka", "serif"],
            poppins: ["Poppins", "sans-serif"],
        },
        extend: {
            screens: {
                "3xl": "1920px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        ({ addComponents }) => {
            addComponents({
                ".container": {},
                ".paragraph": {},
            });
        },
    ],
};
