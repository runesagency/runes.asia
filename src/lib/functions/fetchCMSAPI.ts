import type { Convert, RecursiveObject } from "@/lib/types";
import { getNestedKeyRecursively } from "@/lib/functions";

export type fetchCMSAPIFields = RecursiveObject<true | "*">;

export type fetchCMSAPIOptions<T> = {
    // eslint-disable-next-line no-unused-vars
    errorCallback?: (error: Error) => void;
    defaultValue?: any;
    fields?: T;
    filter?: RecursiveObject<any>;
    headers?: [string, string][] | { [key: string]: string };
    search?: string;
    sort?: string[];
    deps?: any[];
} & (
    | {
          limit: number;
          page: number;
      }
    | {
          skip: number; // offset
          limit?: number;
      }
);

export const fetchCMSAPI = async <T extends fetchCMSAPIFields | [fetchCMSAPIFields]>(path: `/${string}`, options: fetchCMSAPIOptions<T>) => {
    type Fields = T extends [fetchCMSAPIFields] ? [Convert<any, T[0]>] : Convert<any, T>;
    let data: Fields = options.defaultValue || null;

    // Use absolute real url (example: https://runes.asia) in browser mode
    // Use localhost url (example: http://localhost:3000) in node mode
    let url = "";

    if (typeof window !== "undefined") {
        url = `${window.location.protocol}//${window.location.host}/api/cms`;
    } else {
        url = process.env.CMS_API_URL;
    }

    const parsedUrl = new URL(url + path);

    if (options.fields) {
        const rawFields = Array.isArray(options.fields) ? options.fields[0] : options.fields;
        let fields = getNestedKeyRecursively(rawFields).join(",");
        parsedUrl.searchParams.set("fields", fields);
    }

    if (options.filter) {
        parsedUrl.searchParams.set("filter", JSON.stringify(options.filter));
    }

    if (options.sort) {
        parsedUrl.searchParams.set("sort", options.sort.join(","));
    }

    (options as any).offset = (options as any).skip;

    for (let key of ["search", "offset", "page", "limit"]) {
        if (options[key]) {
            parsedUrl.searchParams.set(key, String(options[key]));
        }
    }

    try {
        const rawResponse = await fetch(parsedUrl.href, {
            method: "GET",
            headers: options.headers || {},
        });

        const response = await rawResponse.json();

        data = response.data;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }

        if (options.errorCallback) {
            options.errorCallback(error);
        } else {
            throw new Error("Something went wrong, please contact web admin and try again later.");
        }
    }

    return data;
};
