import { grassDark, redDark, oliveDark } from "@radix-ui/colors";

export type StatusProps = {
  className?: string;
  status: "blocked" | "done" | "in-progress";
  onClick?: () => void;
};

const statusColors = {
  blocked: redDark.red9,
  done: grassDark.grass9,
  "in-progress": oliveDark.olive9,
} as const satisfies Record<StatusProps["status"], string>;

export const Status = ({ className, status, onClick }: StatusProps) => {
  let content: React.ReactNode;
  switch (status) {
    case "blocked":
      content = (
        <>
          <line x1="10" x2="10" y1="15" y2="9" />
          <line x1="14" x2="14" y1="15" y2="9" />
        </>
      );
      break;
    case "done":
      content = <path d="m9 12 2 2 4-4" />;
      break;
    case "in-progress":
      content = (
        <>
          <path d="M17 12h.01" />
          <path d="M12 12h.01" />
          <path d="M7 12h.01" />
        </>
      );
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={statusColors[status]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="10" />
      {content}
    </svg>
  );
};
