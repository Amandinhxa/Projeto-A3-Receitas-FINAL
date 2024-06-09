import { createContext, useContext, useState } from "react";
import { User, UserSaved } from "../types/User";
import * as jose from "jose";
import axios from "axios";

export type AuthContextType = {
	user: UserSaved | null;
	setUser: (user: UserSaved) => void;
	login: (email: string, senha: string) => void;
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	authenticate: () => void;
	logout: () => void;
	createUser: (user: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<UserSaved | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const login = (email: string, senha: string) => {
		axios
			.post("http://localhost:3000/auth/login", {
				email: email,
				senha: senha,
			})
			.then((response) => {
				localStorage.setItem("token", response.data.access_token);

				const token = jose.decodeJwt(response.data.access_token);
				console.log(token)
				const user: UserSaved = {
					email: token.username as string,
					id_user: Number(token.sub),
					nome: token.nome as string,
				};

				setIsAuthenticated(true);
				setUser(user);
			});
	};

	const authenticate = () => {
		const token = localStorage.getItem("token");
		if (!token) return;

		const decodedToken = jose.decodeJwt(token as string);

		const user: UserSaved = {
			email: decodedToken.username as string,
			id_user: Number(decodedToken.sub),
			nome: decodedToken.nome as string,
		};

		setIsAuthenticated(true);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		setUser(null);
	};

	const createUser = (user: Partial<User>) => {
		axios.post("http://localhost:3000/user", user).then(() => {
			login(user.email as string, user.senha as string);
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user: user,
				setUser: setUser,
				login: login,
				isAuthenticated: isAuthenticated,
				setIsAuthenticated: setIsAuthenticated,
				authenticate: authenticate,
				logout: logout,
				createUser: createUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuthContext };
