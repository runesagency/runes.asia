import * as Icon from "@/components/Images/Icons";

import { HTMLAttributes, useState } from "react";
import { useLanguage } from "@/lib/hooks";

type LangChooserProps = {
    tooltipAlign?: "right" | "left";
    hideNameOnMobile?: boolean;
};

const languages = {
    en: {
        name: "English",
        flag: Icon.FlagEN,
    },
    id: {
        name: "Indonesia",
        flag: Icon.FlagID,
    },
};

const LangChooser = ({ className, tooltipAlign, hideNameOnMobile, ...props }: HTMLAttributes<HTMLDivElement> & LangChooserProps) => {
    const [open, setOpen] = useState(false);
    const { lang, setLang } = useLanguage(
        "lang",
        Object.keys(languages).reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );

    const FlagIcon = languages[lang].flag || null;

    const changeLang = (code: string) => {
        setLang(code);
        setOpen(false);
    };

    return (
        <div className={`relative h-full font-poppins ${className}`} {...props}>
            <button className="flex justify-center items-center gap-4 mx-auto" onClick={() => setOpen(!open)}>
                <FlagIcon className="flex-shrink-0 h-5" />

                <p className={`paragraph text-left ${hideNameOnMobile && "hidden md:block"}`}>{languages[lang].name}</p>

                <svg className="fill-current" width="13" height="7" viewBox="0 0 13 7">
                    <path d="M1.67267 0.26006C1.26402 -0.111447 0.631567 -0.0813304 0.26006 0.327327C-0.111447 0.735985 -0.0813304 1.36843 0.327327 1.73994L1.67267 0.26006ZM6.5 6L5.82733 6.73994C6.20875 7.08669 6.79125 7.08669 7.17267 6.73994L6.5 6ZM12.6727 1.73994C13.0813 1.36843 13.1114 0.735985 12.7399 0.327327C12.3684 -0.0813304 11.736 -0.111447 11.3273 0.26006L12.6727 1.73994ZM0.327327 1.73994L5.82733 6.73994L7.17267 5.26006L1.67267 0.26006L0.327327 1.73994ZM7.17267 6.73994L12.6727 1.73994L11.3273 0.26006L5.82733 5.26006L7.17267 6.73994Z" />
                </svg>
            </button>

            <div
                className={
                    `grid gap-2 absolute -bottom-2 transform translate-y-full w-max shadow-sm rounded-sm overflow-clip duration-700 px-4 bg-yellow-light text-black` +
                    (tooltipAlign ? (tooltipAlign === "right" ? " right-0" : " left-0") : " right-0") +
                    (open ? " h-auto py-4" : " h-0")
                }
            >
                {Object.entries(languages).map(([code, language], index) => (
                    <button
                        key={index}
                        className={`flex justify-start items-center gap-4 w-full p-2 rounded-sm duration-200 ${
                            lang === code ? "bg-black text-yellow-light" : "hover:bg-black hover:bg-opacity-70 hover:text-yellow-light"
                        }`}
                        onClick={() => changeLang(code)}
                    >
                        <language.flag className="flex-shrink-0 h-5" />
                        <p className="paragraph text-left">{language.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LangChooser;
