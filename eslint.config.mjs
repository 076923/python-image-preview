import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist/**', 'out/**', '.vscode-test/**', '*.mjs'] },
	...tseslint.configs.recommended,
	{
		files: ['src/**/*.ts'],
		rules: {
			'@typescript-eslint/naming-convention': [
				'warn',
				{ selector: 'import', format: ['camelCase', 'PascalCase'] },
			],
			curly: 'warn',
			eqeqeq: 'warn',
			'no-throw-literal': 'warn',
			semi: 'warn',
		},
	},
);
