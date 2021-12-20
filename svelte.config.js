import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import makeAttractionsImporter from 'attractions/importer.js';
import path from "path";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			importer: makeAttractionsImporter({
				themeFile: path.resolve('static/css/theme.scss'),
			}),
			includePaths: [path.resolve('./static/css')],
		},
	}),

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
