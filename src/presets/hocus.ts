import { Preset } from 'unocss';
import { simpleVariantGuard } from '~/utils';

export type HocusOptions = {
	/**
	 * Use double selector instead of :is selector for ie11 support
	 * @warning old selector disable changing
	 */
	ie?: boolean,
}

// Add hocus selector
export default function presetHocus(options: HocusOptions = {}): Preset {
	return {
		name:     'hocus',
		variants: [
			simpleVariantGuard((matcher) => ({
				matcher:  matcher.rest,
				selector: options.ie
					? (v) => `${v}:hover, ${v}:focus`
					: (v) => `${v}:is(:hover,:focus)`,
			}), 'hocus:'),
			simpleVariantGuard((matcher) => ({
				matcher:  matcher.rest,
				selector: options.ie
					? (v) => `group:hover ${v}, group:focus ${v}`
					: (v) => `group:is(:hover,:focus) ${v}`,
			}), 'group-hocus:'),
		],
	};
}
