import { useMemo } from "react";

export default function useHeaderMenuItems() {
    return useMemo(
        () => [
            { key: "capture", icon: "capture-svgrepo-com.svg" },
            { key: "language", icon: "language-svgrepo-com.svg" },
            { key: "bell", icon: "bell.svg" },
        ],
        []
    );
}


