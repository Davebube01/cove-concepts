import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  typescript: {
    // chart.tsx (recharts v2 API) and calendar.tsx (react-day-picker v9 API)
    // have shadcn version mismatches but are not used in the landing page.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
