module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	// setupFiles: ["dotenv/config"],
	// silent: true,
	collectCoverage: true,
	coverageReporters: ["text", "text-summary"],
	collectCoverageFrom: ["./src/**"],
	coverageThreshold: {
		global: {
			statements: 90,
			branches: 90,
			functions: 90,
			lines: 90,
		},
	},
	modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
	moduleFileExtensions: ["js", "json", "ts", "node", "jsx", "tsx"],
	testRegex: "(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	roots: ["<rootDir>/tests"],
	verbose: true,
};
