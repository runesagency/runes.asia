module.exports = {
    mode: "jit",
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        corePlugins: {
            container: false,
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#FFFFFF",
            black: "#272727",
            gray: "#D9D9D9",
            green: "#D2D8B3",
            pink: "#E5989B",
            purple: "#B5838D",
            yellow: {
                light: "#EFD09E",
                dark: "#B58266",
            },
            blue: {
                light: "#B3C6D8",
                dark: "#839DB5",
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
            fontSize: {
                "4.5xl": "2.5rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/line-clamp"), //
        require("@tailwindcss/typography"),
    ],
};
