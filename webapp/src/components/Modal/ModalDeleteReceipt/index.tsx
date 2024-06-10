interface Props {
	id: number;
	handleDelete: (id: number) => void;
}
export default function DeleteReceiptModal({ id, handleDelete }: Props) {
	return (
		<dialog
			id="modalDeleteReceipt"
			className="modal modal-bottom sm:modal-middle"
		>
			<div className="modal-box">
				<div className="flex flex-row justify-between items-center py-2">
					<h3 className="font-bold text-lg">
						Você tem certeza que deseja deletar essa receita?
					</h3>
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost">✕</button>
					</form>
				</div>
				<div className="modal-content">
					<p>Essa ação não pode ser desfeita.</p>
					<div className="flex flex-col gap-4">
						<div className="form-control">
							<div className="modal-action">
								<button
									className="btn btn-primary"
									onClick={() => {
										handleDelete(id);
									}}
								>
									Deletar
								</button>
								<button
									className="btn btn-primary"
									onClick={() => {
										// @ts-ignore
										document.getElementById("modalDeleteReceipt")?.close();
									}}
								>
									Cancelar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
}
