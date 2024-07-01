import { Preset, presetIcons } from 'unocss';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

export type MyIconsOptions = {
	/**
	 * Source of icons starting with my
	 * @default './src/assets/icons'
	 */
	mySource?: string,
	cdn?:      string,
}

// My preset for icons with some metadata
export default function myPresetIcons(options: MyIconsOptions = {}): Preset<any> {
	return {
		name:  'my-icons',
		rules: [
			['c_', { content: '"\xa0"' }],
		],
		presets: [
			presetIcons({
				extraProperties: {
					display:       'inline-block',
					height:        'auto',
					'min-height':  '1em',
					'white-space': 'nowrap',
				},
				cdn:         options.cdn,
				collections: {
					// All icons placed inside src/assets/icons will be listed as i-my-${file-name}
					my: FileSystemIconLoader(
						options.mySource || './src/assets/icons',
						(svg) => (
							svg
							// often black color is color of text, so can be replaced with currentColor
								.replaceAll('#000', 'currentColor')
								.replaceAll('#000000', 'currentColor')
								.replaceAll('black', 'currentColor')
						),
					),
				},
			}),
		],
	};
}
