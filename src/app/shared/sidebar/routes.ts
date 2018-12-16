export const ROUTES = [

    {
        path: '/',
        title: 'Início',
        icon: 'home',
        menuSub: false
    },
    {
        path: '',
        title: 'Usuário',
        icon: 'person',
        menuSub: true,
        refSub: 'usuario',
        submenu: [
            {
                path: '/usuario/lista',
                title: 'Listar',
                ref: 'usuario'
            },
            {
                path: '/usuario/novo',
                title: 'Inserir',
                ref: 'usuario'
            },
        ]
    },
    {
        path: '',
        title: 'Briefing',
        icon: 'receipt',
        menuSub: true,
        refSub: 'briefing',
        submenu: [
            {
                path: '/briefing/lista',
                title: 'Listar',
                ref: 'briefing'
            },
            {
                path: '/briefing/novo',
                title: 'Inserir',
                ref: 'briefing'
            },
        ]
    },

];
