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
            "PLAYERS IN LEAGUE",
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
            "playerList",
        ],
    },
});

export default viewProps;
