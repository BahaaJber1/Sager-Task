import {
	createContext,
	useContext,
} from "react";
import useDronesData from "./useDronesData";

const DronesContext = createContext();

/**
 * Provider exposing drone data and derived values to the app.
 * Internally delegates data fetching and state to useDronesData.
 */
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

/**
 * Access the drones context. Throws if used outside the provider.
 */
function useDrones() {
	const context = useContext(DronesContext);
	if (context === undefined)
		throw new Error("The DroneContext was used outside DroneContextProvider");
	return context;
}

export { useDrones, DronesProvider };
