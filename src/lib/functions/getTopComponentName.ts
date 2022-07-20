export const getTopComponentName = () => {
    const stack = new Error().stack;
    const lines = stack?.split("\n");
    const line = lines?.[3];
    const match = line?.match(/at (.*) \(/);
    const name = match?.[1];
    return name || "";
};
