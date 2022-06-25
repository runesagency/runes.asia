export const Primary = ({ className, light, ...props }: JSX.IntrinsicElements["button"] & { light?: boolean }) => (
    <button
        className={
            `font-poppins font-semibold w-max px-8 py-5 cursor-pointer hover:opacity-75 duration-200 rounded-2xl ${className} ` + //
            (light ? "bg-white text-black" : "bg-black text-white")
        }
        {...props}
    />
);

// eslint-disable-next-line no-unused-vars
export const Secondary = ({ className, light, active, ...props }: JSX.IntrinsicElements["button"] & { light?: boolean; active?: boolean }) => (
    <button
        className={
            `font-poppins w-max px-5 py-3 cursor-pointer hover:opacity-75 duration-200 rounded-full border-opacity-40 border ${className}` + //
            (active ? (light ? " bg-white text-black" : " bg-black text-white") : light ? " border-white text-white" : " border-black text-black")
        }
        {...props}
    />
);
