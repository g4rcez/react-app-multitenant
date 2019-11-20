import BackOffice from "@/components/layout/backoffice";
import React from "react";
import { Table } from "antd";

const columns = [
	{
		title: "Name",
		key: "name",
		dataIndex: "name"
	}
];

const DashboardAdmin = () => {
	return (
		<BackOffice menuItem="root" title="Página principal">
			<h1>View Users</h1>
			<h2>Available only in XPTO Tenant</h2>
			<Table columns={columns} dataSource={[]}></Table>
		</BackOffice>
	);
};

export default DashboardAdmin;
