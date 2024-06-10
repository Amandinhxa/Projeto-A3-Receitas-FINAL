import { useState } from "react";
import { ListReceipt } from "../ListReceipt";
import { useAuthContext } from "../../contexts/AuthContext";
import { User } from "../../types/User";
import ModalCreateAccount from "../Modal/ModalCreateAccount";
import ModalLogin from "../Modal/ModalLogin";

interface Props {}

export default function Home({}: Props) {
	const [loginObj, setLoginObj] = useState<Partial<User>>({});

	const { user, isAuthenticated, logout, login, createUser } = useAuthContext();

	const clearLoginObj = () => {
		setLoginObj({});
	};

	const handleLogin = async () => {
		login(loginObj.email || "", loginObj.senha || "");
		clearLoginObj();
		// @ts-ignore
		document.getElementById("modalLogin")?.close();
	};

	const handleCreateUser = async () => {
		createUser(loginObj);
		clearLoginObj();

		// @ts-ignore
		document.getElementById("modalCreateAccount")?.close();
	};

	return (
		<>
			<header className=" text-center p-4 bg-gray-800  shadow-md dark:bg-gray-900 dark:text-gray-200 flex justify-between items-center">
				<h3 className="text-3xl text-white">Receitas</h3>
				{user && isAuthenticated ? (
					<div className="flex items-center gap-4">
						<p>{user.nome}</p>
						<button className="btn btn-primary" onClick={() => logout()}>
							Logout
						</button>
					</div>
				) : (
					<div className="flex flex-row gap-2">
						<button
							className="btn btn-primary"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modalLogin")?.showModal();
							}}
						>
							Login
						</button>
						<button
							className="btn btn-primary"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modalCreateAccount")?.showModal();
							}}
						>
							Cadastrar
						</button>
					</div>
				)}
			</header>
			<main>
				<section>
					<ListReceipt />
				</section>
			</main>
			<ModalCreateAccount
				loginObj={loginObj}
				setLoginObj={setLoginObj}
				handleCreateUser={handleCreateUser}
			/>
			<ModalLogin
				loginObj={loginObj}
				setLoginObj={setLoginObj}
				handleLogin={handleLogin}
			/>
		</>
	);
}
