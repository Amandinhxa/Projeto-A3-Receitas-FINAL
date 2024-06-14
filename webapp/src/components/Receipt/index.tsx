import { Receita } from "../../types/Receita";
import DeleteReceiptModal from "../Modal/ModalDeleteReceipt";

interface Props {
	receita: Receita;
	handleDelete: (id: number) => void;
}

export const Receipt = ({ receita, handleDelete }: Props) => {
	return (
		<>
			<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
				<img
					src={receita.picture}
					alt="Placeholder"
					className="w-full h-48 object-cover object-center"
				/>
				<div className="p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800">
						{receita.titulo}
					</h5>
					<p className="mb-2 text-sm font-medium dark:text-gray-700">
						{receita.anoPublicacao}
					</p>
					<p className="mb-3 font-normal dark:text-gray-600 break-words">
						{receita.resumo}
					</p>
				</div>
				<button
					onClick={() => {
						// @ts-ignore
						document.getElementById("modalDeleteReceipt")?.showModal();
					}}
					className="absolute top-2 right-2 p-2 bg-red-800 rounded-full text-white"
				>
					x
				</button>
			</div>
			<DeleteReceiptModal id={receita.id} handleDelete={handleDelete} />
		</>
	);
};
