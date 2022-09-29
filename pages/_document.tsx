import { Html, Head, Main, NextScript } from 'next/document'
import crypto from 'crypto'

const cspHashOf = (text) => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}

export default function Document(ctx) {
  let contentSecurityPolicy = `
    default-src 'self';
    img-src 'self' data: https://www.google.co.uk;
    font-src 'self' data:;
    connect-src 'self' https://*.analytics.google.com https://vitals.vercel-insights.com https://stats.g.doubleclick.net;`
    
  if (process.env.NODE_ENV !== 'production') {
    contentSecurityPolicy += `
    style-src 'self' 'unsafe-inline'; 
    script-src 'unsafe-eval' 'unsafe-inline' 'self' https://www.googletagmanager.com https://static.cloudflareinsights.com`
    // ${cspHashOf(
    //   NextScript.getInlineScriptSource(ctx)
    // )}
  }
  else {
    contentSecurityPolicy += `
    style-src 'self'; 
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com
   
    `
    //  ${cspHashOf(
    //   NextScript.getInlineScriptSource(ctx)
    // )}
  }

  return (
    <Html>
    <Head>
      <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
    </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}