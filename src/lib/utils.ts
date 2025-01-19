import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { redDark, blueDark, oliveDark } from "@radix-ui/colors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// These are used by the Urgent and Important components to determine the color of the icon
const MATRIX_STATUS_COLORS = {
  positive: redDark.red9,
  neutral: oliveDark.olive9,
  negative: blueDark.blue9,
};

export const getMatrixStatusColor = (isUrgent: boolean | undefined) => {
  switch (isUrgent) {
    case true:
      return MATRIX_STATUS_COLORS.positive;
    case false:
      return MATRIX_STATUS_COLORS.negative;
    case undefined:
      return MATRIX_STATUS_COLORS.neutral;
  }
};
