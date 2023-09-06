import { Variant, VariantHandler } from 'unocss';

class MatcherController {
	constructor(private matcher: string, private prefix: string) {}

	private _colonIndex: number | undefined;
	private get colonIndex() {
		this._colonIndex ||= this.matcher.indexOf(':');
		return this._colonIndex;
	}
	// String before first : with prefix
	get variant() {
		return this.matcher.slice(0, this.colonIndex);
	}
	// String after first : to the end
	get rest() {
		return this.matcher.slice(this.colonIndex+1);
	}
	// String before first : without prefix and square brackets
	get pureVariant() {
		return this.matcher.slice(0, this.colonIndex)
			.replace(this.prefix, '')
			.replace(/-\[.+]$/, '');
	}
	private _insideSquareBrackets: string | undefined = '__NONE__';
	get insideSquareBrackets() {
		if (this._insideSquareBrackets == '__NONE__') {
			const index = this.matcher.indexOf('[') + 1;
			if (!index) return undefined;
			this._insideSquareBrackets = this.matcher.slice(index, this.matcher.indexOf(']'));
		}
		return this._insideSquareBrackets;
	}
}

type Prefix = MaybeArray<string>

type SimpleVariantGuardCb = (matcher: MatcherController) => VariantHandler | undefined
type MaybeArray<T> = T | T[]

type PassPrefixFn = (str: string) => string | undefined
export function simpleVariantGuard(cb: SimpleVariantGuardCb, prefix: Prefix): Variant {
	const passPrefix: PassPrefixFn = typeof prefix == 'string'
		? (str) => str.startsWith(prefix) ? prefix : undefined
		: (str) => prefix.find((v) => str.startsWith(v));

	return (matcher) => {
		const prefix = passPrefix(matcher);
		if (!prefix) return matcher;

		const matcherController = new MatcherController(matcher, prefix);
		return cb(matcherController) || matcher;
	};
}

type FalsyValues = false | undefined | null | '' | 0

export function filterFalsy<T>(arr: (T | FalsyValues)[]): T[] {
	return arr.filter(Boolean) as T[];
}
