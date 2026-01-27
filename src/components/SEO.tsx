import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({
    title = 'Amar Ballot',
    description = 'Empowering every voter with the right information.',
    image = '/og-image.png',
    url = 'https://amarballot.com'
}: SEOProps) {
    const { language } = useLanguage();
    // In a real app, you might want localized defaults
    const siteTitle = title === 'Amar Ballot' ? title : `${title} | Amar Ballot`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description} />
            <html lang={language} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}
