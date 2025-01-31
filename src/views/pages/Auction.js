import { useEffect, useState } from "react";
import axios from "axios";
import { useLeagueState } from "../../context/League.context";
import endpoints from "../../services/endpoints";
import { Wheel } from "react-custom-roulette";
import Loader from "../../components/Loader";
import PlayerProfileModal from "../../components/PlayerProfileModal";
import ConfettiExplosion from "react-confetti-explosion";
import WithOffcanvas from "../../components/WithOffcanvas";
import TeamBalancesForAuction from "./TeamBalancesForAuction";
import { Alert } from "react-bootstrap";

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
    const [isUnsoldAuction, setIsUnsoldAuction] = useState(false);

    const fetchAuctionData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${endpoints.auction.playerIds}${leagueDetails.leagueId}`
            );
            const teamResponse = await axios.get(
                `${endpoints.team.listWithPlayerCount}${leagueDetails.leagueId}`
            );
            setTeamData(teamResponse.data.responseData.data);
            const data = response.data.responseData;
            setAuctionData(data);

            const ids = data.map((item) => ({
                option: item.playerId.toString(), // Convert to string for wheel display
            }));
            setPlayerIds(ids);
            setIsUnsoldAuction(response.data.isUnsoldList);
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
        // if (teams.length !== Number(leagueDetails.totalTeams)) {
        //     toast.error(
        //         `To begin the auction, please ensure that all ${leagueDetails.totalTeams} teams are added.`
        //     );
        //     return;
        // }
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
    const data = teams?.map((item) => ({
        teamName: item?.teamName,
        maxAmountForBid: item?.maxAmountForBid,
        balanceAmount: item?.balanceAmount,
        maxAmountPerPlayer: item?.maxAmountPerPlayer,
        numberOfPlayers: item?.playerCount,
    }));

    return (
        <div
            style={{
                paddingTop: 20,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                }}
            >
                {loading && <Loader />}
                {playerIds.length > 0 && teams.length > 0 ? (
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
                                position: "relative",
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: 20,
                                    left: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "98%",
                                }}
                            >
                                <WithOffcanvas
                                    offcanvasBody={() =>
                                        <TeamBalancesForAuction data={data} />
                                    }
                                    style={{ width: "50vw" }}
                                >
                                    View Balance
                                </WithOffcanvas>
                                {isUnsoldAuction && (
                                    <Alert variant="warning">
                                        The curtain rises on the Unsold Auction!
                                    </Alert>
                                )}
                            </div>
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
                                spinDuration={0.5}
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
                ) : (playerIds.length === 0 &&
                    Number(leagueDetails.playerCount) === 0) || (teams.length === 0 && Number(leagueDetails.teamCount) === 0) ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80vh",
                        }}
                    >
                        <Alert variant="danger">
                            Uh-oh! Players or teams are missing. Double-check
                            and add them.
                        </Alert>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80vh",
                        }}
                    >
                        <Alert
                            variant="success"
                            style={{
                                width: "30%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span
                                style={{
                                    color: "#8925f5",
                                    fontSize: 18,
                                    fontWeight: 700,
                                    paddingRight: 5,
                                }}
                            >
                                {leagueDetails.leagueFullName.toUpperCase()}
                            </span>{" "}
                            AUCTION COMPLETED
                        </Alert>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Auction;
