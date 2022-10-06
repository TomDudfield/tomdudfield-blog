import '../styles/index.css'
import { NextWebVitalsMetric } from 'next/app'
import React from 'react';
import Script from 'next/script';
import Head from 'next/head';

function MyApp({ Component, pageProps, canonical }) {
  return (
    <>
      <Head>
        <meta key="og_url" property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Head>
      
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0WF17H5HPY"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-0WF17H5HPY');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

MyApp.getInitialProps = ({ ctx }) => {
  const isProd = process.env.NODE_ENV === "production";
  const base = isProd ? "https://www.tomdudfield.com" : "http://localhost:3000";
  const { asPath } = ctx;
  const canonical = base + asPath;

  return {
    canonical,
  };
};

export default MyApp;