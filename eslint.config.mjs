import nextConfig from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier/flat";

const eslintConfig = [
  {
    ignores: [".next/**", "convex/_generated/**", "next-env.d.ts"],
  },
  ...nextConfig,
  prettierConfig,
];

export default eslintConfig;
