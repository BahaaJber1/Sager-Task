import { useCallback, useState } from "react";

/**
 * Encapsulate UI state for the DronesList component
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


