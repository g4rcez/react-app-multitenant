import axios from "axios";

export const Tenants = {
	XPTO: "xpto",
	ABCD: "abcd",
	XKCB: "xkcb"
};

export const Profile = {
	ADMIN: "admin",
	COMPANY: "company"
};

export const Fetch = axios.create({
	timeout: 10000,
	maxRedirects: 2
});

export const TENANT = window.$__CONFIG__.tenant;
export const VERSION = window.$__CONFIG__.version;
export const Colors = window.$__CONFIG__.theme;
