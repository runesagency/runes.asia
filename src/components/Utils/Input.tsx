import * as Icon from "@/components/Images/Icons";

export default function Input({ className, icon, ...props }: JSX.IntrinsicElements["input"] & { icon: keyof typeof Icon }) {
    const InputIcon = Icon[icon];

    return (
        <div className="w-full bg-white flex gap-6 items-center text-black border border-black border-opacity-20 pl-5">
            <InputIcon className="fill-current h-5" />
            <input className={`py-4 w-full outline-none font-poppins ${className}`} {...props} />
        </div>
    );
}
