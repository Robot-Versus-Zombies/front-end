/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
	},
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
};
