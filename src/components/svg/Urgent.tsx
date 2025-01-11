export type UrgentProps = {
  className?: string;
  isUrgent?: boolean;
};

const urgentColor = "#dc2626";
const notUrgentColor = "#2563eb";

export const Urgent = ({ className, isUrgent }: UrgentProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isUrgent ? urgentColor : notUrgentColor}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};
