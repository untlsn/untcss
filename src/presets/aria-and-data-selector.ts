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
			simpleVariantGuard((matcher) => ({
				selector: matcher.insideSquareBrackets
					? (s) => `${s}[${matcher.pureVariant}="${matcher.insideSquareBrackets}"]`
					: (s) => `${s}[${matcher.pureVariant}]`,
				matcher: matcher.rest,
			}), ['aria-', 'data-']),
			!options.disableGroupSelectors && simpleVariantGuard((matcher) => ({
				selector: matcher.insideSquareBrackets
					? (s) => `.group[${matcher.pureVariant}="${matcher.insideSquareBrackets}"] ${s}`
					: (s) => `.group[${matcher.pureVariant}] ${s}`,
				matcher: matcher.rest,
			}), ['group-aria-', 'group-data-']),
		]),
	};
}
