import { Preset } from 'unocss';

/**
 * And some utils to work with images
 *
 * @example
 * not-src:hidden -> .not-src:hidden:not([src]) { display: hidden }
 */
export function presetImages(): Preset<any> {
	return {
		name: 'preset-images',
		variants: [
			(matcher) => {
				if (!matcher.startsWith('not-src:')) return matcher;
				return {
					matcher:  matcher.slice(8),
					selector: (s) => `${s}:not([src])`,
				};
			},
		],
	}
}
