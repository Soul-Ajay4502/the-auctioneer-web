import { useEffect, useState } from "react";
import axios from "axios";
import { useLeagueState } from "../../context/League.context";
import endpoints from "../../services/endpoints";
import { Wheel } from "react-custom-roulette";
import Loader from "../../components/Loader";
import PlayerProfileModal from "../../components/PlayerProfileModal";
import ConfettiExplosion from "react-confetti-explosion";

function Auction() {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;

    const [auctionData, setAuctionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [teams, setTeamData] = useState([]);
    const [playerIds, setPlayerIds] = useState([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [isExploding, setIsExploding] = useState(false);

    const fetchAuctionData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${endpoints.auction.playerIds}${leagueDetails.leagueId}`
            );
            const teamResponse = await axios.get(
                `${endpoints.team.list}${leagueDetails.leagueId}`
            );
            setTeamData(teamResponse.data.responseData.data);
            const data = response.data.responseData;
            setAuctionData(data);

            const ids = data.map((item) => ({
                option: item.playerId.toString(), // Convert to string for wheel display
            }));
            setPlayerIds(ids);
        } catch (err) {
            console.error("Error fetching auction data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuctionData();
        return () => {
            setLoading(false);
            setPlayerIds([]);
            setTeamData([]);
            setAuctionData(null);
            setPrizeNumber(0);
            setMustSpin(false);
            setSelectedPlayer(null);
            setShowProfile(false);
        };
    }, []);

    const handleSpinClick = () => {
        if (playerIds.length === 0) return;
        const randomIndex = Math.floor(Math.random() * playerIds.length);
        setPrizeNumber(randomIndex);
        setMustSpin(true);
    };

    const handleStopSpinning = () => {
        if (auctionData) {
            const selected = auctionData[prizeNumber];
            setSelectedPlayer(selected);
            setTimeout(() => {
                setShowProfile(true); // Update the state to true after the delay
                setMustSpin(false);
            }, 1000);
        }
    };

    const closeModal = () => {
        setShowProfile(false);
    };

    return (
        <div
            style={{
                paddingTop: 20,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div style={{ width: "100%" }}>
                {loading && <Loader />}
                {!loading && playerIds.length > 0 ? (
                    <>
                        {isExploding && (
                            <ConfettiExplosion
                                duration={2000}
                                width={2900}
                                particleCount={380}
                                force={0.2}
                                height={"100vh"}
                                onComplete={() => setIsExploding(false)}
                            />
                        )}
                        <div
                            style={{
                                textAlign: "center",
                                height: "80vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Wheel
                                mustStartSpinning={mustSpin}
                                prizeNumber={prizeNumber}
                                data={playerIds}
                                onStopSpinning={handleStopSpinning}
                                backgroundColors={[
                                    "#e8741c",
                                    "#3df525",
                                    "#27c4d9",
                                    "#ed2de4",
                                    "#caeb49",
                                ]}
                                textColors={["#ffffff"]}
                                textDistance={80}
                                radiusLineWidth={0}
                                innerBorderWidth={10}
                                outerBorderWidth={0}
                                perpendicularText
                            />
                        </div>
                        <div
                            style={{
                                textAlign: "center",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <button
                                style={{
                                    padding: "22px 20px",
                                    backgroundColor: "#f70213",
                                    color: "#fff",
                                    borderRadius: "50px",
                                    cursor: !mustSpin
                                        ? "pointer"
                                        : "not-allowed",
                                }}
                                onClick={handleSpinClick}
                                disabled={mustSpin}
                            >
                                Spin
                            </button>
                            {/* {selectedPlayer && (
                                <div style={{ marginTop: 20 }}>
                                    <p>
                                        Selected Player ID:{" "}
                                        <strong>{selectedPlayer.playerId}</strong>
                                    </p>
                                    <p>
                                        Player Name:{" "}
                                        <strong>{selectedPlayer.playerName}</strong>
                                    </p>
                                </div>
                            )} */}
                        </div>

                        <PlayerProfileModal
                            isModalOpen={showProfile}
                            playerDetails={selectedPlayer}
                            closeModal={closeModal}
                            teams={teams}
                            reFetch={fetchAuctionData}
                            setIsExploding={setIsExploding}
                        />
                    </>
                ) : (
                    !loading && <p>No player IDs available.</p>
                )}
            </div>
        </div>
    );
}

export default Auction;
