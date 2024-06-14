interface Props {}

export default function Home({}: Props) {
	return (
		<>
			<main className="text-white font-serif bg-bgMain bg-cover h-screen w-full bg-center flex flex-col justify-around">
				<h1 className="text-6xl text-center">Faça uma de nossas receitas</h1>
				<h3 className="text-2xl text-center">A sua refeição!</h3>
			</main>
		</>
	);
}
