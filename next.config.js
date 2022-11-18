/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@omtanke/react-use-event-outside',
])

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
})
