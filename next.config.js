/** @type {import('next').NextConfig} */
// module.exports = {
//     images: {
//         domains: ['maharaja-bucket.s3.amazonaws.com'],
//     },
// };

// const NextConfig={};
// module.exports = NextConfig;

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'maharaja-bucket.s3.amazonaws.com',
                port: '',
                pathname: '**',
            },
        ],
    },
}