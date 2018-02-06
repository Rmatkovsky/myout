export default {
    common: {
        categories: () => '/categories',
    },
    auth: {
        signup: () => '/registrations',
        login: () => '/sessions',
        recovery: () => '/send_reset_password_email',
        logout: () => '/sessions',
    },
    profile: {
        me: () => '/me',
        update: () => '/me',
        resetPassword: () => '/me/password',
    },
    user: {
        byId: id => `/users/${id}`,
        uniqueName: () => '/check_name_uniqueness',
        uniqueEmail: () => '/check_email_uniqueness',
        follow: id => `/users/${id}/followings`,
        following: id => `/users/${id}/following`,
        followers: id => `/users/${id}/followers`,
        getPosts: () => '/posts',
        sendRequest: () => '/following_requests',
        facebookConnect: () => '/social_accounts',
        getPostsLiked: () => '/me/liked_posts',
        sendVerifyEmail: () => '/me/verify_email',
        sendVerifyPhone: () => '/me/verify_phone',
        resendVerifyEmail: () => '/me/resend_email_verification',
        resendVerifyPhone: () => '/me/resend_phone_verification',
        getFollowingRequested: () => '/following_requests',
        getNotifications: () => '/notifications',
        acceptRequest: id => `/following_requests/${id}/accept`,
        declineRequest: id => `/following_requests/${id}`,
    },
    challenges: {
        all: params => `/posts?types=challenge&media=${params.media}&order=${params.order}&limit=${params.limit}&` +
            `offset=${params.offset}`,
        typeId: params =>
            `/posts?types=challenge&media=${params.media}&category_id=${params.typeId}&order=${params.order}&` +
            `limit=${params.limit}&offset=${params.offset}`,
    },
    challenge: {
        getById: id => `/posts/${id}`,
        getAcceptances: params => `/posts/${params.id}/acceptances?order=${params.order}`,
        report: () => '/reports',
        like: id => `/posts/${id}/likes`,
        delete: id => `/posts/${id}`,
        deleteAll: () => '/posts',
        sendInvite: id => `/posts/${id}/request_acceptance`,
    },
    comment: {
        add: id => `/posts/${id}/comments`,
        delete: id => `/comments/${id}`,
        like: id => `/comments/${id}/likes`,
    },
    news: {
        all: params => `/news_feed?limit=${params.limit}&offset=${params.offset}`,
        getOne: id => `/news/${id}`,
    },
    trophy: {
        all: params => `/posts?types=trophy&order=${params.order}&limit=${params.limit}&offset=${params.offset}`,
    },
    search: {
        users: () => '/users',
        challenges: () => '/posts',
    },
    support: {
        getChat: () => '/support/chats',
        sendMessage: () => '/support/chat_messages',
        markAllMessage: () => '/support/chats/mark_all_as_read',
    },
};
