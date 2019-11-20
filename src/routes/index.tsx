import useAuth from "@/auth/useAuth";
import ErrorBoundary from "@/components/errors/error-boundary";
import NotFound from "@/components/errors/not-found";
import SuspenseLoader from "@/components/suspense-loader";
import useRoutesByProfile, { RouterConstruct } from "@/hooks/useRoutesByProfile";
import History from "@/routes/history";
import React from "react";
import { HashRouter, Route, Router, Switch } from "react-router-dom";
//@ts-ignore
import ScrollMemory from "react-router-scroll-memory";

const createRoute = (x: RouterConstruct) => <Route exact key={x.path} path={x.path} component={x.component}></Route>;

const AppRouter = () => {
	useAuth();
	const routes = useRoutesByProfile();
	console.log("ROUTES", routes);
	return (
		<Router history={History}>
			<ErrorBoundary>
				<SuspenseLoader>
					<HashRouter>
						<ScrollMemory />
						<Switch>
							{routes.map(createRoute)}
							<Route component={NotFound} />
						</Switch>
					</HashRouter>
				</SuspenseLoader>
			</ErrorBoundary>
		</Router>
	);
};

export default AppRouter;
