// import { useLocation } from "react-router-dom";

// import { NavLink } from "react-router-dom";
import ModalWrapper from "../../components/ModalWrapper";
import PaginatedTable from "../../components/table/PaginatedTable";
import { useLeagueState } from "../../context/League.context";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import TeamForm from "./forms/TeamForm";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import { Image } from "react-bootstrap";
import defaultAvatar from "../../assets/img/cricket.png";
import ShowDpModal from "../../components/ShowDpModal";
import team from "../../assets/img/team.png";
import { NavLink } from "react-router-dom";


// import endpoints from "../../services/endpoints";
// import viewProps from "../viewprops";

const cellModifier = {
    edit: ({ row, reFetch }) => {
        return (
            <ModalWrapper
                modalTitle={"UPDATE" + " " + row.teamName}
                modalAttrs={{ size: "md" }}
                renderModalBody={(closeModal) => (
                    <TeamForm
                        onAfterSubmit={() => {
                            closeModal();
                            reFetch();
                        }}
                        onCancel={closeModal}
                        endpoint={endpoints.team.update}
                        updateValues={row}
                    />
                )}
            >
                <Edit />
            </ModalWrapper>
        );
    },
    logoUrl: ({ value }) => {
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
                            border: '1px solid grey'
                        }}
                    >
                        <Image
                            style={{
                                width: "100%",
                                maxHeight: "20vh",
                                objectFit: "cover",
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
    members: ({ row }) => {
        return (
            <NavLink
                // key={row.user_id}
                to="/player-team-list"
                state={{ teamDetails: row }}
                style={{ textDecorationLine: 'none' }}
            >
                <div
                    style={{
                        // background: backgroundColor,
                        borderRadius: 10,
                        textAlign: "center",
                        fontWeight: 700,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: "center",
                        width: '20%',
                        color: '#000',
                    }}
                >
                    <Image
                        style={{
                            width: "100%",
                            maxHeight: "20vh",
                            objectFit: "cover",
                        }}
                        src={team}
                        roundedCircle
                        alt="team logo"
                    />
                </div>
            </NavLink>
        );
    },
};

function TeamList() {
    const { selectedLeague } = useLeagueState();
    const { leagueDetails } = selectedLeague;
    return (
        <>
            <div
                style={{
                    paddingTop: 20,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div style={{ width: "79%" }}>
                    <PaginatedTable
                        getDataUrl={`${endpoints.team.list}${leagueDetails.leagueId}`}
                        addBtnLabel="create Teams"
                        name={
                            <LeagueNameFormatter
                                name={leagueDetails.leagueName}
                                fullName={leagueDetails.leagueFullName}
                            />
                        }
                        Form={TeamForm}
                        endpoints={endpoints.team}
                        {...viewProps.teamDetails}
                        cellModifier={cellModifier}
                    />
                </div>
            </div>
        </>
    );
}

export default TeamList;

const LeagueNameFormatter = ({ name, fullName }) => {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <p style={{ color: "#8925f5", marginBottom: 0 }}>
                    {name.toUpperCase()}
                </p>
                <p style={{ marginBottom: 0 }}>-TEAM LIST</p>
            </div>
            <p style={{ fontSize: 12, textAlign: "center" }}>{fullName}</p>
        </div>
    );
};
