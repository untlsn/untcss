import { Preset } from 'unocss';
import { handleUnits } from '~/utils';


/**
 * Add more flexible grid layouts
 * @example grid-cols-3_1 -> grid-template-columns: 3fr 1fr;
 * @example grid-cols-auto-4 -> grid-template-columns: repeat(4, auto);
 * @example grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr));
 * @example place-items-[center_stretch] -> place-items: center stretch;
 */
export default function presetFlexibleGrid(): Preset {
	return {
		name:  'flexible-grid',
		rules: [
			/** grid-cols-3_1 is equal to grid-cols-[3fr_1fr] */
			[/^grid-cols-([\d_]{3,})$/, ([,numbers]) => {
				const values = numbers.replaceAll('_', 'fr ');
				return {
					'grid-template-columns': `${values}fr`,
				};
			}],
			/** grid-cols-auto-4 is equal to grid-cols-[auto_auto_auto_auto] */
			[/^grid-cols-auto-(\d+)$/, ([,value]) => ({
				'grid-template-columns': `repeat(${value}, auto)`,
			})],
			/** @example grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr)); */
			[/^grid-cols-fit-(\S+)$/, ([,value]) => ({
				'grid-template-columns': `repeat(auto-fit, minmax(${handleUnits(value)}, 1fr))`,
			})],
			[/^place-(items|self)-\[(\w+)_(\w+)]$/, ([,type, first, second]) => ({
				[`place-${type}`]: `${first} ${second}`,
			})],
		],
	};
}
