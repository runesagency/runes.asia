import type { FormEvent, ReactNode } from "react";

import Footer from "@/components/Sections/Footer";
import Navigation from "@/components/Sections/Navigation";
import Input from "@/components/Forms/Input";
import * as Button from "@/components/Forms/Buttons";

import { useRouter } from "next/router";
import { useState } from "react";
import { useCaptcha, useLanguage } from "@/lib/hooks";
import * as localization from "@/lib/localization/pages/contact";
import LangChooser from "@/components/Utils/LangChooser";

const FormSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <div className="grid gap-7 w-full">
        <h3 className="text-3xl">{title}</h3>
        {children}
    </div>
);

export default function ContactPage() {
    const router = useRouter();
    let initialData = {
        selections: [],
        details: "",
    };

    if (router.isReady && router.query.category && router.query.package) {
        const category = router.query.category as string;
        const packageName = router.query.package as string;

        initialData.selections.push("pricing");
        initialData.details = `Hi there, I'm interested in ${packageName} package under ${category} category.`;
    }

    const { locale } = useLanguage("lang", localization);

    const [selections, setSelections] = useState<string[]>(initialData.selections);
    const [contactPlatform, setContactPlatform] = useState<string>("");
    const [budget, setBudget] = useState<string>("");

    const { refresh: refreshCaptcha, value: captchaValue, elementRef: captchaRef } = useCaptcha();

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selections.length === 0) {
            return alert(locale.form.handlers.noSelections);
        }

        if (contactPlatform === "") {
            return alert(locale.form.handlers.noContactPlatform);
        }

        if (budget === "") {
            return alert(locale.form.handlers.noBudget);
        }

        const formData = new FormData((e as any).target);

        const formDataJson: Record<string, any> = {
            selections,
            budget,
            contact_platform: contactPlatform,
        };

        for (const [key, value] of formData.entries()) {
            formDataJson[key] = value;
        }

        if (formDataJson.captcha !== captchaValue) {
            return alert(locale.form.handlers.captchaError);
        }

        fetch(`/api/cms/items/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataJson),
        }).then(async (res) => {
            refreshCaptcha();

            if (res.status === 200) {
                (e.target as any).reset();

                return alert(locale.form.handlers.success);
            }

            return alert(locale.form.handlers.error);
        });
    };

    return (
        <main className="relative bg-white overflow-auto">
            {/* Header */}
            <section id="header" className="relative py-20">
                <div className="container grid gap-28">
                    <Navigation />

                    <div className="grid gap-8 text-black mx-auto text-center max-w-2xl">
                        <LangChooser />
                        <h1 className="title">{locale.header.title}</h1>
                        <h2 className="subtitle">{locale.header.subtitle}</h2>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="py-20">
                <form className="container grid gap-10 font-poppins text-black lg:max-w-4xl" onSubmit={formHandler.bind(this)}>
                    <FormSection title={locale.form.name.title}>
                        <Input name="name" placeholder={locale.form.name.placeholder} required />
                    </FormSection>

                    <FormSection title={locale.form.companyName.title}>
                        <Input name="company_name" placeholder={locale.form.companyName.placeholder} />
                    </FormSection>

                    <FormSection title={locale.form.selections.title}>
                        <div className="flex flex-wrap items-center gap-3">
                            {locale.form.selections.data.map((category, index) => (
                                <Button.Secondary
                                    as="button"
                                    key={index}
                                    onClick={() => {
                                        if (!selections.includes(category.value)) {
                                            setSelections((prev) => [...prev, category.value]);
                                        } else {
                                            setSelections(selections.filter((c) => c !== category.value));
                                        }
                                    }}
                                    active={selections.includes(category.value)}
                                >
                                    {category.text}
                                </Button.Secondary>
                            ))}
                        </div>
                    </FormSection>

                    <FormSection title={locale.form.email.title}>
                        <Input name="email" placeholder={locale.form.email.placeholder} required />
                    </FormSection>

                    <FormSection title={locale.form.contact.title}>
                        <div className="flex flex-wrap items-center gap-3">
                            {locale.form.contact.data.map((socMed, index) => (
                                <Button.Secondary
                                    as="button"
                                    key={index} //
                                    onClick={() => setContactPlatform(socMed.value)}
                                    active={contactPlatform.includes(socMed.value)}
                                >
                                    {socMed.text}
                                </Button.Secondary>
                            ))}
                        </div>

                        <Input name="contact_info" placeholder={locale.form.contact.placeholder} required />
                    </FormSection>

                    <FormSection title={locale.form.details.title}>
                        <textarea
                            name="details"
                            rows={10}
                            className="p-5 w-full outline-none font-poppins text-black border border-black border-opacity-20"
                            placeholder={locale.form.details.placeholder}
                            defaultValue={initialData.details}
                            required
                        />
                    </FormSection>

                    <FormSection title={locale.form.budgets.title}>
                        <div className="flex flex-wrap items-center gap-3">
                            {locale.form.budgets.data.map((b, index) => (
                                <Button.Secondary
                                    as="button"
                                    key={index} //
                                    onClick={() => setBudget(b.value)}
                                    active={budget.includes(b.value)}
                                >
                                    {b.text}
                                </Button.Secondary>
                            ))}
                        </div>
                    </FormSection>

                    <FormSection title={locale.form.captcha.title}>
                        <canvas ref={captchaRef} height={70} width={300} />
                        <span
                            className="underline hover:opacity-70 cursor-pointer duration-200 w-max" //
                            onClick={refreshCaptcha}
                        >
                            {locale.form.captcha.refreshButton}
                        </span>
                        <Input name="captcha" placeholder={locale.form.captcha.placeholder} required />
                    </FormSection>

                    <Button.Primary as="button" className="w-full" type="submit">
                        {locale.form.submit}
                    </Button.Primary>
                </form>
            </section>

            <Footer />
        </main>
    );
}
