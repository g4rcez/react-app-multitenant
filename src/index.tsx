import "@/styles/css/index.css";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routes";
import store from "./store";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import reduxSaga from "redux-saga";
import sagasActions from "@/store/sagas";
import { Tenants, TENANT, VERSION, Colors } from "./utils";
import "antd/dist/antd.css";

const isDev = process.env.NODE_ENV === "development";

/*
	URL de acesso dos assets do frontend
*/
export const URL_ACCESS = `https://xpto-industries.io/${TENANT}/dashboard/${VERSION}/`;

// eslint-disable-next-line camelcase
export declare let __webpack_public_path__: string;

if (!isDev) {
	/*
		Define onde o webpack irá fazer o load dos `chunks` com dynamic import
	*/
	// eslint-disable-next-line camelcase
	__webpack_public_path__ = URL_ACCESS;
}

const element = document.getElementById("root") as HTMLElement;
element.style.backgroundColor = Colors.light;

/*
	Selecionando o <html> para atribuir variáveis e por utilizar no CSS.
	Neste caso, seria possível reescrever o stylesheet do antd para substituir
	todas as cores por `var(--colorName)` e teríamos um tema adaptado ao nosso
	padrão de cores
*/
const root: any = document.querySelector(":root");
Object.entries(Colors).forEach(([key, value]) => root.style.setProperty(`--${key}`, value));

const sagasMiddleware = reduxSaga();

const getMiddleware = () =>
	Tenants.XPTO === TENANT || process.env.NODE_ENV === "development"
		? applyMiddleware(sagasMiddleware, logger)
		: applyMiddleware(sagasMiddleware);

const reduxStore = store(getMiddleware());
sagasMiddleware.run(sagasActions);

ReactDOM.render(
	<StrictMode>
		<Provider store={reduxStore}>
			<AppRouter />
		</Provider>
	</StrictMode>,
	element
);
