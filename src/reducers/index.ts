import { combineReducers } from "redux";
import authReducer, { TypeAuthReducer } from "@/auth/auth.reducer";
import { ReducersAlias } from "@/reducers/alias";

export type ReduxState = {
	[ReducersAlias.AuthReducer]: TypeAuthReducer;
	teste: TypeAuthReducer;
};

export default (asyncReducers: any = {}) =>
	combineReducers({
		[ReducersAlias.AuthReducer]: authReducer,
		...asyncReducers
	});
