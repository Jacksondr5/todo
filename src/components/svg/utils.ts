export type SvgProps = {
  dataTestId: string;
  size: "medium";
};

// Will actually add logic when we have more than one size
export const getSvgStyles = ({}: Omit<SvgProps, "dataTestId">) => {
  return "h-6";
};

export const svgColors = {
  red: "#e5484d",
  blue: "#0090ff",
} as const;
