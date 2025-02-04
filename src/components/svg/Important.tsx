import { getSvgStyles, svgColors, type SvgProps } from "./utils";

export type ImportantProps = SvgProps & {
  isImportant?: boolean;
};

export const Important = ({
  dataTestId,
  isImportant,
  size,
}: ImportantProps) => {
  const color = isImportant ? svgColors.red : svgColors.blue;
  return (
    <svg
      data-testid={dataTestId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={getSvgStyles({ size })}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
};
