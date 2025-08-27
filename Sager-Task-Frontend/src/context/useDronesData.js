import { useEffect, useMemo, useReducer, useState } from "react";
import { io } from "socket.io-client";

import filterDronesByRegestration from "../features/map/utils/filterDronesByRegestration";
import updateDronePaths from "../features/map/utils/UpdateDronePaths";

/**
 * Centralized data source for drones.
 * - Opens a socket connection and streams incoming drone features
 * - Maintains accumulated list of drones and derived unique list
 * - Computes and stores per-registration flight paths
 *
 * Returns immutable view-model values for consumers (context/components).
 */
const initialState = {
    drones: [],
    status: "loading",
    error: "",
};

/**
 * Reducer for incoming socket data and error handling.
 */
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

/**
 * Hook that manages drone data lifecycle and derivations.
 * @returns {{drones: Array, status: string, error: string, uniqueDrones: Array, dronePaths: Record<string, number[][]>}}
 */
function useDronesData() {
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

    return {
        drones,
        status,
        error,
        uniqueDrones,
        dronePaths,
    };
}

export default useDronesData;


