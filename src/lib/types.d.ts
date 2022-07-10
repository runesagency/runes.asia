export type Convert<V, O extends object> = Partial<{
    [K in keyof O]: O[K] extends object ? Convert<V, O[K]> : V;
}>;

export type RecursiveObject<T> = {
    [key: string]: T | RecursiveObject<T> | [RecursiveObject<T>];
};
