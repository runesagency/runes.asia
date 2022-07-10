import type { RecursiveObject, Convert } from "@/lib/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNestedKeyRecursively } from "@/lib/functions";

type useCMSAPIFields = RecursiveObject<true | "*">;

type useCMSAPIOptions<T> = {
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

export const useCMSAPI = <T extends useCMSAPIFields | [useCMSAPIFields]>(path: `/${string}`, options: useCMSAPIOptions<T>) => {
    type Fields = T extends [useCMSAPIFields] ? [Convert<any, T[0]>] : Convert<any, T>;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Fields>(options?.defaultValue || null);
    const router = useRouter();

    const headers = options.headers || {};

    useEffect(() => {
        if (options.deps && options.deps.every((dep) => !dep)) return;

        const protocol = window.location.protocol;
        const domain = window.location.hostname;
        const port = window.location.port;

        const parsedUrl = new URL(`${protocol}//${domain}:${port ? port : ""}/api/cms${path}`);

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

        fetch(parsedUrl.href, {
            method: "GET",
            headers,
        })
            .then((response) => response.json())
            .then((response) => {
                setLoading(false);
                setData(response.data);
            })
            .catch((error) => {
                if (process.env.NODE_ENV === "development") {
                    console.error(error);
                }

                if (options.errorCallback) {
                    options.errorCallback(error);
                } else {
                    alert("Something went wrong, please contact web admin and try again later.");
                    router.push("/");
                }

                setLoading(false);
            });

        return () => {
            setLoading(true);
            setData(options?.defaultValue || null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, options.deps || []);

    return {
        data,
        loading,
    };
};