import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Il dominio delle foto di Google
        port: '',
        pathname: '/**', // Autorizziamo tutti i percorsi sotto questo dominio
      },
    ],
  },
};

export default nextConfig;
