/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import type { ElementType } from "react";

import Link from "next/link";
import * as Icon from "@/components/Utils/Icons";

import { forwardRef } from "react";

type Button = JSX.IntrinsicElements["a" | "button"] & {
    light?: boolean;
    as?: "a" | "button";
};

export const Primary = forwardRef(({ className, light, ...props }: Button, ref: any) => {
    const Component = (props.as || "a") as ElementType;

    return (
        <Component
            className={
                `font-poppins font-semibold w-max px-8 py-5 cursor-pointer hover:opacity-75 duration-200 rounded-2xl text-center h-max ${className} ` + //
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

export const Back = forwardRef(({ className, light, text, href }: Button & { text: string; href: `/${string}` }, ref: any) => {
    return (
        <Link href={href}>
            <a
                className={
                    `flex items-center gap-4 no-underline hover:underline hover:opacity-70 cursor-pointer w-max ${className}` + //
                    (light ? " text-white" : " text-black")
                }
            >
                <Icon.ChevronLeft className="stroke-current h-4 fill-transparent" />
                <p className="font-poppins">{text}</p>
            </a>
        </Link>
    );
});
