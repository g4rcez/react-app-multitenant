import useConnect from "@/hooks/useConnect";
import { ReduxState } from "@/reducers";
import { ReducersAlias } from "@/reducers/alias";
import React, { Suspense } from "react";
import BackOffice from "../layout/backoffice";

const Load = () => (
	<div className="pa5 mt7 tc center">
		<div className="mt2">Carregando...</div>
	</div>
);

const stateToProps = (_: ReduxState) => ({
	isAuth: _[ReducersAlias.AuthReducer].isAuth
});

const NotFound = ({ children }: any) => {
	const props = useConnect(stateToProps, {});
	if (props.isAuth) {
		return (
			<BackOffice menuItem="" title="Carregando...">
				<Load />
			</BackOffice>
		);
	}
	return <Suspense fallback={<Load />}>{children}</Suspense>;
};

export default NotFound;
