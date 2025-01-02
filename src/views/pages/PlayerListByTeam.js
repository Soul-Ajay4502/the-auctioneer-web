import { Image } from "react-bootstrap";
import PaginatedTable from "../../components/table/PaginatedTable";
import { useLeagueState } from "../../context/League.context";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import defaultAvatar from "../../assets/img/cricket.png";
import ShowDpModal from "../../components/ShowDpModal";
import { useLocation } from "react-router-dom";



function PlayerListByTeam() {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;
    const { state } = useLocation();
    const teamDetails = state?.teamDetails


    const cellModifier = {
        playerPhoto: ({ value }) => {
            return (
                <ShowDpModal
                    showTitle={false}
                    modalAttrs={{ size: "md" }}
                    renderModalBody={() => (
                        <div>
                            <Image
                                style={{
                                    width: "100%",
                                    maxHeight: "80vh",
                                    objectFit: "contain",
                                }}
                                src={value || defaultAvatar}
                                alt="team logo"
                            />
                        </div>
                    )}
                >
                    {
                        <div
                            style={{
                                background: "#95adcc",
                                display: "flex",
                                padding: 1,
                                width: 35,
                                borderRadius: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                border: '1px solid grey',
                                height: '5vh', overflow: 'hidden'
                            }}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    Height: "10vh",
                                    // objectFit: "cover",
                                }}
                                src={value || defaultAvatar}
                                roundedCircle
                                alt="team logo"
                            />
                        </div>
                    }
                </ShowDpModal>
            );
        },
    }

    return (
        <>
            <div style={{ padding: 20 }}>
                {/* <div style={{ marginTop: 30 }}>
                    <LeagueNameFormatter
                        name={leagueDetails.leagueName}
                        fullName={leagueDetails.leagueFullName}
                    />
                </div> */}
                <PaginatedTable
                    getDataUrl={`${endpoints.playerList.listByTeam}${teamDetails?.teamId}`}

                    headname={<LeagueNameFormatter
                        name={teamDetails?.teamName}
                        fullName={leagueDetails.leagueFullName}
                    />}
                    insertable={false}
                    {...viewProps.playersByTeam}
                    cellModifier={cellModifier}
                // isUploadEnable
                />
            </div>
        </>
    );
}

export default PlayerListByTeam;

const LeagueNameFormatter = ({ name, fullName }) => {
    return (
        <div>
            <div style={{ display: 'flex' }}><p style={{ color: '#8925f5', marginBottom: 0 }}>{name.toUpperCase()}</p><p style={{ marginBottom: 0 }}>-PLAYER LIST</p></div>
            <p style={{ fontSize: 12, textAlign: 'center' }}>{fullName}</p>
        </div>)
}