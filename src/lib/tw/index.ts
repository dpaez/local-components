// src/lib/tw/index.ts
import plugin from "tailwindcss/plugin"
import { darkTokens, lightTokens } from "./tokens"

type Options = {
  /**
   * Selector that receives the light theme variables.
   * Examples: ":root" | "#app" | "[data-theme]"
   */
  root?: string

  /**
   * Selector that receives the dark theme overrides.
   * Examples: ".dark" | "[data-theme='dark']"
   */
  darkSelector?: string
}

const varToCssVar = (name: string) => `var(${name})`

export default plugin.withOptions<Options>(
  (opts) => {
    const root = opts?.root ?? ":root"
    const dark = opts?.darkSelector ?? ".dark"

    return ({ addBase, addUtilities }) => {
      addBase({
        // Keep your custom property registration (from styles/index.css)
        "@property --border-angle": {
          syntax: '"<angle>"',
          inherits: "false",
          "initial-value": "0deg",
        },

        // Light + dark token injection
        [root]: lightTokens,
        [dark]: darkTokens,

        // Optional: make sure the animated border keyframes exist without requiring
        // consumers to import any of your CSS files.
        "@keyframes border-rotate": {
          to: { "--border-angle": "360deg" },
        },
      })

      addUtilities(
        {
          ".triangle::before": {
            content: '""',
            "clip-path": "polygon(1.9% 0%, 50% 40%, 100% 0%, 100% 100%, 50% 60%, 0% 101.8%)",
          },
          ".bezel": {
            "corner-shape": "bevel",
            "border-bottom-right-radius": "var(--radius)",
            border: "3px solid var(--primary-700)",
            "text-box": "cap alphabetic",
          },
          ".radial-gradient-background": {
            background:
              "radial-gradient(circle at center, var(--secondary-100) 0%, var(--secondary-200) 30%, var(--secondary-300) 60%, var(--secondary-400) 100%)",
            position: "relative",
          },
          ".radial-gradient-background::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            "background-image":
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
            "mix-blend-mode": "hard-light",
          },
          ".noise-bg::before": {
            content: '""',
            "background-image":
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
            "background-color": "var(--background)",
            inset: "0",
            "z-index": "0",
          },
          ".noise-bg > *": {
            position: "relative",
            "z-index": "1",
          },
        },
        // optional: ensure these go in the utilities layer
        { layer: "utilities" },
      )
    }
  },

  // Theme registration: this is what makes `text-primary` (etc) compile in consumer apps.
  () => ({
    theme: {
      extend: {
        colors: {
          // semantic colors
          background: varToCssVar("--background"),
          foreground: varToCssVar("--foreground"),
          card: varToCssVar("--card"),
          "card-foreground": varToCssVar("--card-foreground"),
          popover: varToCssVar("--popover"),
          "popover-foreground": varToCssVar("--popover-foreground"),

          primary: {
            DEFAULT: varToCssVar("--primary"),
            foreground: varToCssVar("--primary-foreground"),
            50: varToCssVar("--primary-50"),
            100: varToCssVar("--primary-100"),
            200: varToCssVar("--primary-200"),
            300: varToCssVar("--primary-300"),
            400: varToCssVar("--primary-400"),
            500: varToCssVar("--primary-500"),
            600: varToCssVar("--primary-600"),
            700: varToCssVar("--primary-700"),
            800: varToCssVar("--primary-800"),
            900: varToCssVar("--primary-900"),
          },

          secondary: {
            DEFAULT: varToCssVar("--secondary"),
            foreground: varToCssVar("--secondary-foreground"),
            50: varToCssVar("--secondary-50"),
            100: varToCssVar("--secondary-100"),
            200: varToCssVar("--secondary-200"),
            300: varToCssVar("--secondary-300"),
            400: varToCssVar("--secondary-400"),
            500: varToCssVar("--secondary-500"),
            600: varToCssVar("--secondary-600"),
            700: varToCssVar("--secondary-700"),
            800: varToCssVar("--secondary-800"),
            900: varToCssVar("--secondary-900"),
          },

          muted: varToCssVar("--muted"),
          "muted-foreground": varToCssVar("--muted-foreground"),
          accent: varToCssVar("--accent"),
          "accent-foreground": varToCssVar("--accent-foreground"),

          destructive: varToCssVar("--destructive"),
          "destructive-foreground": varToCssVar("--destructive-foreground"),

          border: varToCssVar("--border"),
          input: varToCssVar("--input"),
          ring: varToCssVar("--ring"),

          // charts
          "chart-1": varToCssVar("--chart-1"),
          "chart-2": varToCssVar("--chart-2"),
          "chart-3": varToCssVar("--chart-3"),
          "chart-4": varToCssVar("--chart-4"),
          "chart-5": varToCssVar("--chart-5"),

          // sidebar
          sidebar: varToCssVar("--sidebar"),
          "sidebar-foreground": varToCssVar("--sidebar-foreground"),
          "sidebar-primary": varToCssVar("--sidebar-primary"),
          "sidebar-primary-foreground": varToCssVar("--sidebar-primary-foreground"),
          "sidebar-accent": varToCssVar("--sidebar-accent"),
          "sidebar-accent-foreground": varToCssVar("--sidebar-accent-foreground"),
          "sidebar-border": varToCssVar("--sidebar-border"),
          "sidebar-ring": varToCssVar("--sidebar-ring"),
        },

        // map Tailwind radii to your radius token
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },

        // make Tailwind shadows use your shadow tokens
        boxShadow: {
          "2xs": "var(--shadow-2xs)",
          xs: "var(--shadow-xs)",
          sm: "var(--shadow-sm)",
          DEFAULT: "var(--shadow)",
          md: "var(--shadow-md)",
          lg: "var(--shadow-lg)",
          xl: "var(--shadow-xl)",
          "2xl": "var(--shadow-2xl)",
        },

        // allow `font-sans`, `font-serif`, `font-mono` to use your tokenized stacks
        fontFamily: {
          sans: ["var(--font-sans)"],
          serif: ["var(--font-serif)"],
          mono: ["var(--font-mono)"],
        },

        // support your `animate-rotate-border` token/utility style
        animation: {
          "rotate-border": "border-rotate 3s linear infinite",
        },
      },
    },
  }),
)
