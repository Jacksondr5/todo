import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import { theme } from "./theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
    },
  },
};

export default preview;
