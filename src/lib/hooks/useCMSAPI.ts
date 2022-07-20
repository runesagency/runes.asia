import type { Convert } from "@/lib/types";
import type { fetchCMSAPIFields, fetchCMSAPIOptions } from "@/lib/functions/fetchCMSAPI";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchCMSAPI } from "@/lib/functions";

export const useCMSAPI = <T extends fetchCMSAPIFields | [fetchCMSAPIFields]>(path: `/${string}`, options: fetchCMSAPIOptions<T>) => {
    type Fields = T extends [fetchCMSAPIFields] ? [Convert<any, T[0]>] : Convert<any, T>;

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
            .catch((error: Error) => {
                alert(error.message);
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
