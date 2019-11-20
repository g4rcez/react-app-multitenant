import createReducer from "@/reducers/createReducer";
import { AuthTypes } from "./auth.types";
import { select, put, takeEvery } from "redux-saga/effects";
import { Action } from "redux";
import { setAuthToken, getAuthUser, getAuthToken, hasToken } from "./credentials-manager";
import AuthUser from "@/model/auth-user";
import { Maybe } from "@/types";
import { ReduxState } from "@/reducers";
import { ReducersAlias } from "@/reducers/alias";
import { Fetch } from "@/utils";

type createSessionParameters = { token: string };

type successLoginPayload = { user: AuthUser; token: string };

export const createSession = (token: string) => ({ type: AuthTypes.Login, token });

function* createSessionSagas(action: Action & createSessionParameters) {
	const { token } = action;
	const [stateUser] = yield select((_: ReduxState) => [_[ReducersAlias.AuthReducer].user]);
	window.history.replaceState({}, document.title, "/#");

	if (token !== "" && stateUser !== null && token === getAuthToken()) {
		// Não precisa de atualização
		return;
	}

	setAuthToken(token);
	const user = getAuthUser();

	/*
		Usuário sem nenhum request necessário para a autenticação
	*/
	yield put({ type: AuthTypes.Success, token, user });
}

export function* authActions() {
	yield takeEvery(AuthTypes.Login, createSessionSagas);
}

export const AuthReducerInitialState = {
	user: getAuthUser() as Maybe<AuthUser>,
	token: getAuthToken() as Maybe<string>,
	isAuth: hasToken()
};

export type TypeAuthReducer = typeof AuthReducerInitialState;

const authReducer = createReducer(AuthReducerInitialState, {
	[AuthTypes.Success]: (state: TypeAuthReducer, action: successLoginPayload) => ({
		...state,
		token: action.token,
		user: action.user,
		isAuth: true
	})
});

export default authReducer;
