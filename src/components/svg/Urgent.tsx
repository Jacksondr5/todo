import { getMatrixStatusColor } from "~/lib/utils";

export type UrgentProps = {
  className?: string;
  isUrgent?: boolean;
  onClick?: () => void;
};

export const Urgent = ({ className, isUrgent, onClick }: UrgentProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={getMatrixStatusColor(isUrgent)}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};
