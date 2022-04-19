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
                {
                    source: "/compare-this-site",
                    destination:
                        "https://www.figma.com/proto/cVLMJM9o2GTFKXseKpIwoJ/UI%2FUX?page-id=13%3A125&node-id=13%3A126&viewport=290%2C48%2C0.48&scaling=min-zoom&starting-point-node-id=13%3A126",
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
