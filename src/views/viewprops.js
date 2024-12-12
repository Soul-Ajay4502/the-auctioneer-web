const viewProps = Object.freeze({
    leagueDetails: {
        name: "leagues", // Update the name as needed
        columnHeads: [
            "ENTER TO LEAGUE",
            "LEAGUE FULL NAME",
            "LOCATIONS IN LEAGUE",
            "TOTAL PLAYERS IN LEAGUE",
            "LEAGUE REGISTRATION FEE",
            "TOTAL TEAMS IN LEAGUE",
            "LEAGUE START DATE",
            "LEAGUE END DATE",
            "REGISTRATION ENDS ON",
            "HAS UNSOLD",
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
            "edit",
        ],
    },
    teamDetails: {
        name: "Teams", // Update the name as needed
        columnHeads: [
            "TEAM NAME",
            "LOGO",
            "TEAM OWNER",
            "TEAM OWNER PHONE",
            "JERSEY COLOR",
            "TEAM MEMBERS",
            "EDIT",
        ],
        relevants: [
            "teamName",
            "logoUrl",
            "teamOwner",
            "teamOwnerPhone",
            "jerseyColor",
            "members",
            "edit"

        ],
    },
    players: {
        name: "Player List", // Update the name as needed
        columnHeads: [
            "PLAYER NAME",
            "PLAYER PHOTO",
            "WHATSAPP NO",
            "PLACE",
            "CURRENT TEAM",
            "PLAYER ROLE",
            "BATTING STYLE",
            "BOWLING STYLE",
            "PAYMENT SCREENSHOT",
            "ID PROOF",
            "REGISTRATION TIME",
            "UPDATE DP"
        ]
        ,
        relevants: [
            "playerName",
            "playerPhoto",
            "whatsappNo",
            "place",
            "currentTeam",
            "playerRole",
            "battingStyle",
            "bowlingStyle",
            "paymentScreenshot",
            "idProofUrl",
            "registrationTime",
            "updateDp"
        ]
        ,
    },
});

export default viewProps;
