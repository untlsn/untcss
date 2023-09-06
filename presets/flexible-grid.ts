import { Preset } from 'unocss';
import { handleUnits } from '../utils';


/**
 * Add more flexible grid layouts
 * @example grid-cols-3_1 -> grid-template-columns: 3fr 1fr;
 * @example grid-cols-auto-4 -> grid-template-columns: repeat(4, auto);
 * @example grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr));
 * @example place-items-[center-stretch] -> place-items: center stretch;
 */
export default function presetFlexibleGrid(): Preset {
	return {
		name:  'flexible-grid',
		rules: [
			/** grid-cols-3_1 is equal to grid-cols-[3fr_1fr] */
			[/^grid-cols-[\d_]{3,}$/, ([matcher]) => {
				const values = matcher.slice('grid-cols-'.length).replaceAll('_', 'fr ');
				return {
					'grid-template-columns': `${values}fr`,
				};
			}],
			/** grid-cols-auto-4 is equal to grid-cols-[auto_auto_auto_auto] */
			[/^grid-cols-auto-\d+$/, ([matcher]) => {
				const values = matcher.slice('grid-cols-auto-'.length);
				return {
					'grid-template-columns': `repeat(${values}, auto)`,
				};
			}],
			/** @example grid-cols-fit-100 -> grid-template-columns: repeat(auto-fit, minmax(400, 1fr)); */
			[/^grid-cols-fit-\S+$/, ([matcher]) => {
				const value = matcher.slice('grid-cols-fit-'.length);

				return {
					'grid-template-columns': `repeat(auto-fit, minmax(${handleUnits(value)}, 1fr))`,
				};
			}],
			[/^place-(items|self)-\[\w+]$/, ([matcher]) => {
				const [selector, value] = matcher.split('-[');
				return {
					[selector]: value.replace(/_/g, ' ').slice(0, -1),
				};
			}],
		],
	};
}