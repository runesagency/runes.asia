import * as Icon from "@/components/Utils/Icons";

export default function Input({ className, icon, ...props }: JSX.IntrinsicElements["input"] & { icon?: keyof typeof Icon }) {
    const InputIcon = icon ? Icon[icon] : null;

    return (
        <div className="w-full bg-white flex gap-6 items-center text-black border border-gray pl-5">
            {icon && <InputIcon className="fill-current h-5" />}
            <input className={`py-4 w-full outline-none font-poppins ${className}`} {...props} />
        </div>
    );
}
