type Action = {
	// tslint:disable-next-line: no-reserved-keywords
	readonly type: string;
	readonly [key: string]: any;
};
export type State = { readonly [key: string]: any } & Object;
type Cases<T> = {
	[key: string]: (state: T, action: any) => any;
};
const possibleErrors = (initialState: State, cases: Cases<any>) => {
	// eslint-disable-next-line no-undefined
	if (initialState === undefined) {
		throw new Error("initialState should not be undefined");
	}
	if (Object.prototype.toString.call(cases) !== "[object Object]") {
		throw new Error("CreateReducer expects the second argument as an object representing reducer");
	}
};

const createReducer = <T>(initialState: State, cases: Cases<T> & Object) => {
	possibleErrors(initialState, cases);
	return (state: State = initialState, action: Action): State => {
		if (cases.hasOwnProperty(action.type)) {
			return cases[action.type](state as T, action);
		}
		return state;
	};
};

export default createReducer;
