import React from "react";
import BackOffice from "../layout/backoffice";

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.log("DEU MERDA AÍ CARA", errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<BackOffice menuItem="" title="Nada encontrado">
					<h1>Ops...nada encontrado</h1>
				</BackOffice>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
