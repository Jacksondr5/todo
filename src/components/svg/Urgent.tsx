import { svgColors, getSvgStyles, type SvgProps } from "./utils";

export type UrgentProps = SvgProps & {
  isUrgent?: boolean;
};

export const Urgent = ({ dataTestId, isUrgent, size }: UrgentProps) => {
  return (
    <svg
      data-testid={dataTestId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isUrgent ? svgColors.red : svgColors.blue}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={getSvgStyles({ size })}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};
