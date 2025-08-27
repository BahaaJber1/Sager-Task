import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useState,
	useMemo,
} from "react";
import { io } from "socket.io-client";

import filterDronesByRegestration from "../utils/FilterDronesByRegestration";
import updateDronePaths from "../utils/UpdateDronePaths";

const DronesContext = createContext();

const initialState = {
	drones: [],
	status: "loading",
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				drones: [...state.drones, ...action.payload],
				status: "ready",
			};
		case "dataFailed":
			return { ...state, status: "error", error: action.payload };

		default:
			return state;
	}
}

function DronesProvider({ children }) {
	const [{ drones, status, error }, dispatch] = useReducer(
		reducer,
		initialState
	);
	const [dronePaths, setDronePaths] = useState({});

	const uniqueDrones = useMemo(
		() => filterDronesByRegestration(drones),
		[drones]
	);

	useEffect(() => {
		const socket = io("http://localhost:9013");

		socket.on("message", (data) => {
			dispatch({
				type: "dataReceived",
				payload: data.features,
			});
			setDronePaths((prev) => updateDronePaths(data.features, prev));
		});

		socket.on("connect_error", (err) => {
			dispatch({ type: "dataFailed", payload: err.message });
		});

		socket.on("error", (err) => {
			dispatch({ type: "dataFailed", payload: err.message });
		});

		return () => socket.disconnect();
	}, []);

	return (
		<DronesContext.Provider
			value={{
				drones,
				status,
				error,
				uniqueDrones,
				dronePaths,
			}}
		>
			{children}
		</DronesContext.Provider>
	);
}

function useDrones() {
	const context = useContext(DronesContext);
	if (context === undefined)
		throw new Error("The DroneContext was used outside DroneContextProvider");
	return context;
}

export { useDrones, DronesProvider };
