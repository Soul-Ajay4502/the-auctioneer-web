import { NavLink } from "react-router-dom";
import PaginatedTable from "../../components/table/PaginatedTable";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import { ReactComponent as Player } from "../../assets/icons/player.svg";
import LeagueForm from "./forms/LeagueForm";
import ModalWrapper from "../../components/ModalWrapper";
import { Button } from "react-bootstrap";

function LeagueList() {
    const cellModifier = {
        leagueName: ({ value, row }) => {
            const colors = [
                "#54bfbc",
                "#e468f2",
                "#6eeb34",
                "#ecb9fa",
                "#5280e3",
                "#ff6970",
                "#c2c953",
            ];

            // Generate a unique index from the text value
            const colorIndex = value
                ? value
                      .split(/[-\s]/)
                      .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
                  colors.length
                : 0;

            const backgroundColor = colors[colorIndex];

            return (
                <div
                    style={{
                        background: backgroundColor,
                        borderRadius: 10,
                        textAlign: "center",
                        fontWeight: 700,
                    }}
                >
                    {value}
                </div>
            );
        },
        playerList: ({ row }) => {
            return (
                <NavLink
                    key={row.user_id}
                    to="/player-list"
                    state={{ leagueDetails: row }}
                >
                    <Player />
                </NavLink>
            );
        },
        edit: ({ row, reFetch }) => {
            return (
                <ModalWrapper
                    modalTitle={"UPDATE" + " " + row.leagueName}
                    modalAttrs={{ size: "md" }}
                    renderModalBody={(closeModal) => (
                        <LeagueForm
                            onAfterSubmit={() => {
                                closeModal();
                                reFetch();
                            }}
                            onCancel={closeModal}
                            endpoint={endpoints.league.update}
                            updateValues={row}
                        />
                    )}
                >
                    <Button
                        className="primaryBtn btnAnime ms-4"
                        style={{ fontSize: "13px" }}
                    >
                        {"UPDATE"}
                    </Button>
                </ModalWrapper>
            );
        },
    };

    return (
        <>
            <div style={{ padding: 20 }}>
                <PaginatedTable
                    getDataUrl={endpoints.league.list}
                    {...viewProps.leagueDetails}
                    cellModifier={cellModifier}
                    Form={LeagueForm}
                    endpoints={endpoints.league}
                />
            </div>
        </>
    );
}

export default LeagueList;
