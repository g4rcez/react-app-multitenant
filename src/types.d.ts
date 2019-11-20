/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: "development" | "production" | "test";
		readonly PUBLIC_URL: string;
	}
}

declare module "*.bmp" {
	const src: string;
	export default src;
}

declare module "*.gif" {
	const src: string;
	export default src;
}

declare module "*.jpg" {
	const src: string;
	export default src;
}

declare module "*.jpeg" {
	const src: string;
	export default src;
}

declare module "*.png" {
	const src: string;
	export default src;
}

declare module "*.webp" {
	const src: string;
	export default src;
}

declare module "*.svg" {
	import * as React from "react";

	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

	const src: string;
	export default src;
}

declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.module.scss" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.module.sass" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

export type Maybe<T> = T | null;

declare global {
	interface Window {
		$__CONFIG__: {
			tenant: string;
			version: string;
			theme: {
				primary: string;
				secondary: string;
				info: string;
				warn: string;
				danger: string;
				success: string;
				dark: string;
				light: string;
				disabled: string;
			};
		};
	}
}

export type CSS = {
	[key: string]: CSSProperties;
};
