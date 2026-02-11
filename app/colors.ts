/**
 * Color constants
 */

export const COLORS = {
  // Primary colors
  PRIMARY: "#064ADA",
  PRIMARY_HOVER: "#0538A8",
  BLUE: "#007A78",
  LINK: "#1F58C6", // Link color
  RESPONSE_BACKGROUND: "#E8EFFF",
  GREEN: "#14991A",
  SUCCESS: "#14991A", // Alias for GREEN

  // Chart colors
  CHART_MINT: "#94E9B8",
  CHART_BLUE: "#5D9EFF",
  CHART_PURPLE: "#C9B3ED",
  CHART_YELLOW: "#FFDB56",
  CHART_DARK_BLUE: "#001B54",

  // Background colors
  BACKGROUND_WHITE: "#FFFFFF",
  BACKGROUND_GRAY: "#F5F5F6",
  BACKGROUND_2: "#F9F9FA",
  BACKGROUND_LIGHT: "#F7F7F8", // Light gray background

  // Border colors
  BORDER_GRAY: "#E0E0E0",

  // Text colors
  TEXT_PRIMARY: "#333F49",
  TEXT_SECONDARY: "#4A4A4A",
  TEXT_SECONDARY_LIGHT: "#666666",
  TEXT_DISABLED: "#999999",

  // Status colors
  ERROR: "#ff4d4f",
  STATUS_SUCCESS: "#14991A",
  STATUS_IN_PROGRESS: "#EF7100",
  STATUS_ERROR: "#EA2227",
  STATUS_DEFAULT: "#ACACAC",

  // Button colors
  BUTTON_DISABLED_BG: "#D9D9D9",
  BUTTON_DISABLED_TEXT: "#8C8C8C",

  // Documentation colors
  DOCUMENTATION_COLORS: [
    "#FF6B6B",
    "#031771",
    "#45B7D1",
    "#ff6310",
    "#FFEAA7",
    "#DDA0DD",
    "#a000d1",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
    "#F8C471",
    "#82E0AA",
    "#F1948A",
    "#85C1E9",
    "#D7BDE2",
  ] as const,

  // Pie chart color palette
  PIE_CHART_COLORS: [
    "#94E9B8", // Mint
    "#5D9EFF", // Blue
    "#C9B3ED", // Purple
    "#FFDB56", // Yellow
    "#001B54", // Dark Blue
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Sky Blue
    "#FFA07A", // Light Salmon
    "#F8C471", // Orange
    "#82E0AA", // Green
    "#DDA0DD", // Plum
    "#F1948A", // Pink
    "#A8E6CF", // Light Mint
    "#FFD93D", // Golden Yellow
  ] as const,
} as const;

export const CHART_COLORS = [
  ...COLORS.PIE_CHART_COLORS,
  "#FF8C94",
  "#6BCAE2",
  "#9B59B6",
  "#E67E22",
  "#1ABC9C",
  "#F39C12",
  "#E74C3C",
  "#3498DB",
  "#2ECC71",
  "#F1C40F",
  "#E91E63",
  "#00BCD4",
  "#FF9800",
  "#8BC34A",
  "#9C27B0",
] as const;

export const DOCUMENTATION_COLORS = COLORS.DOCUMENTATION_COLORS;

export const GREEN = COLORS.GREEN;
export const PRIMARY = COLORS.PRIMARY;
export const ERROR = COLORS.ERROR;
