export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')];

export const server_loads = [];

export const dictionary = {
	"/": [~2],
	"/api": [3],
	"/examples": [~4],
	"/examples/basic": [~5],
	"/examples/blocks": [~6],
	"/examples/i18n": [~7],
	"/examples/small": [~8],
	"/examples/sticky": [~9],
	"/home": [10]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};