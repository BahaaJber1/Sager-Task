import {
	createContext,
	useContext,
} from "react";
import useDronesData from "./useDronesData";

const DronesContext = createContext();

function DronesProvider({ children }) {
	const { drones, status, error, uniqueDrones, dronePaths } = useDronesData();

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
