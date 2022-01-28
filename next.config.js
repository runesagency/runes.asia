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
                    destination: "/",
                    permanent: false,
                },
                {
                    source: "/services",
                    destination: "/",
                    permanent: false,
                },
                {
                    source: "/projects",
                    destination: "https://www.behance.net/wearerunes",
                    permanent: false,
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
