export const encodeToURL = (str: string): string => {
    return encodeURIComponent(str.replace(/[^a-zA-Z0-9\s]/g, ""))
        .replace(/%20/g, "-")
        .toLowerCase();
};
