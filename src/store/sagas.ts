import { authActions } from "@/auth/auth.reducer";
import { all, SimpleEffect, ForkEffectDescriptor } from "redux-saga/effects";

type Exec = () => Generator<SimpleEffect<"FORK", ForkEffectDescriptor<never>>, void, unknown>;

const exec = (...args: Exec[]) => args.map((x) => x());
export default function* sagas() {
	yield all(exec(authActions));
}
