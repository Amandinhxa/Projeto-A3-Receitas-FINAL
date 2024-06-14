import { useEffect } from "react";
import { useAuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { ListReceipt } from "./components/ListReceipt";
import { useState } from "react";
import { User } from "../src/types/User";
import ModalCreateAccount from "../src/components/Modal/ModalCreateAccount";
import ModalLogin from "../src/components/Modal/ModalLogin";
import Footer from "./components/Footer";

export default function App({}) {
	const { authenticate } = useAuthContext();

	useEffect(() => {
		authenticate();
	}, []);

	const [loginObj, setLoginObj] = useState<Partial<User>>({});

	const { login, createUser } = useAuthContext();

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
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/menu" element={<ListReceipt />} />
			</Routes>
			<Footer />
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
