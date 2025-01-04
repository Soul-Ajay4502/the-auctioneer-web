const endpoints = Object.freeze({
    authentication: {
        login: "/auth/login",
        token: "/auth/token ",
        getOtp: "/auth/get-otp ",
        register: '/auth/register'
    },
    league: {
        list: "/league",
        add: "/league/add",
        update: "/league/update",
    },
    team: {
        list: "/team/",
        add: "/team/add",
        update: "/team/update",
        listWithPlayerCount: "/team/listWithPlayerCount/",
    },
    playerList: {
        list: "/players/",
        add: "",
        update: "/players/update",
        downloadUploadTemplate: '',
        upload: '/template/upload',
        listByTeam: '/team/player/'
    },
    auction: {
        playerIds: '/players/playerIds/'
    },
    dashboard: {
        counts: 'dashboard/',
        topPlayers: 'dashboard/topValuePlayers',
        leagues: 'dashboard/leagues'
    }
});

export default endpoints;
