import { Preset } from 'unocss';
import { simpleVariantGuard } from '../utils';

type HocusOptions = {
	/**
	 * Use double selector instead of :is selector for ie11 support
	 * @warning old selector disable changing
	 */
	ie?: boolean,
}

type Selector = (s: string) => string

// Add hocus selector
export default function presetHocus(options: HocusOptions): Preset {
	const selector: Selector = options.ie
		? (v) => `${v}:hover, ${v}:focus`
		: (v) => `${v}:is(:hover,:focus)`;

	return {
		name:     'hocus',
		variants: [
			simpleVariantGuard((matcher) => ({
				matcher: matcher.rest,
				selector,
			}), 'hocus:'),
		],
	};
}
