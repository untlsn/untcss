import { Preset } from 'unocss';
import { simpleVariantGuard } from '../utils';

type MediaPxMap = Record<string, number>

const defaultMediaPxMap  = {
	sm:    640 - 1,
	md:    768 - 1,
	lg:    1024 - 1,
	xl:    1280 - 1,
	'2xl': 1536 - 1,
} satisfies MediaPxMap;

type MobileFirstOptions = {
	// Extends default mediaPxMap. Remember to subtract by 1 for consistency with mobile queries
	extends?: Record<string, number>
	// Disable defaultMediaPxMap
	clear?:   boolean
}

/**
 * Allow to use desktop-first media queries prefixed with max-
 * @example
 * max-lg:hidden -> @media (max-width: 1023px) { max-lg\:hidden { display: hidden } }
 */
export default function presetDesktopFirst(options: MobileFirstOptions): Preset {
	const mediaPxMap: MediaPxMap = Object.assign({}, options.clear || defaultMediaPxMap, options.extends);

	return {
		name:     'desktop-first',
		variants: [
			simpleVariantGuard((matcher) => {
				const mediaPx = mediaPxMap[matcher.pureVariant];
				if (!mediaPx) return undefined;

				return {
					matcher: matcher.rest,
					parent:  `@media (max-width: ${mediaPx}px)`,
				};
			}, 'max-'),
		],
	};
}
