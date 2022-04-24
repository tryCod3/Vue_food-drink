module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	content: [],
	theme: {
		screens: {
			tablet: "640px",
			// => @media (min-width: 640px) { ... }

			laptop: "1024px",
			// => @media (min-width: 1024px) { ... }

			desktop: "1280px",
			// => @media (min-width: 1280px) { ... }
		},
		borderWidth: {
			DEFAULT: "1px",
			0: "0",
			2: "2px",
			3: "3px",
			4: "4px",
			6: "6px",
			8: "8px",
		},
	},
	plugins: [],
};
