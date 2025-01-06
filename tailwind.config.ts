import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { grassDark, oliveDark } from "@radix-ui/colors";

// Rename the colors to match tailwind's naming convention
const grass = Object.fromEntries(
  Object.entries(grassDark).map(([key, value]) => [
    key.replace(/^grass(\d+)$/, "grass-$1"),
    value,
  ]),
);

const olive = Object.fromEntries(
  Object.entries(oliveDark).map(([key, value]) => [
    key.replace(/^olive(\d+)$/, "olive-$1"),
    value,
  ]),
);

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        ...grass,
        ...olive,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
