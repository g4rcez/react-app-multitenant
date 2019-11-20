import { getAuthUser } from "@/auth/credentials-manager";
import MenuItems, { MenuItem, MenuSubItem } from "@/model/menu";
import React, { lazy, useEffect, useState } from "react";
import { isEmpty } from "sidekicker/lib/comparable";
import useRouteFilter from "./useRouteFilter";
import { TENANT } from "@/utils";
export type RouterConstruct = { component: React.LazyExoticComponent<React.ComponentType<any>>; path: string };

const path = (tenant: string) => `/${tenant}/`;

const getComponentInfo = (item: MenuSubItem, aliasProfile: string) => {
	if (!!item.component) {
		const localImport = item.component(aliasProfile, path(TENANT));
		return { path: item.path, component: lazy(() => localImport) };
	}
	return null;
};

const getProfileRoutes = (filterRoutes: MenuItem[], aliasProfile: string) => {
	const localRoutes = [] as RouterConstruct[];
	filterRoutes.forEach((route) => {
		const component = getComponentInfo(route, aliasProfile);
		if (route.path !== "" && component !== null) {
			localRoutes.push(component);
		}
		route.subItems.forEach((subRoute) => {
			const subComponent = getComponentInfo(subRoute, aliasProfile);
			if (subComponent !== null) {
				localRoutes.push(subComponent);
			}
		});
	});
	return localRoutes;
};

const useRoutesByProfile = () => {
	const filterRoutes = useRouteFilter();
	const [routes, setRoutes] = useState([] as RouterConstruct[]);
	useEffect(() => {
		const user = getAuthUser();
		if (!isEmpty(user)) {
			setRoutes(getProfileRoutes(MenuItems, user.perfil));
		}
	}, [filterRoutes]);
	return routes;
};

export default useRoutesByProfile;
