import CaseStudySectionRenderer from './CaseStudySectionRenderer';
import Layout from '../../../components/Layout';
import { NextSeo } from 'next-seo';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
export default function CaseStudy(props) {
  const pathname = usePathname();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
	const currentUrl = `${origin}${pathname}`;
  const pageData = props?.data?.data?.contentNodes?.nodes[0];
  const seoValue = props?.data?.data?.contentNodes?.nodes[0]?.seo;
  if (props?.data?.error) return <p className='pt-[100px] text-center'>Error: something went wrong please wait or try again</p>;
  const sections = pageData?.pageBuilder?.sections || [];
  return (
    <Layout>
      <NextSeo title={`${seoValue?.title} - Sift`} description={`${seoValue?.metaDesc ? seoValue?.metaDesc : "AI Platform for Identity-Centric Fraud | Sift"}`}
        canonical={currentUrl}
        openGraph={{
          type: 'website',
          siteName: 'Sift',
          url: currentUrl,
          title: seoValue?.title,
          description: seoValue?.metaDesc ? seoValue?.metaDesc : "AI Platform for Identity-Centric Fraud | Sift",
          images: [
            {
              url: seoValue?.opengraphImage?.sourceUrl ? seoValue?.opengraphImage?.sourceUrl : 'https://sift.com/OG-default.jpg',
              width: 800,
              height: 600,
              alt: seoValue?.title,
            }
          ],
        }} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoValue?.title} />
        <meta name="twitter:description" content={seoValue?.metaDesc ? seoValue?.metaDesc : "AI Platform for Identity-Centric Fraud | Sift"} />
        <meta name="twitter:image" content={seoValue?.opengraphImage?.sourceUrl ? seoValue?.opengraphImage?.sourceUrl : "https://sift.com/OG-twitter.jpg"} />
        <meta name="twitter:site" content="https://twitter.com/GetSift" />
      </Head>
      <div className='case-study-detail'>
        {sections.map((section, index) => (
          <CaseStudySectionRenderer key={index} type={section.__typename} data={section} />
        ))}
      </div>
    </Layout>
  );
}
