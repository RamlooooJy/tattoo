import type { NextConfig } from 'next'
import path from 'path'
import { webpack } from 'next/dist/compiled/webpack/webpack'
import packageJson from './package.json'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.resolve.modules.push(path.resolve('./src'))

    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': path.resolve('./app'),
    }

    // 👉 Добавляем версию как глобальную переменную
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.__APP_VERSION__': JSON.stringify(packageJson.version),
      }),
    )

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
    ],
  },
}

export default nextConfig
