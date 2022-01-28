import { useEffect, useState } from "react";
import Flag from "@/components/Icons/Flag";

const LangChooser = () => {
    const languages = [
        {
            code: "en",
            name: "English",
        },
        {
            code: "id",
            name: "Indonesia",
        },
    ];

    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState(null);

    const changeLang = (lang: string) => {
        setLang(lang);
        setOpen(false);
    };

    useEffect(() => {
        const lang = localStorage.getItem("lang") || "en";
        setLang(lang);
    }, []);

    useEffect(() => {
        if (lang) {
            localStorage.setItem("lang", lang);
            document.dispatchEvent(new Event("languageChanged"));
        }
    });

    return (
        <div className="relative h-full">
            <button className="flex justify-center items-center space-x-4" onClick={() => setOpen(!open)}>
                <svg className="fill-current" width="13" height="7" viewBox="0 0 13 7">
                    <path d="M1.67267 0.26006C1.26402 -0.111447 0.631567 -0.0813304 0.26006 0.327327C-0.111447 0.735985 -0.0813304 1.36843 0.327327 1.73994L1.67267 0.26006ZM6.5 6L5.82733 6.73994C6.20875 7.08669 6.79125 7.08669 7.17267 6.73994L6.5 6ZM12.6727 1.73994C13.0813 1.36843 13.1114 0.735985 12.7399 0.327327C12.3684 -0.0813304 11.736 -0.111447 11.3273 0.26006L12.6727 1.73994ZM0.327327 1.73994L5.82733 6.73994L7.17267 5.26006L1.67267 0.26006L0.327327 1.73994ZM7.17267 6.73994L12.6727 1.73994L11.3273 0.26006L5.82733 5.26006L7.17267 6.73994Z" />
                </svg>

                <Flag flag={lang} />
            </button>

            {open && (
                <div className="grid gap-2 absolute right-0 -bottom-2 transform translate-y-full bg-yellow-light shadow-sm text-black p-4 rounded-sm">
                    {languages.map((language, index) => (
                        <button
                            key={index}
                            className={`flex justify-start items-center space-x-4 w-full p-2 rounded-sm duration-200 ${
                                lang === language.code ? "bg-black text-yellow-light" : "hover:bg-black hover:bg-opacity-70 hover:text-yellow-light"
                            }`}
                            onClick={() => changeLang(language.code)}>
                            <Flag flag={language.code} />
                            <p className="paragraph">{language.name}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LangChooser;
