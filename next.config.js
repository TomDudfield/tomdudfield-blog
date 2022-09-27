// @ts-check

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://www.google.co.uk;
  connect-src 'self' https://*.analytics.google.com;
  form-action 'none';
  frame-ancestors 'none';
  report-uri https://dudfield.report-uri.com/r/d/csp/wizard
`
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