const endpoints = Object.freeze({
    authentication: {
        login: "/auth/login",
        token: "/auth/token ",
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
    },
    playerList: {
        list: "/players/",
        add: "",
        update: "/players/update",
        downloadUploadTemplate: '',
        upload: '/template/upload',
    },
    auction: {
        playerIds: '/players/playerIds/'
    },
    dashboard: {
        counts: 'dashboard/',
        topPlayers: 'dashboard/topValuePlayers'
    }
});

export default endpoints;
