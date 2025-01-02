import axios from "axios";
import React, { useState } from "react";
import { CloseButton, Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useLeagueState } from "../context/League.context";
import bat from "../assets/img/cricket-bat.png";
import bowl from "../assets/img/bowl.png";
import { ReactComponent as Rupee } from "../assets/icons/Rupee.svg";

function PlayerProfileModal({
    onHiding = () => { },
    modalAttrs,
    isModalOpen,
    playerDetails = {},
    closeModal,
    teams,
    reFetch,
    setIsExploding
}) {
    const initialAmount = 5000;
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;
    const lightColors = [
        "#f0e68c",
        "#ffd700",
        "#faebd7",
        "#d3d3d3",
        "#e0ffff",
        "#f5f5dc",
        "#f0f8ff",
        "#f5deb3",
        "#ffe4e1",
        "#ffebcd",
        "#fffacd",
        "#f0fff0",
        "#ffefd5",
        "#ffe4b5",
        "#f8f8ff",
        "#f5f5f5",
        "#e6e6fa",
        "#fff0f5",
        "#fafad2",
        "#dcdcdc",
        "#ffb6c1",
        "#ffcccb",
        "#faf0e6",
        "#d3d3d3",
        "#ffeb3b",
        "#c1c1c1",
        "#d4edda",
        "#f7f7f7",
        "#e0e0e0",
        "#f8f8f8",
        "#d1f3d1",
        "#f8f0e3",
    ];

    const [teamBalances, setTeamBalances] = useState(
        teams.map((team, index) => ({
            ...team,
            balance: team.max_amount_for_bid || initialAmount, // Initialize balance to max amount
            isReachedMaxAmountPerPlayer: false,
            teamColor: lightColors[index] || "#72ecf2",
        }))
    );
    const [bidIncrement, setBidIncrement] = useState(Number(leagueDetails.player_base_price) || 100);
    const [currentBid, setCurrentBid] = useState({
        teamId: "",
        teamName: "",
    });
    const [previousBid, setPreviousBid] = useState({
        teamId: "",
        teamName: "",
        playerValue: 0,
    });
    const [playerValue, setPlayerValue] = useState(0);

    const tagStyle = {
        display: "flex",
        // backgroundColor: "#f0f0f0",
        // background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`,
        color: "#fff",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "14px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        width: "100%",
        // justifyContent: "space-between",
        alignItems: "center",
        fontWeight: 700,
        height: 100,
        overflow: "hidden",
    };
    const borderProperty = "1px solid #000";
    const borderRadius = "5px";

    const clearStates = () => {
        setCurrentBid({
            teamId: "",
            teamName: "",
        });
        setPreviousBid({
            teamId: "",
            teamName: "",
            playerValue: 0,
        });
        setBidIncrement(100);
        setPlayerValue(0);
        setTeamBalances(
            teams.map((team, index) => ({
                ...team,
                balance: team.max_amount_for_bid, // Initialize balance to max amount
                isReachedMaxAmountPerPlayer: false,
                teamColor: lightColors[index] || "#72ecf2",
            }))
        )
    }

    const handleBidClick = (teamId, teamName, maxAmountPerPlayer) => {
        // const bidIncrement = 500; // Fixed bid increment

        // Check if the clicked team is the same as the current bid
        // console.log("bidIncrement", playerValue + bidIncrement);

        if (currentBid.teamId === teamId) {
            // Revert to the previous bid
            if (previousBid.playerValue + bidIncrement <= maxAmountPerPlayer) {
                setTeamBalances((prevBalances) =>
                    prevBalances.map((team) => ({
                        ...team,
                        isReachedMaxAmountPerPlayer: false, // Reset the flag for all teams
                    }))
                );
            }

            setCurrentBid(previousBid);
            setPlayerValue(previousBid.playerValue);
        } else {
            if (playerValue + bidIncrement > maxAmountPerPlayer) {
                setTeamBalances((prevBalances) =>
                    prevBalances.map((team) =>
                        team.teamId === teamId
                            ? { ...team, isReachedMaxAmountPerPlayer: true }
                            : team
                    )
                );

                toast.error(`${teamName} reached max Amount Per Player`);
                return;
            }
            // Update the previous bid to the current bid
            setPreviousBid({
                ...currentBid,
                playerValue, // Store the current player's value
            });

            // Set the new current bid
            setCurrentBid({
                teamId: teamId,
                teamName: teamName,
            });

            // Increase the player's value
            setPlayerValue(playerValue + bidIncrement);
        }
    };

    const handleSell = async () => {
        try {
            // Replace with your API endpoint and payload
            const endpoint = "/players/sell";
            const payload = {
                ...leagueDetails,
                soldTo: currentBid.teamId, // Replace with dynamic data
                playerId: playerDetails?.playerId, // Replace with dynamic data
                soldAmount: playerValue,
            };

            await axios.post(endpoint, payload);
            closeModal();
            toast.success(
                `${playerDetails?.playerName} Sold to ${currentBid?.teamName}`
            );
            clearStates();
            setIsExploding(true)
            reFetch();
        } catch (err) { }
    };
    const handleUnsold = async () => {
        try {
            // Replace with your API endpoint and payload
            const endpoint = "/players/unsold";
            const payload = {
                soldTo: currentBid.teamId, // Replace with dynamic data
                playerId: playerDetails?.playerId, // Replace with dynamic data
                soldAmount: playerValue,
            };

            await axios.post(endpoint, payload);
            closeModal();
            toast.error(`${playerDetails?.playerName} Unsold`);
            setCurrentBid({
                teamId: "",
                teamName: "",
            });
            setPreviousBid({
                teamId: "",
                teamName: "",
                playerValue: 0,
            });
            reFetch();
        } catch (err) {
            console.log("error on player unsold", err);
        }
    };
    return (
        <>
            <Modal
                centered
                fullscreen
                show={isModalOpen}
                onHide={() => {
                    onHiding();
                    closeModal();
                    clearStates()
                }}
                backdrop="static"
                scrollable={true}
                {...modalAttrs}
            >
                {/* Header */}
                <div
                    className="pb-2 pt-5 px-4 text-center"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            borderRadius: 50,
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#000",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            background: "#fff",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            width: "4%",
                            marginRight: 10,
                            textAlign: "center",
                            padding: '10px 0'
                        }}
                    >
                        {playerDetails?.playerId}
                    </div>
                    <div
                        className="m-0 h5 pe-2"
                        style={{
                            borderRadius: 10,
                            padding: "10px",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#000",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            background: "#fff",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            width: "20%",
                        }}
                    >
                        {playerDetails?.playerName}
                    </div>

                    <CloseButton
                        onClick={() => { closeModal(); clearStates() }}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            fontSize: "16px",
                        }}
                    />
                </div>

                {/* Modal Body */}
                <Modal.Body
                    className="p-3 p-md-4"
                    style={{ overflow: "hidden" }}
                >
                    <div
                        style={{
                            display: "flex",
                            overflow: "hidden",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Player Image */}
                        <div
                            style={{
                                overflow: "hidden",
                                width: "30%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={playerDetails?.playerPhoto}
                                alt="player dp"
                                style={{
                                    height: "550px",
                                    borderTopLeftRadius: borderRadius,
                                    borderBottomLeftRadius: borderRadius,
                                    borderLeft: borderProperty,
                                    borderTop: borderProperty,
                                    borderBottom: borderProperty,
                                    width: "100%",
                                }}
                            />
                        </div>

                        <div
                            style={{
                                width: "20%",
                                display: "flex",
                                // flexWrap: "wrap",
                                flexDirection: "column",
                                gap: "8px",
                                borderTop: borderProperty,
                                borderRight: borderProperty,
                                borderBottom: borderProperty,
                                padding: 10,
                                borderTopRightRadius: borderRadius,
                                borderBottomRightRadius: borderRadius,
                            }}
                        >
                            <span
                                style={{
                                    justifyContent: "center",
                                    ...tagStyle,
                                    background: `linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(75,9,121,1) 0%, rgba(209,0,255,1) 75%)`,
                                }}
                            >
                                {playerDetails?.playerRole?.toUpperCase()}
                            </span>
                            <span
                                style={{
                                    ...tagStyle,
                                    justifyContent: "space-between",
                                    background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 19%, rgba(0,212,255,1) 100%)`,
                                }}
                            >
                                <img
                                    src={bat}
                                    alt="cricket-bat"
                                    width={80}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 10,
                                        padding: 5,
                                        boxShadow:
                                            "0 1px 3px rgba(0, 0, 0, 0.2)",
                                    }}
                                />{" "}
                                <span
                                    style={{
                                        paddingLeft: 5,
                                        textAlign: "left",
                                        width: "70%",
                                    }}
                                >
                                    {playerDetails?.battingStyle?.toUpperCase()}
                                </span>
                            </span>
                            <span
                                style={{
                                    ...tagStyle,
                                    justifyContent: "space-between",
                                    background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 19%, rgba(0,212,255,1) 100%)`,
                                }}
                            >
                                <img
                                    src={bowl}
                                    alt="cricket-bowl"
                                    width={80}
                                    style={{
                                        background: "#fff",
                                        borderRadius: 10,
                                        padding: 5,
                                        boxShadow:
                                            "0 1px 3px rgba(0, 0, 0, 0.2)",
                                    }}
                                />{" "}
                                <span
                                    style={{
                                        paddingLeft: 5,
                                        textAlign: "left",
                                        width: "70%",
                                    }}
                                >
                                    {playerDetails?.bowlingStyle?.toUpperCase()}
                                </span>
                            </span>
                        </div>

                        {/* Team List */}
                        <div
                            style={{
                                width: "50%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            {/* <h5 className="mb-3">Teams</h5> */}
                            <div>
                                <h6>Bid Increment</h6>
                                <div>
                                    <input
                                        type="number"
                                        onChange={(e) =>
                                            setBidIncrement(
                                                Number(e.target.value)
                                            )
                                        }
                                        value={bidIncrement}
                                        style={{ borderRadius: 50 }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "65%",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap", // Allow buttons to wrap to the next line
                                    gap: "10px", // Add spacing between buttons
                                }}
                            >
                                {teamBalances.map((team) => (
                                    <Button
                                        key={team.teamId}
                                        style={{
                                            width: "23%", // Ensures 4 buttons fit in a row (accounting for spacing)
                                            fontWeight: "bold",
                                            marginBottom: "10px", // Adds spacing between rows
                                            background: team.teamColor,
                                            color: "#000",
                                        }}
                                        size="sm"
                                        onClick={() =>
                                            handleBidClick(
                                                team.teamId,
                                                team.teamName,
                                                Number(team.maxAmountPerPlayer)
                                            )
                                        }
                                        disabled={
                                            team.isReachedMaxAmountPerPlayer
                                        }
                                    >
                                        {team.teamName}
                                    </Button>
                                ))}
                            </div>
                            {/* Current Bid Section */}
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: 33, fontWeight: 700 }}>
                                    <strong>{currentBid?.teamName}</strong>
                                </p>
                                <div
                                    style={{
                                        padding: "40px 25px",
                                        border: "1px solid #000",
                                        // borderRadius: "50%",
                                        background: "#e9ecef",
                                        width: '100%'
                                    }}
                                >
                                    <strong>
                                        <Rupee />
                                        {playerValue}
                                    </strong>
                                </div>
                            </div>
                            <div style={{ width: "80%" }}>
                                <Button
                                    onClick={handleSell}
                                    disabled={playerValue <= 0}
                                    style={{
                                        width: "50%",
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    }}
                                    variant="success"
                                >
                                    SOLD
                                </Button>
                                <Button
                                    onClick={handleUnsold}
                                    disabled={playerValue > 0}
                                    style={{
                                        width: "50%",
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                    variant="danger"
                                >
                                    UNSOLD
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PlayerProfileModal;
