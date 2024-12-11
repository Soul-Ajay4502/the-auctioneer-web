import { Image } from "react-bootstrap";
import PaginatedTable from "../../components/table/PaginatedTable";
import { useLeagueState } from "../../context/League.context";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import defaultAvatar from "../../assets/img/cricket.png";
import ShowDpModal from "../../components/ShowDpModal";
import { NavLink } from "react-router-dom";
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg";


function PlayerList() {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;

    const cellModifier = {
        playerPhoto: ({ value }) => {
            return (
                <ShowDpModal
                    showTitle={false}
                    modalAttrs={{ size: "sm" }}
                    renderModalBody={() => (
                        <div>
                            <Image
                                style={{
                                    width: "100%",
                                    // maxHeight: "10vh",
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
                                border: '1px solid grey', maxHeight: '5vh', overflow: 'hidden'
                            }}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    // maxHeight: "10vh",
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
        paymentScreenshot: ({ value }) => {
            return (
                <NavLink
                    to={value}
                    target="_blank" // Opens link in a new tab
                    rel="noopener noreferrer"
                >
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            backgroundColor: '#2168bf'
                        }}
                    >
                        <LinkIcon />
                    </div>

                </NavLink>
            );
        },
        idProofUrl: ({ value }) => {
            return (
                <NavLink
                    to={value}
                    target="_blank" // Opens link in a new tab
                    rel="noopener noreferrer"
                >
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                            backgroundColor: '#a66ef0'
                        }}
                    >
                        <LinkIcon />
                    </div>

                </NavLink>
            );
        },
    }

    return (
        <>
            <div style={{ padding: 20 }}>
                <PaginatedTable
                    getDataUrl={`${endpoints.playerList.list}${leagueDetails.leagueId}`}

                    name={<LeagueNameFormatter
                        name={leagueDetails.leagueName}
                        fullName={leagueDetails.leagueFullName}
                    />}
                    insertable={false}
                    {...viewProps.players}
                    cellModifier={cellModifier}
                    isUploadEnable
                />
            </div>
        </>
    );
}

export default PlayerList;

const LeagueNameFormatter = ({ name, fullName }) => {
    return (
        <div>
            <div style={{ display: 'flex' }}><p style={{ color: '#8925f5', marginBottom: 0 }}>{name.toUpperCase()}</p><p style={{ marginBottom: 0 }}>-PLAYER LIST</p></div>
            <p style={{ fontSize: 12, textAlign: 'center' }}>{fullName}</p>
        </div>)
}