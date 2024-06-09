import { ReceitaUser } from "./ReceitaUser";

export type Receita = {
	id_receita: number;
	anoPublicacao: number;
	titulo: string;
	resumo: string;
	receitaUser: ReceitaUser[];
};
