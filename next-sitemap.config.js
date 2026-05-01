/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.aryaconsultant.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/api/*',
    '/dashboard/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/dashboard'
        ],
      },
    ],
  },
};
