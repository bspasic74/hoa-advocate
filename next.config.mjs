import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
/*const nextConfig = {
  eslint: {
		ignoreDuringBuilds: true,
	},
};*/
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
