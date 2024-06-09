import { useState } from "react";
import { ListReceipt } from "../ListReceipt";
import { useAuthContext } from "../../contexts/AuthContext";
import { User } from "../../types/User";

interface Props {}

export default function Home({}: Props) {
	const [loginObj, setLoginObj] = useState<Partial<User>>({
		email: "",
		senha: "",
		nome: "",
	});

	const { login, user, isAuthenticated, logout, createUser } = useAuthContext();

	return (
		<>
			<header className=" text-center p-4 bg-gray-800  shadow-md dark:bg-gray-900 dark:text-gray-200 flex justify-between items-center">
				<h3 className="text-3xl text-white">Receitas</h3>
				{!user && !isAuthenticated && (
					<div className="flex flex-row gap-2">
						<button
							className="btn btn-primary"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modal")?.showModal();
							}}
						>
							Login
						</button>
						<button
							className="btn btn-primary"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modalCreate")?.showModal();
							}}
						>
							Cadastrar
						</button>
					</div>
				)}
				{user && isAuthenticated && (
					<div className="flex items-center gap-4">
						<p>{user.nome}</p>
						<button className="btn btn-primary" onClick={() => logout()}>
							Logout
						</button>
					</div>
				)}
			</header>
			<main>
				<section>
					<ListReceipt />
				</section>
			</main>
			<footer></footer>
			<dialog id="modalCreate" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<div className="flex flex-row justify-between items-center py-2">
						<h3 className="font-bold text-lg">Faça seu cadastro!</h3>
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost">✕</button>
						</form>
					</div>
					<div className="modal-content">
						<div className="flex flex-col gap-4">
							<div className="form-control">
								<label className="input input-bordered flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="w-4 h-4 opacity-70"
									>
										<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
									</svg>
									<input
										type="text"
										className="grow"
										placeholder="Nome"
										onChange={(e) =>
											setLoginObj({ ...loginObj, nome: e.target.value })
										}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input input-bordered flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="w-4 h-4 opacity-70"
									>
										<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
										<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
									</svg>
									<input
										type="text"
										className="grow"
										placeholder="Email"
										onChange={(e) =>
											setLoginObj({ ...loginObj, email: e.target.value })
										}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input input-bordered flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="w-4 h-4 opacity-70"
									>
										<path
											fillRule="evenodd"
											d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
											clipRule="evenodd"
										/>
									</svg>
									<input
										type="password"
										className="grow"
										placeholder="Senha"
										onChange={(e) =>
											setLoginObj({ ...loginObj, senha: e.target.value })
										}
									/>
								</label>
							</div>
							<button
								className="btn"
								onClick={() => {
									createUser(loginObj);
									// @ts-ignore
									document.getElementById("modalCreate")?.close();
								}}
							>
								Cadastrar
							</button>
						</div>
					</div>
				</div>
			</dialog>
			<dialog id="modal" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<div className="flex flex-row justify-between items-center py-2">
						<h3 className="font-bold text-lg">Faça seu login!</h3>
						<form method="dialog">
							<button className="btn btn-sm btn-circle btn-ghost">✕</button>
						</form>
					</div>
					<div className="modal-content">
						<div className="flex flex-col gap-4">
							<div className="form-control">
								<label className="input input-bordered flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="w-4 h-4 opacity-70"
									>
										<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
										<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
									</svg>
									<input
										type="text"
										className="grow"
										placeholder="Email"
										onChange={(e) =>
											setLoginObj({ ...loginObj, email: e.target.value })
										}
									/>
								</label>
							</div>
							<div className="form-control">
								<label className="input input-bordered flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="w-4 h-4 opacity-70"
									>
										<path
											fillRule="evenodd"
											d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
											clipRule="evenodd"
										/>
									</svg>
									<input
										type="password"
										className="grow"
										placeholder="Senha"
										onChange={(e) =>
											setLoginObj({ ...loginObj, senha: e.target.value })
										}
									/>
								</label>
							</div>
							<button
								className="btn"
								onClick={() => {
									login(loginObj.email || "", loginObj.senha || "");
									// @ts-ignore
									document.getElementById("modalCreate")?.close();
								}}
							>
								Login
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
