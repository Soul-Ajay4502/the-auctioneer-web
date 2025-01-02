import React from "react";
import capitalizeCamelCase from "../../helpers/capitalizeCamelCase";

const TeamBalancesForAuction = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    // Extract table headers from the keys of the first object
    const headers = Object.keys(data[0]);

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th
                            key={header}
                            style={{
                                border: "1px solid #ddd",
                                padding: "8px",
                                textAlign: "left",
                                background: "#49caf5",
                            }}
                        >
                            {capitalizeCamelCase(header)}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {headers?.map((header, index) => (
                            <td
                                key={header}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    background:
                                        index === 0 ? "#9172ed" : "#f4f2f7",
                                    color: index === 0 ? "#fff" : "#000",
                                    textAlign: index === 0 ? "left" : "center",
                                    fontWeight: index === 0 ? 700 : 500,
                                }}
                            >
                                {row[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeamBalancesForAuction;
