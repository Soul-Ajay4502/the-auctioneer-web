import { NavLink } from "react-router-dom";
import PaginatedTable from "../../components/table/PaginatedTable";
import endpoints from "../../services/endpoints";
import viewProps from "../viewprops";
import { ReactComponent as Player } from "../../assets/icons/player.svg";
import LeagueForm from "./forms/LeagueForm";

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
    };

    return (
        <>
            <div style={{ padding: 20 }}>
                <PaginatedTable
                    getDataUrl={endpoints.league.list}
                    {...viewProps.leagueDetails}
                    cellModifier={cellModifier}
                    Form={LeagueForm}
                />
            </div>
        </>
    );
}

export default LeagueList;
