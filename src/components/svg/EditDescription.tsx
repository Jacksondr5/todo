import { cn } from "~/lib/utils";

type EditDescriptionProps = {
  className?: string;
  onClick?: () => void;
};

export const EditDescription = ({
  className,
  onClick,
}: EditDescriptionProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn(className, "text-olive-9")}
      onClick={onClick}
    >
      <circle cx="12" cy="12" r="10" />
      {/* <path d="m9 9 6 6" /> */}
      <g transform="scale(.45) translate(15, 14.5)">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M13 8H7" />
        <path d="M17 12H7" />
      </g>
      {/* <path d="m15 9-6 6" stroke="green" /> */}
    </svg>
  );
};
