import { useCallback, useState } from "react";

/**
 * Encapsulates UI state for the DronesList component.
 * Keeps presentational components simple and focused on rendering only.
 */
export default function useDronesListState() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState("drones");

    const handleShow = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleTab = useCallback((tab) => {
        setSelectedTab(tab);
    }, []);

    return { isOpen, selectedTab, handleShow, handleTab };
}


