import { createContext, useContext, useReducer, useEffect } from "react";
import { io } from "socket.io-client";

const DroneContext = createContext();

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

function DroneProvider({ children }) {
	const [{ drones, status, error }, dispatch] = useReducer(
		reducer,
		initialState
	);
	const numDrones = drones.length;

	useEffect(() => {
		const socket = io("http://localhost:9013");

		socket.on("message", (data) => {
			dispatch({
				type: "dataReceived",
				payload: data.features,
			});
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
		<DroneContext.Provider
			value={{
				drones,
				status,
				error,
				numDrones,
			}}
		>
			{children}
		</DroneContext.Provider>
	);
}

function useDrone() {
	const context = useContext(DroneContext);
	if (context === undefined)
		throw new Error("The DroneContext was used outside DroneContextProvider");
	return context;
}

export { useDrone, DroneProvider };
