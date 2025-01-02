const viewProps = Object.freeze({
    leagueDetails: {
        name: "leagues", // Update the name as needed
        columnHeads: [
            "ENTER TO LEAGUE",
            "LEAGUE FULL NAME",
            "LOCATIONS IN LEAGUE",
            "TOTAL PLAYERS IN LEAGUE",
            "REGISTRATION FEE",
            "TOTAL TEAMS IN LEAGUE",
            "LEAGUE START DATE",
            "LEAGUE END DATE",
            "REGISTRATION ENDS ON",
            "BID AMOUNT PER TEAM",
            "AUCTION DATE",
            "HAS UNSOLD",
            "REGISTERED PLAYERS",
            "CREATED TEAMS",
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
            "bidAmountPerTeam",
            "auctionStartDate",
            "hasUnsold",
            "playerCount",
            "teamCount",
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
            "TOTAL BID AMOUNT",
            "TEAM MEMBERS",
            "EDIT",
        ],
        relevants: [
            "teamName",
            "logoUrl",
            "teamOwner",
            "teamOwnerPhone",
            "jerseyColor",
            "maxAmountForBid",
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
    playersByTeam: {
        name: "Player List", // Update the name as needed
        columnHeads: [
            "PLAYER NAME",
            "PLAYER PHOTO",
            "WHATSAPP NO",
            "PLACE",
            "SOLD TO",
            "SOLD AMOUNT",
            "PLAYER ROLE",
            "BATTING STYLE",
            "BOWLING STYLE",
        ]
        ,
        relevants: [
            "playerName",
            "playerPhoto",
            "whatsappNo",
            "place",
            "teamName",
            "soldAmount",
            "playerRole",
            "battingStyle",
            "bowlingStyle",
        ]
        ,
    },
});

export default viewProps;
