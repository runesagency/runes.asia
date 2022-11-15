module.exports = {
    apps: [
        {
            name: "runes.asia",
            script: "git pull && pnpm install && pnpm build && pnpm start",
        },
    ],
};
