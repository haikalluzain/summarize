/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
  '@omtanke/react-use-event-outside',
])

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withTM({ nextConfig })
