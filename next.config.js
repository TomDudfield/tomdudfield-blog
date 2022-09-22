// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

// const contentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self';
//   child-src example.com;
//   style-src 'self' example.com;
//   font-src 'self';  
// `
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // {
  //   key: 'Strict-Transport-Security',
  //   value: 'max-age=31536000; includeSubDomains; preload'
  // },
  // {
  //   key: 'X-XSS-Protection',
  //   value: '1; mode=block'
  // },
  // {
  //   key: 'X-Frame-Options',
  //   value: 'SAMEORIGIN'
  // },
  // {
  //   key: 'Permissions-Policy',
  //   value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  // },
  // {
  //   key: 'X-Content-Type-Options',
  //   value: 'nosniff'
  // },
  // {
  //   key: 'Referrer-Policy',
  //   value: 'strict-origin-when-cross-origin'
  // },
  // {
  //   key: 'Content-Security-Policy',
  //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  // }
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