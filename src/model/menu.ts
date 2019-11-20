import { Links } from "@/routes/links";
import { Tenants, TENANT, Profile } from "@/utils";

export type MenuItem = {
	component?: (profile: string, tenant?: string) => Promise<any>;
	key: string;
	path: string;
	icon: string;
	title: string;
	tenants: string[];
	subItems: MenuSubItem[];
	tenantEnv?: string;
	allowedProfiles: string[];
};

export type MenuSubItem = Omit<MenuItem, "subItems">;

const FullMenu: MenuItem[] = [
	{
		tenants: [Tenants.ABCD, Tenants.XKCB, Tenants.XPTO],
		title: "Dashboard",
		key: "root",
		path: Links.root,
		icon: "home",
		allowedProfiles: [Profile.COMPANY, Profile.ADMIN],
		subItems: [],
		component: (profile: string, tenant: string = "/") => import(`../modules/dashboard${tenant}${profile}.page`)
	},
	{
		tenants: [Tenants.XPTO],
		path: "",
		title: "Users",
		key: "admin",
		icon: "usergroup-add",
		allowedProfiles: [Profile.ADMIN],
		subItems: [
			{
				tenants: [Tenants.XPTO],
				title: "Search user",
				key: "adminUsers",
				path: Links.adminUsers,
				icon: "user",
				allowedProfiles: [Profile.ADMIN],
				component: () => import(`../modules/users/index.page`)
			}
		]
	}
];

const MenuItems = FullMenu.map((x) => {
	const subItems = (x.subItems || []).filter((sub) => sub.tenants.includes(TENANT));
	return { ...x, subItems };
}).filter((x) => x.tenants.includes(TENANT));

export default MenuItems;
