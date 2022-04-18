const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const config = (phase) => {
    let plugins = [];
    let settings = {
        reactStrictMode: true,
        redirects: async () => {
            return [
                {
                    source: "/projects",
                    destination: "https://www.behance.net/wearerunes",
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
