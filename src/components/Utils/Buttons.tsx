/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { ElementType, forwardRef } from "react";

type Button = JSX.IntrinsicElements["a" | "button"] & {
    light?: boolean;
    as?: "a" | "button";
};

export const Primary = forwardRef(({ className, light, ...props }: Button, ref: any) => {
    const Component = (props.as || "a") as ElementType;

    return (
        <Component
            className={
                `font-poppins font-semibold w-max px-8 py-5 cursor-pointer hover:opacity-75 duration-200 rounded-2xl text-center ${className} ` + //
                (light ? "bg-white text-black" : "bg-black text-white")
            }
            {...props}
        />
    );
});

export const Secondary = forwardRef(({ className, light, active, ...props }: Button & { active?: boolean }, ref: any) => {
    const Component = (props.as || "a") as ElementType;

    return (
        <Component
            className={
                `font-poppins w-max px-5 py-3 cursor-pointer hover:opacity-75 duration-200 rounded-full border-opacity-40 border text-center ${className}` + //
                (active ? (light ? " bg-white text-black" : " bg-black text-white") : light ? " border-white text-white" : " border-black text-black")
            }
            {...props}
        />
    );
});
