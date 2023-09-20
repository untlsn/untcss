import { Preset } from 'unocss';
import { filterFalsy, simpleVariantGuard } from '~/utils';

export type AriaAndDataSelectorOptions = {
	// Disable group selectors
	disableGroupSelectors?: boolean
}

/**
 * Add selectors for aria and data attrs
 */
export default function presetAriaAndDataSelector(options: AriaAndDataSelectorOptions = {}): Preset {
	return {
		name:     'aria-and-data-selector',
		variants: filterFalsy([
			simpleVariantGuard((matcher) => {
				const variant = `data-${matcher.pureVariant}`;

				return {
					selector: matcher.insideSquareBrackets
						? (s) => `${s}[${variant}="${matcher.insideSquareBrackets}"]`
						: (s) => `${s}[${variant}]`,
					matcher: matcher.rest,
				};
			}, ['aria-', 'data-']),
			!options.disableGroupSelectors && simpleVariantGuard((matcher) => {
				const variant = `data-${matcher.pureVariant}`;

				return {
					selector: matcher.insideSquareBrackets
						? (s) => `.group[${variant}="${matcher.insideSquareBrackets}"] ${s}`
						: (s) => `.group[${variant}] ${s}`,
					matcher: matcher.rest,
				};
			}, ['group-aria-', 'group-data-']),
		]),
	};
}
