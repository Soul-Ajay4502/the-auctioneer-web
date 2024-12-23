import { lazy } from "react";
const Auction = lazy(() => import("../views/pages/Auction"));
const TeamList = lazy(() => import("../views/pages/TeamList"));
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
    {
        path: "team-list",
        name: "Teams",
        page: TeamList,
        // showOnTab: fa,
    },
    {
        path: "auction",
        name: "Auction",
        page: Auction,
        // showOnTab: fa,
    },
    {
        path: "player-team-list",
        name: "Players By Team",
        page: PlayerList,
        notShowOnMenu: true,
    },
];
export default routes;
