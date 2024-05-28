/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
console.log("isProd", isProd);
const nextConfig = {
    // distDir: isProd ? 'build' : '.next',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'driver-cog.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig
