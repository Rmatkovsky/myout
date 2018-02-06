export default {
    auth: {
        signup: () => '/signup',
        login: () => '/login',
        recovery: () => '/recovery',
        promo: () => '/promo',
    },
    user: {
        id: id => `/users/${id}`,
        credits: id => `/users/${id}/credits`,
        profile: () => '/profile',
        userProfile: id => `/users/${id}`,
        resetPassword: () => '/reset_password?token=:token',
        following: id => `/users/${id}/following`,
        followers: id => `/users/${id}/followers`,
        settings: id => `/users/${id}/settings`,
        postsLiked: id => `/users/${id}/posts/liked`,
        postsManage: id => `/users/${id}/posts/manage`,
        notifications: id => `/users/${id}/notifications`,
    },
    news: {
        all: () => '/news',
    },
    trophy: {
        all: () => '/trophy',
        id: id => `/trophy/${id}`,

    },
    challenges: {
        all: () => '/challenges/all',
        type: type => `/challenges/${type}`,
    },
    challenge: {
        id: id => `/challenge/${id}`,
    },
    acceptance: {
        id: id => `/acceptance/${id}`,
    },
    main: {
        home: () => '/',
        contact: () => '/contact',
        help: () => '/help',
        about: () => '/about',
        privacy: () => '/privacy',
        terms: () => '/terms',
        notfound: () => '/404',
    },
    search: {
        main: () => '/search',
    },
};
