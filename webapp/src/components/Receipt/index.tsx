export const Receipt = ({ receita }: any) => {
	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<img
				src={receita.picture}
				alt="Placeholder"
				className="w-full h-48 object-cover object-center"
			/>
			<div className="p-5">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{receita.titulo}
				</h5>
				<p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
					{receita.anoPublicacao}
				</p>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
					{receita.resumo}
				</p>
			</div>
		</div>
	);
};
