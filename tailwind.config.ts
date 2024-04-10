import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
				fade: 'fadeIn .8s ease-in-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
			},

			keyframes: {
				fadeIn: {
          // @ts-ignore
					from: { opacity: 0 },
          // @ts-ignore
					to: { opacity: 1 },
				},
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
			},
    },
  },
  plugins: [
    // @ts-ignore
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          // @ts-ignore
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
export default config;
