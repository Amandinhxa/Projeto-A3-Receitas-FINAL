import { ReceitaUser } from "./ReceitaUser";

export type User = {
	id_user: number;
	nome: string;
	email: string;
	senha: string;
	receitaUser: ReceitaUser[];
};

export type UserSaved = {
	id_user: number;
	nome: string;
	email: string;
};
