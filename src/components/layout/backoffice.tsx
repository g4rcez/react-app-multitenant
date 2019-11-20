import useRouteFilter from "@/hooks/useRouteFilter";
import { MenuItem } from "@/model/menu";
import { Colors, TENANT, VERSION } from "@/utils";
import { Icon, Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "sidekicker/lib/comparable";
import { CSS } from "@/types";

const { Header, Content, Sider } = Layout;

const styles: CSS = {
	logo: {
		padding: "1rem",
		flex: 1,
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "center"
	},
	logoImage: { flex: 2, width: "100%" },
	page: { backgroundColor: Colors.light },
	header: { background: Colors.light, padding: 0 },
	inside: { marginLeft: 200, backgroundColor: Colors.light },
	sider: { overflow: "auto", height: "100vh", position: "fixed", left: 0 },
	version: { color: Colors.light, fontSize: "0.75rem", textAlign: "center" },
	container: { padding: 24, textAlign: "center", marginBottom: "1.5rem", background: Colors.light }
};

const menuRemap = (x: MenuItem) => {
	if (isEmpty(x.subItems)) {
		return (
			<Menu.Item key={x.key}>
				<Link to={x.path!}>
					<Icon type={x.icon} />
					<span className="nav-text">{x.title}</span>
				</Link>
			</Menu.Item>
		);
	}
	return (
		<SubMenu
			key={x.key}
			title={
				<span>
					<Icon type={x.icon} />
					<span>{x.title}</span>
				</span>
			}
		>
			{x.subItems.map((y) => (
				<Menu.Item key={y.key}>
					<Link to={y.path!}>
						<Icon type={y.icon} />
						<span className="nav-text">{y.title}</span>
					</Link>
				</Menu.Item>
			))}
		</SubMenu>
	);
};

type Props = {
	children: React.ReactNode;
	menuItem: string;
	title: string;
};

const BackOffice = ({ title, menuItem, children }: Props) => {
	const filteredMenu = useRouteFilter();
	useEffect(() => {
		document.title = `${TENANT} - ${title}`;
	}, [title]);

	return (
		<Layout style={styles.page}>
			<Sider style={styles.sider}>
				<div style={styles.logo}>
					<p style={styles.version}>Versão: {VERSION}</p>
				</div>
				<Menu theme="dark" mode="inline" focusable selectable defaultSelectedKeys={[menuItem]} inlineIndent={8}>
					{filteredMenu.map(menuRemap)}
				</Menu>
			</Sider>
			<Layout style={styles.inside}>
				<Header style={styles.header} />
				<Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
					<div style={styles.container}>{children}</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default BackOffice;
