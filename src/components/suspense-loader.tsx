import useConnect from "@/hooks/useConnect";
import { ReduxState } from "@/reducers";
import { ReducersAlias } from "@/reducers/alias";
import React, { Suspense } from "react";
import BackOffice from "./layout/backoffice";

const Load = () => <div className="tc center">Carregando...</div>;

const stateToProps = (_: ReduxState) => ({
	isAuth: _[ReducersAlias.AuthReducer].isAuth
});

const SuspenseLoader = ({ children }: any) => {
	const props = useConnect(stateToProps, {});
	if (props.isAuth) {
		return (
			<Suspense
				fallback={
					<BackOffice menuItem="" title="Carregando...">
						<Load />
					</BackOffice>
				}
			>
				{children}
			</Suspense>
		);
	}
	return <Suspense fallback={<Load />}>{children}</Suspense>;
};

export default SuspenseLoader;
