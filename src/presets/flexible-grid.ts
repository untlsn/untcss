import { Preset } from 'unocss';
import { handleUnits } from '~/utils';

function typeToTemplateName(type: string) {
	if (type == 'rows') return 'grid-template-rows';
	return 'grid-template-columns';
}

/**
 * Add more flexible grid layouts
 * @example
 * grid-cols-3_1 -> grid-template-columns: 3fr 1fr;
 * grid-rows-3_1 -> grid-template-rows: 3fr 1fr;
 * grid-cols-auto-4 -> grid-template-columns: repeat(4, auto);
 * grid-rows-auto-4 -> grid-template-rows: repeat(4, auto);
 * grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr));
 * grid-rows-fit-100 -> grid-template-rows: repeat(auto-fit, minmax(400, 1fr));
 * place-items-[center_stretch] -> place-items: center stretch;
 */
export default function presetFlexibleGrid(): Preset {
	return {
		name:  'flexible-grid',
		rules: [
			/** grid-cols-3_1 is equal to grid-cols-[3fr_1fr] */
			[/^grid-(cols|rows)-([\d_]{3,})$/, ([,type, numbers]) => {
				const values = numbers.replaceAll('_', 'fr ');
				return {
					[typeToTemplateName(type)]: `${values}fr`,
				};
			}],
			/** grid-cols-auto-4 is equal to grid-cols-[auto_auto_auto_auto] */
			[/^grid-(cols|rows)-auto-(\d+)$/, ([,type, value]) => ({
				[typeToTemplateName(type)]: `repeat(${value}, auto)`,
			})],
			/** @example grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr)); */
			[/^grid-(cols|rows)-fit-(\S+)$/, ([,type, value]) => ({
				[typeToTemplateName(type)]: `repeat(auto-fit, minmax(${handleUnits(value)}, 1fr))`,
			})],
			[/^place-(items|self)-\[(\w+)_(\w+)]$/, ([,type, first, second]) => ({
				[`place-${type}`]: `${first} ${second}`,
			})],
		],
	};
}
