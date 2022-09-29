// @ts-check

let contentSecurityPolicy = `
  default-src 'self';
  img-src 'self' data: https://www.google.co.uk;
  font-src 'self' data:;
  connect-src 'self' https://*.analytics.google.com https://vitals.vercel-insights.com https://stats.g.doubleclick.net;
  form-action 'none';
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  report-uri https://dudfield.report-uri.com/r/d/csp/wizard;`

if (process.env.NODE_ENV !== 'production') {
  contentSecurityPolicy += `
  style-src 'self' 'unsafe-inline'; 
  script-src 'unsafe-eval' 'unsafe-inline' 'self' https://www.googletagmanager.com https://static.cloudflareinsights.com`
}
else {
  contentSecurityPolicy += `
  style-src 'self' 'unsafe-inline'; 
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com`
}

/**
 * @type {import('next').NextConfig}
 **/
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: 'https://www.tomdudfield.com'
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
]

const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  compress: true,
  trailingSlash: true,
  reactStrictMode: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig