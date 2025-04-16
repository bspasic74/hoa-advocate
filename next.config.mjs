import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
const nextConfig = {
  /* config options here */
  eslint: {
		ignoreDuringBuilds: true,
	},
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
