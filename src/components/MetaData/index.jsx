import Head from "next/head";
import { useRouter } from "next/router";

const MetaData = ({
    title,
    description,
    imageUrl = "/assets/imgs/logo.png",
    siteName = "",
    locale = "en_GB",
    type = "website",
    canonical,
    children,
    keywords,
}) => {
    const router = useRouter();

    return (
        <Head>
            <title>{title}</title>
            {canonical && <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE}/${canonical}`} />}
            {keywords && keywords.length && <meta name="keywords" content={keywords.join(", ")} />}
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:secure_url" content={imageUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE}${router.asPath}`} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content={locale} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:image:height" content="620" />
            <meta property="og:image:width" content="1024" />
            <meta name="twitter:card" content="summary_large_image" />
            {/* <meta name="twitter:site" content="@Account" /> */}
            <meta name="twitter:image" content={imageUrl} />
            {/* <meta name="twitter:creator" content="@Account" /> */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta property="article:publisher" content="https://www.facebook.com/fb-account" />
            {children}
        </Head>
    );
};

export default MetaData;
