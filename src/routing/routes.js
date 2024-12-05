import { lazy } from "react";

const LandingPage = lazy(() => import("../views/pages/LandingPage"));
const LeagueList = lazy(() => import("../views/pages/LeagueList"));
const PlayerList = lazy(() => import("../views/pages/PlayersList"));

var routes = [
    {
        path: "",
        name: "Dashboard",
        page: LandingPage,
        showOnTab: true,
    },
    {
        path: "league-list",
        name: "Leagues",
        page: LeagueList,
        showOnTab: true,
    },
    {
        path: "player-list",
        name: "Players",
        page: PlayerList,
        // showOnTab: fa,
    },
];
export default routes;
