const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

const config = (phase) => {
    let plugins = [];
    let settings = {
        reactStrictMode: true,
        webpack: (config) => {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@": path.join(__dirname, "src"),
                "@public": path.join(__dirname, "public"),
            };

            return config;
        },
        redirects: async () => {
            return [
                {
                    source: "/about",
                    destination: "/#about",
                    permanent: false,
                },
                {
                    source: "/services",
                    destination: "https://drive.google.com/file/d/1-ejY8kA-wcAwFcBYLLkjSCt-obNYOI5l/view?usp=sharing",
                    permanent: true,
                },
                {
                    source: "/projects",
                    destination: "https://www.behance.net/wearerunes",
                    permanent: true,
                },
                {
                    source: "/contact",
                    destination: "mailto:hello@runes.asia",
                    permanent: false,
                },
            ];
        },
    };

    if (phase !== PHASE_DEVELOPMENT_SERVER) {
        // do something in production mode
    }

    return {
        plugins,
        settings,
    };
};

const pipe = (funcs) => (value) => funcs.reduce((v, f) => f(v), value);
module.exports = (phase, { defaultConfig }) => {
    const cfg = config(phase, { defaultConfig });
    return pipe(cfg.plugins)(cfg.settings);
};
