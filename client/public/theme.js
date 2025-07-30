// Design System Theme Configuration
const theme = {
  // Color Palette
  colors: {
    // Primary Colors
    primary: {
      50: "#e6f2ff",
      100: "#b3d9ff",
      200: "#80c0ff",
      300: "#4da7ff",
      400: "#1a8eff",
      500: "#0640AE", // Primary blue
      600: "#0533a0",
      700: "#042692",
      800: "#031a84",
      900: "#020d76",
    },

    // Secondary Colors
    secondary: {
      50: "#e6f7f8",
      100: "#b3e8eb",
      200: "#80d9de",
      300: "#4dcad1",
      400: "#1abbc4",
      500: "#287A86", // Project card gradient
      600: "#236d78",
      700: "#1e5f6a",
      800: "#19525c",
      900: "#14444e",
    },

    // Neutral Colors
    neutral: {
      0: "#ffffff",
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
    },

    // Semantic Colors
    success: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
    },

    // Utility Colors
    background: "#ffffff",
    surface: "#ffffff",
    overlay: "rgba(0, 0, 0, 0.5)",
    border: {
      light: "rgba(56, 56, 56, 0.1)",
      default: "rgba(56, 56, 56, 1)",
      focus: "#40A9FF",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.85)",
      secondary: "rgba(0, 0, 0, 0.65)",
      tertiary: "rgba(179, 179, 179, 1)",
      inverse: "#ffffff",
      disabled: "rgba(0, 0, 0, 0.25)",
    },

    // Project specific colors
    project: {
      cardBackground: "#CCF1D0",
      cardGradient:
        "linear-gradient(180deg, rgba(30, 30, 30, 0.22) 0%, rgba(255, 255, 255, 0.64) 100%)",
      footerBackground: "rgba(51, 51, 51, 0.15)",
    },
  },

  // Typography Scale (using rem units)
  typography: {
    // Font Families
    fontFamily: {
      primary: [
        "Poppins",
        "-apple-system",
        "Roboto",
        "Helvetica",
        "sans-serif",
      ],
      secondary: [
        "Inter",
        "-apple-system",
        "Roboto",
        "Helvetica",
        "sans-serif",
      ],
      body: ["Roboto", "-apple-system", "Roboto", "Helvetica", "sans-serif"],
    },

    // Font Sizes (converted to rem, base 16px)
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
      "8xl": "6rem", // 96px
      "9xl": "8rem", // 128px
    },

    // Font Weights
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },

    // Line Heights
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
      3: ".75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
    },

    // Typography Variants
    variants: {
      // Hero Typography
      heroTitle: {
        fontSize: "8rem", // 128px
        fontWeight: "700",
        lineHeight: "1.17", // 150px/128px
        fontFamily: "var(--font-primary)",
        textShadow: "0.625rem 0.625rem 0.25rem rgba(0, 0, 0, 0.25)",
      },

      heroSubtitle: {
        fontSize: "2.25rem", // 36px
        fontWeight: "500",
        lineHeight: "1.25", // 45px/36px
        fontFamily: "var(--font-primary)",
        textShadow: "0.625rem 0.625rem 0.25rem rgba(0, 0, 0, 0.25)",
      },

      // Section Typography
      sectionTitle: {
        fontSize: "4.5rem", // 72px
        fontWeight: "700",
        lineHeight: "normal",
        fontFamily: "var(--font-primary)",
      },

      sectionSubtitle: {
        fontSize: "1.5rem", // 24px
        fontWeight: "400",
        lineHeight: "normal",
        fontFamily: "var(--font-primary)",
      },

      // Navigation
      navigation: {
        fontSize: "1.25rem", // 20px
        fontWeight: "500",
        lineHeight: "normal",
        fontFamily: "var(--font-primary)",
      },

      // Project Card
      cardTitle: {
        fontSize: "1.5rem", // 24px
        fontWeight: "700",
        lineHeight: "1.33", // 32px/24px
        fontFamily: "var(--font-primary)",
      },

      cardSubtitle: {
        fontSize: "0.8125rem", // 13px
        fontWeight: "400",
        lineHeight: "1.23", // 16px/13px
        fontFamily: "var(--font-body)",
      },

      // Form Elements
      input: {
        fontSize: "1rem", // 16px
        fontWeight: "400",
        lineHeight: "1",
        fontFamily: "var(--font-secondary)",
      },

      // Categories
      categoryTitle: {
        fontSize: "1.5rem", // 24px
        fontWeight: "700",
        lineHeight: "1", // 24px/24px
        fontFamily: "var(--font-primary)",
      },

      // Pagination
      pagination: {
        fontSize: "0.875rem", // 14px
        fontWeight: "400",
        lineHeight: "1.57", // 22px/14px
        fontFamily: "var(--font-body)",
      },
    },
  },

  // Spacing Scale (using rem units)
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
    40: "10rem", // 160px
    48: "12rem", // 192px
    56: "14rem", // 224px
    64: "16rem", // 256px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    default: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    "4xl": "1.75rem", // 28px
    full: "9999px",
  },

  // Shadows
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    dropdown:
      "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
  },

  // Breakpoints
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-index scale
  zIndex: {
    auto: "auto",
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50",
    dropdown: "1000",
    sticky: "1020",
    fixed: "1030",
    modal: "1040",
    popover: "1050",
    tooltip: "1060",
  },
};

// CSS Custom Properties Generator
function generateCSSVariables() {
  const cssVars = [];

  // Color variables
  Object.entries(theme.colors).forEach(([category, colors]) => {
    if (typeof colors === "object" && !Array.isArray(colors)) {
      Object.entries(colors).forEach(([shade, value]) => {
        cssVars.push(`--color-${category}-${shade}: ${value};`);
      });
    } else {
      cssVars.push(`--color-${category}: ${colors};`);
    }
  });

  // Typography variables
  cssVars.push(
    `--font-primary: ${theme.typography.fontFamily.primary.join(", ")};`,
  );
  cssVars.push(
    `--font-secondary: ${theme.typography.fontFamily.secondary.join(", ")};`,
  );
  cssVars.push(`--font-body: ${theme.typography.fontFamily.body.join(", ")};`);

  // Spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars.push(`--spacing-${key}: ${value};`);
  });

  // Border radius variables
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars.push(`--radius-${key}: ${value};`);
  });

  // Shadow variables
  Object.entries(theme.boxShadow).forEach(([key, value]) => {
    cssVars.push(`--shadow-${key}: ${value};`);
  });

  return cssVars.join("\n  ");
}

// Export theme and utility function
if (typeof module !== "undefined" && module.exports) {
  module.exports = { theme, generateCSSVariables };
} else if (typeof window !== "undefined") {
  window.theme = theme;
  window.generateCSSVariables = generateCSSVariables;
}
