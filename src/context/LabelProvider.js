import React, { useState, useContext } from "react";
import viewProps from "../views/viewprops";

const LabelContext = React.createContext();

function LabelProvider({ children }) {
    const [labelMap, setLabelMap] = useState({});

    const setLabels = (view) => {
        const labels = {};

        viewProps[view].relevants.forEach((fieldName, index) => {
            labels[fieldName] = viewProps[view].columnHeads[index];
        });

        setLabelMap(labels);
    };
    return (
        <LabelContext.Provider
            value={{
                labelMap,
                setLabels,
            }}
        >
            {children}
        </LabelContext.Provider>
    );
}

const useLabelProvider = () => {
    const context = useContext(LabelContext);
    return context;
};
export { LabelContext, LabelProvider, useLabelProvider };
