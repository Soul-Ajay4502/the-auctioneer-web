import { NavLink } from "react-router-dom";
import PaginatedTable from "../../components/table/PaginatedTable";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import { ReactComponent as EnterToLeague } from "../../assets/icons/EnterToLeague.svg";
import { ReactComponent as Edit } from "../../assets/icons/Edit.svg";
import LeagueForm from "./forms/LeagueForm";
import ModalWrapper from "../../components/ModalWrapper";
import { useLeagueState } from "../../context/League.context";

function LeagueList() {
    const { setSelectedLeague } = useLeagueState();
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
                <NavLink
                    key={row.user_id}
                    to="/player-list"
                    // state={{ leagueDetails: row }}
                    style={{ textDecorationLine: 'none' }}
                    onClick={() => setSelectedLeague({ leagueDetails: row })}
                >
                    <div
                        style={{
                            background: backgroundColor,
                            borderRadius: 10,
                            textAlign: "center",
                            fontWeight: 700,
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: "center",
                            width: '100%',
                            color: '#000',
                        }}
                    >
                        <div>{value} </div><EnterToLeague />
                    </div>
                </NavLink>
            );
        },
        // playerList: ({ row }) => {
        //     return (
        //         <NavLink
        //             key={row.user_id}
        //             to="/player-list"
        //             state={{ leagueDetails: row }}
        //         >
        //             <div
        //                 style={{
        //                     height: "100%",
        //                     width: "100%",
        //                     background: "red",
        //                     display: "flex",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     borderRadius: 4,
        //                     backgroundColor: 'grey'
        //                 }}
        //             >
        //                 <EnterToLeague />
        //             </div>
        //         </NavLink>
        //     );
        // },
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
                    <Edit />
                </ModalWrapper>
            );
        },
    };

    return (
        <>
            <div style={{ padding: 20 }}>
                <PaginatedTable
                    addBtnLabel='create league'
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
