import redux from "@/reducers";
import { createStore, Reducer, StoreEnhancer, Store, AnyAction } from "redux";

type Middleware = StoreEnhancer<
	{
		dispatch: unknown;
	},
	{}
>;

export type AsyncStore = Store<unknown, AnyAction> & {
	dispatch: unknown;
} & {
	asyncReducers: {
		[key: string]: Reducer<unknown, any>;
	};
	injectReducer: (key: string, reducer: Reducer<any>) => AsyncStore;
};

const initializeStore = (middleware: Middleware) => {
	const store = createStore(redux(), middleware) as AsyncStore;

	store.asyncReducers = {};

	store.injectReducer = (key: string, reducer: Reducer<unknown, any>) => {
		store.asyncReducers[key] = reducer;
		store.replaceReducer(redux(store.asyncReducers));
		return store;
	};

	return store;
};

export default initializeStore;
