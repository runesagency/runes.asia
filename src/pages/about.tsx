import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";

export default function AboutPage() {
    return (
        <main className="relative z-0 overflow-hidden bg-black min-h-screen h-full w-full flex flex-col">
            {/* Header */}
            <header className="container">
                <Navigation />
            </header>

            <section className="from-yellow-light to-yellow-medium bg-gradient-to-b py-24">
                <Heading
                    title="Coming Soon"
                    description="Something great are likely to takes some times right?"
                    className={{
                        title: "!text-black",
                        description: "!text-black",
                    }}
                />
            </section>

            {/* Footer */}
            <section className="relative py-24 container">
                <Footer />
            </section>
        </main>
    );
}
