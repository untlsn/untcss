import { Preset } from 'unocss';
import * as presets from './index';

type AioOptions = {
	ariaAndDataSelector?: presets.AriaAndDataSelectorOptions,
	hocus?:               presets.HocusOptions,
	myIcons?:             presets.MyIconsOptions,
}

// All my presets bundled to one
export default function presetAio(options: AioOptions = {}): Preset {
	return {
		name:    'untcss-aio',
		presets: [
			presets.presetAriaAndDataSelector(options.ariaAndDataSelector),
			presets.presetHocus(options.hocus),
			presets.myPresetIcons(options.myIcons),
			presets.presetFlexibleGrid(),
			presets.presetSizeShortcut(),
		],
	};
}
