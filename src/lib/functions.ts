import type { RecursiveObject } from "@/lib/types";

export const getNestedKeyRecursively = (object: RecursiveObject<any>, lastKey: string[] = []) => {
    let result: string[] = [];

    for (const key of Object.keys(object)) {
        if (typeof object[key] !== "object") {
            if (typeof object[key] === "string") {
                result.push([...lastKey, key, object[key]].join("."));
            } else {
                result.push([...lastKey, key].join("."));
            }
        } else {
            let nestedObject = Array.isArray(object[key]) ? object[key][0] : object[key];
            let nested: string[] = getNestedKeyRecursively(nestedObject, [...lastKey, key]);
            result = result.concat(nested);
        }
    }

    return result;
};

export const getTopComponentName = () => {
    const stack = new Error().stack;
    const lines = stack.split("\n");
    const line = lines[3];
    const match = line.match(/at (.*) \(/);
    const name = match[1];
    return name;
};

export const ucWords = (str: string) => {
    return str.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
};
