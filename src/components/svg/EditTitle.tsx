import { cn } from "~/lib/utils";

type EditTitleProps = {
  className?: string;
  onClick?: () => void;
};

export const EditTitle = ({ className, onClick }: EditTitleProps) => {
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
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
      </g>
      {/* <path d="m15 9-6 6" stroke="green" /> */}
    </svg>
  );
};
