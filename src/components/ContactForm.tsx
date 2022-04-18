import type { FormEvent } from "react";

import * as Icon from "@/components/Icons";

import { useState } from "react";
import { useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/components/contactForm";

export default function ContactForm() {
    const [isSending, setIsSending] = useState(false);
    const { locale } = useLanguage("lang", localization);

    const inputs = [
        {
            icon: Icon.Pen,
            dom: "input",
            type: "text",
            name: "name",
            required: true,
        },
        {
            icon: Icon.Mail,
            dom: "input",
            type: "email",
            name: "email",
            required: true,
        },
        {
            icon: Icon.Message,
            dom: "textarea",
            name: "message",
            required: true,
        },
    ];

    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        const data: Record<string, string> = Array.from((e.target as any).elements)
            .filter((el: Record<string, any>) => el.name)
            .reduce(
                (a: Record<string, any>, b: Record<string, any>) => ({
                    ...a,
                    [b.name]: b.value,
                }),
                {}
            ) as any;

        let message = "";

        for (let [key, value] of Object.entries(data)) {
            key = key
                .split("_")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            message += `${key}: ${value}\n`;
        }

        try {
            const result = await fetch("/api/send-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                    name: data.name,
                }),
            });

            if (result.status === 200) {
                alert("Message sent, thank you!");
            } else {
                alert("Something went wrong! Please try again later.");
            }
        } catch (error) {
            alert("Error sending message! Please try again later.");
        }

        setIsSending(false);
    };

    if (isSending) {
        return (
            <svg className="w-40 fill-black animate-spin m-auto" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5" />
                <path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z" />
            </svg>
        );
    } else {
        return (
            <form onSubmit={formHandler} className="grid gap-11 font-lora fill-current text-black">
                {inputs.map((input, index) => (
                    <div key={index} className="flex justify-start items-start space-x-7">
                        <input.icon className="w-8 md:w-10" />

                        {input.dom === "input" ? (
                            <input //
                                type={input.type}
                                name={input.name}
                                placeholder={locale.inputs[index]}
                                required={input.required}
                                className="form-input pb-4"
                            />
                        ) : //
                        input.dom === "textarea" ? (
                            <textarea //
                                name={input.name}
                                placeholder={locale.inputs[index]}
                                required={input.required}
                                className="form-input pb-16"
                            />
                        ) : //
                        null}
                    </div>
                ))}

                <button className="w-full py-3 bg-black font-bold text-yellow-light hover:border-4 hover:bg-transparent duration-200 border-black hover:text-black">{locale.button}</button>
            </form>
        );
    }
}
