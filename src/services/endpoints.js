const endpoints = Object.freeze({
    authentication: {
        login: "/auth/login",
        token: "/auth/token ",
        getOtp: "/auth/get-otp-for-signUp",
        register: '/auth/register',
        logout: "/auth/logout",
        resetPassword: "/auth/resetPassword",
        getOtpForReset: "/auth/get-otp-for-resetPassword",
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
        listByTeam: '/team/player/',
        playerCount: '/players/playerCount/',
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
