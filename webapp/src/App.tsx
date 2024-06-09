import { useEffect } from "react";
import Home from "./components/Home";
import { useAuthContext } from "./contexts/AuthContext";

export default function App({}) {
	const { authenticate } = useAuthContext();

	useEffect(() => {
		authenticate();
	}, []);

	return (
		<>
			<Home />
		</>
	);
}
