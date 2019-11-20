import { isEmpty } from "sidekicker/lib/comparable";

const skelReducer = <T>(reducer: Object, skel = {}): T => (isEmpty(reducer) ? skel : reducer) as T;

export default skelReducer;
