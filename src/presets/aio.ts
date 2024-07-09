import { PresetOrFactory } from 'unocss';
import * as presets from './index';
import presetRemToPx, { RemToPxOptions } from '@unocss/preset-rem-to-px';

type AioOptions = {
	ariaAndDataSelector?: presets.AriaAndDataSelectorOptions,
	hocus?:               presets.HocusOptions,
	myIcons?:             presets.MyIconsOptions,
	remToPx?:             RemToPxOptions
}

// All my presets bundled to one
export function presetAio(options: AioOptions = {}): PresetOrFactory<any>[] {
	return [
		presets.presetAriaAndDataSelector(options.ariaAndDataSelector),
		presets.presetHocus(options.hocus),
		presets.myPresetIcons(options.myIcons),
		presets.presetFlexibleGrid(),
		presets.presetSizeShortcut(),
		presets.presetImages(),
		presetRemToPx(options.remToPx),
	];
}
