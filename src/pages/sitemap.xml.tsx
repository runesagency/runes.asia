import type { GetServerSidePropsContext } from "next";

import filesystem from "fs";
import { fetchCMSAPI, encodeToURL } from "@/lib/functions";

type Page = {
    name: string;
    url: string;
    path: string;
    lastModified: string;
};

const baseUrl = process.env.URL;

const getStaticPages = (fs: typeof filesystem, path: string, subDir?: string) => {
    let pageList: Page[] = [];
    const pages = fs.readdirSync(path);

    pages
        .filter((page) => {
            if (page.startsWith("_")) {
                return false;
            }

            if (page.match(/\[.*\]/g)) {
                return false;
            }

            return true;
        })
        .map((page) => {
            const pagePath = `${path}/${page}`;
            const pageStat = fs.statSync(pagePath);

            if (pageStat.isDirectory()) {
                const getSubPages = getStaticPages(fs, pagePath, page);
                pageList = pageList.concat(getSubPages);
            } else {
                let pageUrl = "";
                let pageName = page.replace(/\.(t|j)sx?$/g, "");

                const isIndex = pageName === "index";
                const subPath = subDir ? `/${subDir}` : "";

                if (isIndex) {
                    pageName = "";
                    pageUrl = `${baseUrl}${subPath}`;
                } else {
                    pageUrl = `${baseUrl}${subPath}/${pageName}`;
                }

                pageList.push({
                    name: isIndex ? "index" : pageName,
                    url: pageUrl,
                    path: pagePath,
                    lastModified: pageStat.mtime.toISOString(),
                });
            }
        });

    return pageList;
};

const getTeamPages = async (): Promise<Page[]> => {
    const data = await fetchCMSAPI("/items/teams", {
        skip: 0,
        defaultValue: [],
        fields: [
            {
                id: true,
                date_updated: true,
                name: true,
            },
        ],
    });

    return data.map((team) => ({
        name: team.name,
        url: `${baseUrl}/about/team/${team.id}/${encodeToURL(team.name)}`,
        path: `./src/pages/about/team/[id].tsx`,
        lastModified: team.date_updated,
    }));
};

const getShowcasesPages = async (): Promise<Page[]> => {
    const data = await fetchCMSAPI("/items/showcases", {
        defaultValue: [],
        skip: 0,
        fields: [
            {
                id: true,
                date_updated: true,
                product_title: true,
            },
        ],
        filter: {
            status: "published",
        },
        sort: ["order"],
    });

    return data.map((showcase) => ({
        name: showcase.product_title,
        url: `${baseUrl}/showcases/${showcase.id}/${encodeToURL(showcase.product_title)}`,
        path: `./src/pages/showcases/[id].tsx`,
        lastModified: showcase.date_updated,
    }));
};

const getBlogPages = async (): Promise<Page[]> => {
    const data = await fetchCMSAPI("/items/blogs", {
        skip: 0,
        defaultValue: [],
        fields: [
            {
                id: true,
                date_updated: true,
                translations: [
                    {
                        title: true,
                    },
                ],
            },
        ],
        filter: {
            status: "published",
        },
    });

    const blog_translations_1 = data.map((blog) => ({
        ...blog,
        ...blog.translations[0],
    }));

    const blog_translations_2 = data.map((blog) => ({
        ...blog,
        ...(blog.translations as typeof data[0]["translations"][0][])[1],
    }));

    const blogList = [...blog_translations_1, ...blog_translations_2];

    return blogList.map((blog) => ({
        name: blog.title,
        url: `${baseUrl}/blog/${blog.id}/${encodeToURL(blog.title)}`,
        path: `./src/pages/blog/[...slug].tsx`,
        lastModified: blog.date_updated,
    }));
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const staticPages = getStaticPages(filesystem, "./src/pages");
    const teamPages = await getTeamPages();
    const showcasesPages = await getShowcasesPages();
    const blogPages = await getBlogPages();

    const pageList = [
        ...staticPages,
        ...teamPages,
        ...showcasesPages,
        ...blogPages,
        {
            name: "pricing-deck",
            url: `${baseUrl}/pricing-deck.pdf`,
            path: `./src/pages/pricing-deck.pdf`,
            lastModified: new Date().toISOString(),
        },
    ];

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pageList
            .map((page) => {
                return `
                    <url>
                        <loc>${page.url}</loc>
                        <lastmod>${page.lastModified}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>1.0</priority>
                    </url>
                `;
            })
            .join("")}
    </urlset>`.trim();

    context.res.setHeader("Content-Type", "text/xml");
    context.res.write(sitemap);
    context.res.end();

    return {
        props: {},
    };
};

export default function SiteMapPage() {
    return null;
}
