import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	base: process.env.VITE_BASE_PATCH || "/JS_TS_VUE_REACT"
};

export default nextConfig;
