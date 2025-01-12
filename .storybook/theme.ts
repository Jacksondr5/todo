import { create } from "@storybook/theming";
import { oliveDark, grassDark } from "@radix-ui/colors";

const weird1 = "#c842f5";
const weird2 = "#e9f542";

export const theme = create({
  base: "dark",
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  brandTitle: "J5 Todo Storybook",
  brandUrl: "https://jackson.codes",
  brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
  brandTarget: "_self",

  //
  colorPrimary: weird1,
  colorSecondary: grassDark.grass9,

  // UI
  appBg: grassDark.grass1,
  appContentBg: grassDark.grass1,
  appPreviewBg: grassDark.grass1,
  appBorderColor: grassDark.grass6,
  appBorderRadius: 4,

  // Text colors
  textColor: oliveDark.olive12,
  textInverseColor: weird1,

  // Toolbar default and active colors
  barTextColor: oliveDark.olive12,
  barSelectedColor: oliveDark.olive5,
  barHoverColor: grassDark.grass9,
  barBg: grassDark.grass2,

  // Form colors
  inputBg: oliveDark.olive1,
  inputBorder: oliveDark.olive6,
  inputTextColor: oliveDark.olive12,
  inputBorderRadius: 2,
  booleanBg: oliveDark.olive3,
  booleanSelectedBg: oliveDark.olive5,
  buttonBg: grassDark.grass3,
  buttonBorder: grassDark.grass6,
  gridCellSize: 16,
  textMutedColor: oliveDark.olive11,
});
