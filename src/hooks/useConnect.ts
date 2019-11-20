import { ReduxState } from "@/reducers";
import { compose } from "ramda";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useCallback } from "react";
type State<T> = (_: ReduxState) => T;

const state = (fn: Function) =>
	createSelector(
		(_: ReduxState) => fn(_),
		(s) => s
	);

export type Dispatches<T> = { [P in keyof T]: any };

export default <T, S, P>(
	states: State<T>,
	dispatches: Dispatches<S>,
	props?: P,
	comparator = shallowEqual
): T & S & P => {
	const dispatch = useDispatch();

	const multiple = Object.entries(dispatches).reduce((acc, [fnName, fn]) => {
		const memoize = useCallback(compose(dispatch, fn as (params: unknown) => unknown), []);
		return { ...acc, [fnName]: memoize };
	}, {}) as { [key: string]: Function };

	const [reduxState, reduxDispatch] = [useSelector(state(states), comparator), multiple as Dispatches<S>];
	return { ...reduxState, ...reduxDispatch, ...props };
};
