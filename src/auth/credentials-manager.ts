import AuthUser from "@/model/auth-user";
import { Profile } from "@/utils";
import jwtDecode from "jwt-decode";
import { isEmpty } from "ramda";
import { Cookie, SessionStorage } from "storage-manager-js";

export const authToken = "_authToken";
export const cookieManager = new Cookie();
export const sessionManager = new SessionStorage();

export const setAuthToken = (token: string) => cookieManager.set(authToken, token);

export const getAuthToken = () => {
	const token = cookieManager.get(authToken) || "";
	return !isEmpty(token) ? token : "";
};

export const getAuthUser = (): AuthUser => {
	const user = getAuthToken();
	return isEmpty(user) ? ({} as AuthUser) : jwtDecode(user);
};

export const hasToken = () => isEmpty(getAuthToken());

export const clearData = () => {
	cookieManager.clear();
	sessionManager.clear();
};

export const allowedProfilesInBackOffice = [Profile.ADMIN, Profile.COMPANY];

export const hasProfileAuthorized = (profiles: string = "") =>
	allowedProfilesInBackOffice.some((x) => profiles.includes(x));
