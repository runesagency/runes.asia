type Translations = {
    [key: string]: {
        home: {
            intro: {
                title: string;
            };
            about: {
                title: string;
                description: string;
                location: string;
                button: string;
            };
            services: {
                title: string;
                description: string;
                button: string;
            };
            clients: {
                title: string;
                description: string;
                button: string;
            };
            contact: {
                title: string;
                description: string;
                button: string;
            };
        };
    };
};

const translations: Translations = {
    en: {
        home: {
            intro: {
                title: "Let's Explore Our Galaxy",
            },
            about: {
                title: "Who Are We?",
                description:
                    "We are a group of people gathered in a creative space known as the creative studio.\n\nWe create various things and help brands, products and services become the best in their respective classes.",
                location: "Tangerang City, Banten, Indonesia",
                button: "Learn More",
            },
            services: {
                title: "What We Do",
                description: "We provide various things from Design to AR/VR Experiences to fulfill the solutions to any problems.",
                button: "Our Services",
            },
            clients: {
                title: "Those Who Work With Us",
                description: "This was a group or people that put trust in us to grow their brands to the top.",
                button: "See Projects",
            },
            contact: {
                title: "Let's Build Something Together",
                description: "Something great are always made together, so why don’t we do it together?",
                button: "Contact Us",
            },
        },
    },
    id: {
        home: {
            intro: {
                title: "Ayo Explorasi Galaksi Kami",
            },
            about: {
                title: "Siapa Kami?",
                description:
                    "Kami adalah sekelompok orang yang berkumpul di ruang kreatif yang dikenal sebagai studio kreatif.\n\nKami membuat dan menyajikan berbagai produk dan layanan kepada klien kami agar produk dan jasa mereka dapat menjadi yang terbaik di kelasnya masing-masing.",
                location: "Kota Tangerang, Banten, Indonesia",
                button: "Pelajari Lebih Lanjut",
            },
            services: {
                title: "Yang Kami Lakukan",
                description: "Kami menyediakan berbagai hal, dari desain hingga ke pengalaman AR/VR untuk memenuhi segala kebutuhan dan solusi untuk masalah apa pun.",
                button: "Layanan Kami",
            },
            clients: {
                title: "Mereka Yang Bekerja Bersama Kami",
                description: "Ini adalah mereka yang mempercayai kami untuk meningkatkan kualitas merek milik mereka.",
                button: "Lihat Pekerjaan Kami",
            },
            contact: {
                title: "Mari Kita Membangun Sesuatu Bersama",
                description: "Sesuatu yang hebat selalu dibuat bersama, jadi mengapa kita tidak melakukannya bersama?",
                button: "Hubungi Kami",
            },
        },
    },
};

export default translations;
