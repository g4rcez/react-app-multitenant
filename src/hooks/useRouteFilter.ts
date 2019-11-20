import { useState, useEffect } from "react";
import { isEmpty } from "sidekicker/lib/comparable";
import MenuItems, { MenuItem, MenuSubItem } from "@/model/menu";
import { getAuthUser } from "@/auth/credentials-manager";

const routeEffect = (itens: MenuItem[]) => {
	const user = getAuthUser();
	if (isEmpty(user.perfil)) {
		return [];
	}

	const checkProfiles = (allowed: string[]) => allowed.some((y: string) => y === user.perfil);

	const filterSubItens = (sub: MenuSubItem) => checkProfiles(sub.allowedProfiles);

	const transformSubitems = (menu: MenuItem[]) =>
		menu.map((item) => ({
			...item,
			subItems: item.subItems.filter(filterSubItens)
		}));
	return transformSubitems(itens);
};

const useRouteFilter = () => {
	const [routes, setRoutes] = useState([] as MenuItem[]);
	useEffect(() => setRoutes(routeEffect(MenuItems)), []);
	return routes;
};

export default useRouteFilter;
