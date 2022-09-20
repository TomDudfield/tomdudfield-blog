import React from 'react';
import Script from 'next/script';

const GA = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0WF17H5HPY"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
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

export default GA;