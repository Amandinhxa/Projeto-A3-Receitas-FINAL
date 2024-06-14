import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

interface Props {}

export default function Header({}: Props) {
	const { user, isAuthenticated, logout } = useAuthContext();

	return (
		<header className="text-center p-4 bg-white shadow-md flex justify-between items-center">
			<h3 className="text-3xl">Degusta Saveur</h3>
			<div className="flex flex-row gap-8">
				<NavLink
					to="/"
					className={({ isActive }) =>
						isActive ? "font-bold text-gray-800" : "text-gray-800"
					}
				>
					Home
				</NavLink>
				<NavLink
					to="/menu"
					className={({ isActive }) =>
						isActive ? "font-bold text-gray-800" : "text-gray-800"
					}
				>
					Menu
				</NavLink>
			</div>
			<div className="flex flex-row gap-2">
				{user && isAuthenticated ? (
					<div className="flex items-center gap-4">
						<p>{user.nome}</p>
						<button className="btn btn-dark" onClick={() => logout()}>
							Logout
						</button>
					</div>
				) : (
					<div className="flex flex-row gap-2">
						<button
							className="btn btn-dark"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modalLogin")?.showModal();
							}}
						>
							Login
						</button>
						<button
							className="btn btn-dark"
							onClick={() => {
								// @ts-ignore
								document.getElementById("modalCreateAccount")?.showModal();
							}}
						>
							Cadastrar
						</button>
					</div>
				)}
			</div>
		</header>
	);
}
