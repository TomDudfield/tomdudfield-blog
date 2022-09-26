import { AppProps, NextWebVitalsMetric } from 'next/app'
import '../styles/index.css'
import React from 'react';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
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

export default MyApp;