import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import type { PluginAPI } from "tailwindcss/types/config";

const addVariablesForColors = ({ addBase, theme }: PluginAPI) => {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
	);

	addBase({
		":root": newVars,
	});
};

const config: Config = {
	content: ["./src/**/*.{ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				xs: { max: "639px" },
				zsm: "490px",
				zssm: "415px",
				xsm: "730px",
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			animation: {
				pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				slider: "slider var(--duration, 30s) linear infinite",
				fadeIn: "fadeIn 1s ease-in-out",
				float: "float 20s ease-in-out infinite alternate",
				maskReveal: "maskReveal 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
			},
			keyframes: {
				slider: {
					to: { transform: "translateX(-50%)" },
				},
				pulse: {
					"50%": { opacity: "0.5" },
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				float: {
					"0%, 100%": {
						transform: "translate(0%, 0%) scale(1)",
					},
					"25%": {
						transform: "translate(-0.5%, 1%) scale(1.01)",
					},
					"50%": {
						transform: "translate(0.5%, -0.5%) scale(1)",
					},
					"75%": {
						transform: "translate(-0.25%, 0.5%) scale(1.005)",
					},
				},
				maskReveal: {
					"0%": {
						opacity: "0",
						transform: "scale(0.8)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
			},
		},
	},
	plugins: [
		addVariablesForColors,
		function ({ matchUtilities, theme }: any) {
			matchUtilities(
				{
					"bg-grid": (value: any) => ({
						backgroundImage: `url("data:image/svg+xml;base64,${btoa(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-grid-small": (value: any) => ({
						backgroundImage: `url("data:image/svg+xml;base64,${btoa(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-dot": (value: any) => ({
						backgroundImage: `url("data:image/svg+xml;base64,${btoa(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
						)}")`,
					}),
				},
				{
					values: flattenColorPalette(theme("backgroundColor")),
					type: "color",
				},
			);
		},
	],
} satisfies Config;

export default config;
