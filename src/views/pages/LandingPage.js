import React, { useState, useEffect } from "react";
import axios from "axios";
import endpoints from "../../services/endpoints";
import Loader from "../../components/Loader";
import { Card, Col, Row } from "react-bootstrap";
import capitalizeCamelCase from "../../helpers/capitalizeCamelCase";
import { ReactComponent as Rupee } from "../../assets/icons/Rupee.svg";
import { ReactComponent as Tag } from "../../assets/icons/Tag.svg";

import Ranking from "../../components/Ranking";

const POSITIONS = {
    0: `linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(17,121,9,1) 0%, rgba(228,255,0,1) 100%)`,
    1: `linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(121,105,9,1) 0%, rgba(255,149,0,0.9809173669467787) 100%)`,
    2: `linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(121,9,9,1) 0%, rgba(255,59,0,0.9809173669467787) 100%)`,
};

function LandingPage() {
    const [loading, setLoading] = useState(true);
    const [countData, setCountData] = useState({});
    const [playerData, setPlayerData] = useState([]);

    // Function to fetch the data
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(endpoints.dashboard.counts);
            const playerResponse = await axios.get(
                endpoints.dashboard.topPlayers
            );
            setCountData(response.data.responseData); // Assuming the data is in responseData
            setPlayerData(playerResponse.data.responseData);
            console.log(playerResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Optionally display error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component is mounted
    }, []);

    return (
        <div style={{ padding: 20, marginTop: 100, }}>
            {loading && <Loader />} {/* Show loader while fetching data */}
            <Row>
                <Col>
                    <Row>
                        {/* Assuming countData is an object, use Object.entries or Object.values to map over */}
                        {Object.entries(countData).map(
                            ([key, value], index) => (
                                <Col key={index} md="4">
                                    <Chip
                                        bg="#FAEDC6"
                                        title={capitalizeCamelCase(key)}
                                    >
                                        {value}
                                    </Chip>
                                </Col>
                            )
                        )}
                    </Row>
                </Col>
            </Row>
            <Row>
                <div
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        color: '#fff',
                        marginBottom: 10
                    }}
                >
                    Prime Picks of the Auction Across All Leagues
                </div>

                {playerData.map((player, index) => (
                    <Col key={index} md="4">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: index + 1 === 3 ? 0 : 25,
                            }}
                        >
                            <Ranking rank={index + 1} />
                        </div>
                        <PlayerCard
                            key={index}
                            player={player}
                            position={index}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default LandingPage;

const PlayerCard = ({ position, player }) => {
    const cardStyle = {
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "6px",
        overflow: "hidden",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        cursor: "pointer",
    };

    const imageStyle = {
        width: "auto",
        height: "200px",
    };

    const detailsStyle = {
        padding: "15px",
    };

    const nameStyle = {
        margin: "10px 0",
        fontSize: "1.5em",
    };

    const detailTextStyle = {
        margin: "5px 0",
        color: "#555",
    };

    return (
        <div
            style={{
                padding: 10,
                // background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
                background: POSITIONS[position],
                borderRadius: "8px",
            }}
        >
            <div
                style={{
                    ...cardStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                }
            >
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "rgba(239, 9, 204, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 10px",
                        borderRadius: 8,

                    }}
                    title={`${player?.leagueName} League`}
                >
                    <Tag color="#1c2cbd" /> {player?.leagueName}
                </div>
                <div style={{ width: "20%" }}>
                    <img
                        src={
                            player?.playerPhoto ||
                            "https://via.placeholder.com/150"
                        }
                        alt={`${player?.name}'s profile`}
                        style={{ ...imageStyle, borderRadius: 0 }}
                    />
                </div>

                <div
                    style={{ ...detailsStyle, width: "60%", textAlign: "left" }}
                >
                    <h3 style={nameStyle}>{player?.name}</h3>
                    <p style={detailTextStyle}>
                        <strong>Team:</strong> {player?.teamName}
                    </p>
                    <p style={detailTextStyle}>
                        <strong>Position:</strong> {player?.playerRole}
                    </p>
                    {/* <p style={detailTextStyle}><strong>Age:</strong> {player?.age}</p> */}
                </div>
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        color: "#fff",
                        fontSize: "32px",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Rupee />
                    <div>{player?.soldAmount}</div>
                </div>
            </div>
        </div>
    );
};

// Chip Component to display individual chips
function Chip({ bg, title, children }) {
    return (
        <Card bg="transparent" className="text-center border-0 mb-3">
            <div className="small h6 text-dark">{title}</div>
            <div
                className="p-4 fs-3 my-3 card-shadow"
                style={{
                    background: bg,
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "30px",
                    marginLeft: "30px",
                    color: "#272727E5",
                }}
            >
                {children}
            </div>
        </Card>
    );
}
