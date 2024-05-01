/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:7000/api/:path*',
            },
        ]
    },
};

export default nextConfig;
