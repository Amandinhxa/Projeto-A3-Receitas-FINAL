interface Props {}
export default function Footer({}: Props) {
	return (
		<footer className="text-center p-4 bg-white shadow-md">
			<h3 className="text-3xl">Degusta Saveur</h3>
			<p className="text-sm">
				© 2024 Degusta Saveur. Todos os direitos reservados.
			</p>
		</footer>
	);
}
