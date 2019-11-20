export default class AuthUser {
	public email: string;
	public exp: number;
	public iat: number;
	public iss: string;
	public jti: string;
	public nome: string;
	public perfil: string;
	public sub: string;

	constructor(props: Partial<AuthUser>) {
		this.email = props.email || "";
		this.exp = props.exp || 0;
		this.iat = props.iat || 0;
		this.iss = props.iss || "";
		this.jti = props.jti || "";
		this.nome = props.nome || "";
		this.perfil = props.perfil || "";
		this.sub = props.sub || "";
	}
}
