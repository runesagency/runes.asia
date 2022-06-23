import type { ElementType, Ref } from "react";

import { forwardRef } from "react";

interface CoreProps<T> {
    as?: T | JSX.IntrinsicElements["a"];
    light?: boolean;
}

// eslint-disable-next-line no-unused-vars
const Button = <T extends keyof JSX.IntrinsicElements>({ className, light, ...props }: CoreProps<T> & JSX.IntrinsicElements[T], ref: Ref<any>): JSX.Element => {
    const Component = (props.as || "a") as ElementType;

    return (
        <Component
            className={
                `font-poppins font-semibold w-max px-8 py-5 cursor-pointer hover:opacity-75 duration-200 rounded-2xl ${className} ` + //
                (light ? "bg-white text-black" : "bg-black text-white")
            }
            {...props}
        />
    );
};

export default forwardRef(Button);
