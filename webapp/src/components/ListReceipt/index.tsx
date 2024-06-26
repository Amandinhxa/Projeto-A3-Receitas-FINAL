import { useEffect } from "react";
import { useState } from "react";
import { Receipt } from "../Receipt";
import axios from "axios";
import { Receita } from "../../types/Receita";
import { useAuthContext } from "../../contexts/AuthContext";

export const ListReceipt = () => {
	const [receipts, setReceipts] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [receiptObj, setReceiptObj] = useState({
		titulo: "",
		resumo: "",
		anoPublicacao: new Date().getFullYear(),
		picture: "",
	});
	const [picture, setPicture] = useState<File | null>(null);

	const { user, isAuthenticated } = useAuthContext();

	const uploadPicture = async () => {
		const formData = new FormData();
		formData.append("file", picture as File);
		const url = axios
			.post("http://localhost:3000/receitas/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				return response.data.url;
			})
			.catch((error) => {
				console.error(error);
				throw error;
			});

		return url;
	};

	const createReceipt = async () => {
		const picture = await uploadPicture();
		console.log(picture);
		axios
			.post("http://localhost:3000/receitas", {
				...receiptObj,
				userId: user?.id_user,
				picture,
			})
			.then((response) => {
				setReceipts([...receipts, response.data]);
			});
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/receitas/${id}`);
			setReceipts(receipts.filter((receipt: Receita) => receipt.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		axios
			.get("http://localhost:3000/receitas")
			.then((response) => {
				setReceipts(response.data);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const ModalCreateReceipt = () => {
		return (
			<dialog id="modalReceipt" className="modal modal-bottom sm:modal-middle">
				<div className="p-4 bg-base-200 rounded-sm">
					<div className="flex flex-row justify-between items-center py-2">
						<h3 className="font-bold text-2xl">Crie sua receita!</h3>
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost">✕</button>
						</form>
					</div>
					<div className="modal-content">
						<div className="flex flex-col gap-4">
							<div className="form-control">
								<div className="label">
									<span className="label-text">Imagem</span>
								</div>
								<input
									type="file"
									className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
									onChange={(e) => setPicture(e.target.files?.[0] || null)}
								/>
							</div>
							<div className="form-control">
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text">Titulo da receita</span>
									</div>
									<input
										type="text"
										placeholder="Escreva aqui o titulo da receita"
										className="input input-bordered w-full"
										onChange={(e) =>
											setReceiptObj({ ...receiptObj, titulo: e.target.value })
										}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="form-control w-full">
									<div className="label">
										<span className="label-text">Resumo da receita</span>
									</div>
									<textarea
										className="textarea w-full"
										placeholder="Resumo"
										onChange={(e) =>
											setReceiptObj({ ...receiptObj, resumo: e.target.value })
										}
									></textarea>
								</label>
							</div>
							<div className="form-control"></div>
							<button
								className="btn btn-dark"
								onClick={() => {
									createReceipt();
									// @ts-ignore
									document.getElementById("modalReceipt")?.close();
								}}
							>
								Criar
							</button>
						</div>
					</div>
				</div>
			</dialog>
		);
	};

	if (loading)
		return (
			<div className="text-center p-4 h-screen">
				<p>Carregando...</p>
			</div>
		);

	return (
		<div className="h-screen">
			{isAuthenticated && user && (
				<>
					<div className="flex flex-row items-center justify-between gap-4 p-4 text-white">
						<p>Crie uma nova receita clicando no botão "Nova Receita"</p>
						<button
							className="px-4 py-2 rounded-md border-white border-2"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modalReceipt")?.showModal();
							}}
						>
							Nova Receita
						</button>
						{ModalCreateReceipt()}
					</div>
				</>
			)}
			{receipts.length === 0 && !loading && (
				<div className="text-center p-4 text-white">
					<p>Nenhuma receita encontrada</p>
				</div>
			)}
			<div className="grid grid-cols-3 gap-4 rounded-box p-4">
				{receipts.map((receita: Receita) => (
					<Receipt receita={receita} handleDelete={handleDelete} />
				))}
			</div>
		</div>
	);
};
