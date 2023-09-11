import { Preset } from 'unocss';

/**
 * Allow to use size class that is shortcut for height and width
 * @example
 * size-10 -> height-10 width-10
 * min-size-1/4 -> min-height-1/4 min-width-1/4
 * max-size-4rem -> min-height-4rem min-width-4rem
 * size-50v -> height-50vh width-50vw
 */
export default function presetSizeShortcut(): Preset {
	return {
		name:      'size-shortcut',
		shortcuts: [
			[/^((min|max)-)?size-(\S+)$/, function([,prefix = '',, value]) {
				if (value.endsWith('v')) {
					return `${prefix}w-${value}w ${prefix}h-${value}h`;
				}
				return `${prefix}w-${value} ${prefix}h-${value}`;
			}],
		],
	};
}
