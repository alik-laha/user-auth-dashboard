/** @type {import('next').NextConfig} */
import Dotenv from 'dotenv';

Dotenv.config();
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_DESTINATION}/api/:path*`,
            },
        ]
    },
};

export default nextConfig;
