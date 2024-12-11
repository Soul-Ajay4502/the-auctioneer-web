import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const LeagueStateContext = createContext();

// Provide the context
export const LeagueStateProvider = ({ children }) => {
    const [selectedLeague, setSelectedLeague] = useState(() => {
        // Retrieve the initial selectedLeague from sessionStorage
        const storedState = sessionStorage.getItem("persistentState");
        return storedState ? JSON.parse(storedState) : { key: "default value" };
    });

    useEffect(() => {
        // Store the selectedLeague in sessionStorage on change
        sessionStorage.setItem("persistentState", JSON.stringify(selectedLeague));
    }, [selectedLeague]);

    return (
        <LeagueStateContext.Provider value={{ selectedLeague, setSelectedLeague }}>
            {children}
        </LeagueStateContext.Provider>
    );
};

// Custom hook to use the context
export const useLeagueState = () => useContext(LeagueStateContext);
