import { Badge, Image } from "react-bootstrap";
import PaginatedTable from "../../components/table/PaginatedTable";
import { useLeagueState } from "../../context/League.context";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import defaultAvatar from "../../assets/img/cricket.png";
import ShowDpModal from "../../components/ShowDpModal";
import { NavLink } from "react-router-dom";
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg";
import ModalWrapper from "../../components/ModalWrapper";
import PlayerForm from "./forms/PlayerForm";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { useAxiosGet } from "../../hooks/axiosHooks";



function PlayerList() {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;
    const fetchutils = useAxiosGet(`${endpoints.playerList.playerCount}${leagueDetails.leagueId}`);
    const { response, reFetch: reFetchCount, loading } = fetchutils;
    console.log('response', response[0]?.registeredPlayerCount);

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
                                height: '5vh', overflow: 'hidden',

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
                        <LinkIcon color="#fff" />
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
                    style={{ textDecoration: 'none' }}
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
                        <LinkIcon color="#000" />
                    </div>

                </NavLink>
            );
        },
        updateDp: ({ row, reFetch }) => {
            return (
                <ModalWrapper
                    modalTitle={`UPDATE ${row.playerName}'s DP`}
                    modalAttrs={{ size: "md" }}
                    disabled={Number(row.isUpdatedDp) === 1}
                    disabledTitle='This player DP has been updated once.'
                    renderModalBody={(closeModal) => (
                        <PlayerForm
                            onAfterSubmit={() => {
                                closeModal();
                                reFetch();
                                reFetchCount();
                            }}
                            onCancel={closeModal}
                            endpoint={endpoints.playerList?.update}
                            updateValues={row}
                        />
                    )}
                >
                    <Edit />
                </ModalWrapper>
            );
        },
    }

    return (
        <>
            <div style={{ padding: 20 }}>
                <PaginatedTable
                    getDataUrl={`${endpoints.playerList.list}${leagueDetails.leagueId}`}

                    headname={<LeagueNameFormatter
                        name={leagueDetails.leagueName}
                        fullName={leagueDetails.leagueFullName}
                        // playerCount={leagueDetails?.playerCount}
                        // showBadge={Number(leagueDetails?.playerCount) === Number(leagueDetails?.totalPlayers)}
                        playerCount={response[0]?.registeredPlayerCount}
                        showBadge
                    />}
                    insertable={false}
                    {...viewProps.players}
                    cellModifier={cellModifier}
                    isUploadEnable={Number(leagueDetails?.playerCount) < Number(leagueDetails?.totalPlayers)}
                    pinnedFieldRelevant='playerName'
                />
            </div>
        </>
    );
}

export default PlayerList;

const LeagueNameFormatter = ({ name, fullName, playerCount, showBadge = false }) => {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <p style={{ color: "#8925f5", marginBottom: 0 }}>
                    {name.toUpperCase()}
                </p>
                <p style={{ marginBottom: 0 }}>-PLAYER LIST</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p style={{ fontSize: 12, textAlign: "center" }}>{fullName}</p>
                {showBadge && <Badge bg="success" style={{ borderRadius: 200, padding: '10px 12px' }} title="Number of registered players">{playerCount}</Badge>
                }</div>
        </div>
    );
};