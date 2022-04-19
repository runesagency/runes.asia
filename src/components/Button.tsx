import type { AllHTMLAttributes } from "react";

export default function Button({ className, ...props }: AllHTMLAttributes<HTMLAnchorElement>) {
    return <a className={`from-yellow-light to-yellow-medium bg-gradient-to-r paragraph w-max font-bold px-5 py-3 hover:opacity-75 duration-200 ${className}`} {...props}></a>;
}
