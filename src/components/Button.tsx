import type { ElementType, Ref } from "react";

import { forwardRef } from "react";

interface CoreProps<T> {
    as?: T | JSX.IntrinsicElements["a"];
}

// eslint-disable-next-line no-unused-vars
const Button = <T extends keyof JSX.IntrinsicElements>({ className, ...props }: CoreProps<T> & JSX.IntrinsicElements[T], ref: Ref<any>): JSX.Element => {
    const Component = (props.as || "a") as ElementType;

    return <Component className={`from-yellow-light to-yellow-medium bg-gradient-to-r paragraph w-max font-bold px-5 py-3 hover:opacity-75 duration-200 ${className}`} {...props} />;
};

export default forwardRef(Button);
