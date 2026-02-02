import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  {
    ignores: [".next/**", "convex/_generated/**", "next-env.d.ts"],
  },
  ...nextConfig,
  prettierConfig,
];

export default eslintConfig;
