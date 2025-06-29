// Centralized theme configuration - Change colors here to affect the entire website
export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e", // Main teal color
      800: "#115e59",
      900: "#134e4a",
    },
    // Secondary accent colors
    secondary: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74", // Main orange/peach color
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
    // Neutral colors
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    // Semantic colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  // Typography
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
  },
  // Spacing
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
  },
  // Border radius
  radius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
  },
} as const

// CSS custom properties for dynamic theming
export const cssVariables = {
  "--color-primary-50": theme.colors.primary[50],
  "--color-primary-100": theme.colors.primary[100],
  "--color-primary-200": theme.colors.primary[200],
  "--color-primary-300": theme.colors.primary[300],
  "--color-primary-400": theme.colors.primary[400],
  "--color-primary-500": theme.colors.primary[500],
  "--color-primary-600": theme.colors.primary[600],
  "--color-primary-700": theme.colors.primary[700],
  "--color-primary-800": theme.colors.primary[800],
  "--color-primary-900": theme.colors.primary[900],

  "--color-secondary-50": theme.colors.secondary[50],
  "--color-secondary-100": theme.colors.secondary[100],
  "--color-secondary-200": theme.colors.secondary[200],
  "--color-secondary-300": theme.colors.secondary[300],
  "--color-secondary-400": theme.colors.secondary[400],
  "--color-secondary-500": theme.colors.secondary[500],
  "--color-secondary-600": theme.colors.secondary[600],
  "--color-secondary-700": theme.colors.secondary[700],
  "--color-secondary-800": theme.colors.secondary[800],
  "--color-secondary-900": theme.colors.secondary[900],
}
