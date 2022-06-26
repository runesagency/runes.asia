/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { forwardRef } from "react";

export const Primary = forwardRef(({ className, light, ...props }: JSX.IntrinsicElements["a"] & { light?: boolean }, ref: any) => (
    <a
        className={
            `font-poppins font-semibold w-max px-8 py-5 cursor-pointer hover:opacity-75 duration-200 rounded-2xl ${className} ` + //
            (light ? "bg-white text-black" : "bg-black text-white")
        }
        {...props}
    />
));

export const Secondary = forwardRef(({ className, light, active, ...props }: JSX.IntrinsicElements["a"] & { light?: boolean; active?: boolean }, ref: any) => (
    <a
        className={
            `font-poppins w-max px-5 py-3 cursor-pointer hover:opacity-75 duration-200 rounded-full border-opacity-40 border ${className}` + //
            (active ? (light ? " bg-white text-black" : " bg-black text-white") : light ? " border-white text-white" : " border-black text-black")
        }
        {...props}
    />
));
