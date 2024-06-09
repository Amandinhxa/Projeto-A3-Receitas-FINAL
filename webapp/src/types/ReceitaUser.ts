import { Receita } from "./Receita";
import { User } from "./User";

export type ReceitaUser = {
	userId: number;
	receitaId: number;
	proprietario: boolean;
	receita: Receita;
	user: User;
};