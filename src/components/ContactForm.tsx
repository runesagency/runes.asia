import * as Icon from "@/components/Icons";
import { FormEvent } from "react";

export default function ContactForm() {
    const formHandler = (e: FormEvent) => {
        e.preventDefault();

        const data = Array.from((e.target as any).elements)
            .filter((el: Record<string, any>) => el.name)
            .reduce(
                (a: Record<string, any>, b: Record<string, any>) => ({
                    ...a,
                    [b.name]: b.value,
                }),
                {}
            );

        let message = "";

        for (let [key, value] of Object.entries(data)) {
            key = key
                .split("_")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            message += `${key}: ${value}\n`;
        }

        alert(message);
    };

    return (
        <form onSubmit={formHandler} className="grid gap-11 font-lora fill-current text-black">
            <div className="flex justify-start items-start space-x-7">
                <Icon.Pen className="w-10" />
                <input //
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="form-input pb-4"
                    required
                />
            </div>

            <div className="flex justify-start items-start space-x-7">
                <Icon.Mail className="w-10" />
                <input //
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="form-input pb-4"
                    required
                />
            </div>

            <div className="flex justify-start items-start space-x-7">
                <Icon.Message className="w-10" />
                <textarea //
                    name="message"
                    placeholder="Message"
                    className="form-input pb-16"
                    required
                />
            </div>

            <button className="w-full py-3 bg-black font-bold text-yellow-light hover:border-4 hover:bg-transparent duration-200 border-black hover:text-black">Send Message</button>
        </form>
    );
}
