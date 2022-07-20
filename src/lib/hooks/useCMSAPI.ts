import type { RecursiveObject, Convert } from "@/lib/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchCMSAPI } from "@/lib/functions";

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

    useEffect(() => {
        if (options.deps && options.deps.every((dep) => !dep)) return;

        fetchCMSAPI(path, options)
            .then((response) => {
                setData(response);
                setLoading(false);
            })
            .catch((error) => {
                alert(error);
                router.push("/");
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
