import '../styles/index.css'
import { NextWebVitalsMetric } from 'next/app'
import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const isProd = process.env.NODE_ENV === "production";
  const base = isProd ? "https://www.tomdudfield.com" : "http://localhost:3000";
  
  const getCanonical = (path: string) => {
    const fullURL = new URL(path, base)
    return`${fullURL.origin}${fullURL.pathname}`
  }
  const router = useRouter()
  const canonical = getCanonical(router.asPath)
  return (
    <>
      <Head>
        <meta key="og_url" property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default MyApp;