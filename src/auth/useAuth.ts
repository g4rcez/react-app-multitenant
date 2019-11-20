import { createSession } from "@/auth/auth.reducer";
import useConnect from "@/hooks/useConnect";
import AuthUser from "@/model/auth-user";
import { Maybe } from "@/types";
import { ReduxState } from "@/reducers";
import { ReducersAlias } from "@/reducers/alias";
import History from "@/routes/history";
import { Links } from "@/routes/links";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { urlParameters } from "sidekicker/lib/strings/Url";
import { clearData, getAuthToken, getAuthUser, hasProfileAuthorized } from "./credentials-manager";

type typeStateToProps = { token: Maybe<string> };

const stateToProps = (_: ReduxState) => ({
	token: _[ReducersAlias.AuthReducer].token
});

const dispatches = { createSession };

/*
 * Verifica se o token recebido via URL ou Cookie é válido
 */
const checkToken = ({ urlToken, cookieToken }: { readonly urlToken: string; readonly cookieToken: string }) => {
	const nulls = [urlToken, cookieToken].filter(Boolean);
	if (nulls.length === 0) {
		return { token: "", valid: false };
	}
	const token = urlToken || cookieToken || "";
	const credentials: AuthUser = jwtDecode(token);
	return { token, valid: hasProfileAuthorized(credentials.perfil) };
};

const clearHash = (route: string = "") => route.replace(/#\/\S+\/\S+\/?$/gi, "").replace(/\/?$/gi, "");

const logout = () => {
	clearData();
	window.location.href = Links.externalLogin;
};

const useAuth = () => {
	const { token, createSession: createSessionHook } = useConnect<typeStateToProps, typeof dispatches, {}>(
		stateToProps,
		dispatches
	);

	useEffect(() => {
		const url = window.location.href || "";
		let urlToken = "";
		try {
			const cookieToken: string = clearHash(getAuthToken());
			const query: any = urlParameters(clearHash(url) || "") || "";
			urlToken = query.authToken || "";
			if (!!urlToken || !!cookieToken) {
				const ok = checkToken({ urlToken, cookieToken });
				if (ok.valid && ok.token) {
					createSessionHook(ok.token);
				} else {
					History.push(Links.notAuthorized);
				}
			}
		} catch (e) {
			History.push(Links.notAuthorized);
		}
	}, [token, createSessionHook]);
};

export default useAuth;
