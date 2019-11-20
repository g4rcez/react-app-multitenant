import { useEffect } from "react";
import { Reducer } from "redux";
import { useStore } from "react-redux";
import { AsyncStore } from "@/store";

const useInjectReducer = (key: string, reducer: Reducer<any>) => {
	const store = useStore() as AsyncStore;

	useEffect(() => {
		store.injectReducer(key, reducer);
	}, []);
};

export default useInjectReducer;
