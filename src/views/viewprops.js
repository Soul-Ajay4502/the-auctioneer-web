const viewProps = Object.freeze({
    leagueDetails: {
        name: "leagues", // Update the name as needed
        columnHeads: [
            "LEAGUE SHORT NAME",
            "LEAGUE FULL NAME",
            "LOCATIONS IN LEAGUE",
            "TOTAL PLAYERS IN LEAGUE",
            "LEAGUE REGISTRATION FEE",
            "TOTAL TEAMS IN LEAGUE",
            "LEAGUE START DATE",
            "LEAGUE END DATE",
            "REGISTRATION ENDS ON",
            "HAS UNSOLD",
            "PLAYERS IN LEAGUE",
            "EDIT",
        ],
        relevants: [
            "leagueName",
            "leagueFullName",
            "leagueLocations",
            "totalPlayers",
            "registrationFee",
            "totalTeams",
            "leagueStartDate",
            "leagueEndDate",
            "registrationEndDate",
            "hasUnsold",
            "playerList",
            "edit",
        ],
    },
});

export default viewProps;
