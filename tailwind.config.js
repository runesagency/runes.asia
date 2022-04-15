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
            black: "#292525",
            yellow: {
                light: "#FFC977",
                medium: "#C09645",
                dark: "#695D45",
            },
        },
        fontFamily: {
            "el-messiri": ["El Messiri", "sans-serif"],
            lora: ["Lora", "serif"],
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
