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
        add: "/team/add",
        update: "/team/update",
        downloadUploadTemplate: '/template/download',
        upload: '/template/upload',
    },
});

export default endpoints;
