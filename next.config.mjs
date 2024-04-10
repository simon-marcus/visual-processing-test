/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'qqvhixaarirsmydgqoqq.supabase.co',
                port: '',
                pathname: '/**',
            },
        ]
    }
};

export default nextConfig;
