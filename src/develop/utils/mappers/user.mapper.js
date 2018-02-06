
const userLoaded = user => (
    !user
    ? {}
    : {
        avatar_data: user.avatar_data,
        bio: user.bio,
        credits: user.credits,
        email: user.email,
        email_verified: user.email_verified,
        facebook_connected: user.facebook_connected,
        followed_by_me: user.followed_by_me,
        followers_count: user.followers_count,
        following_count: user.following_count,
        guest_promocode: user.guest_promocode,
        id: user.id,
        name: user.name,
        phone: user.phone,
        phone_code: user.phone_code,
        phone_verified: user.phone_verified,
        posts_count: user.posts_count,
        private: user.private,
        promocode: user.promocode,
        trophies_count: user.trophies_count,
        web_token: user.web_token,
        following_requested: user.following_requested,
    }
);

const updateUser = user => (
    {
        user: {
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
            email: user.email,
            // current_password,
            // password_confirmation,
            // password,
            private: user.private,
            guest_promocode: user.guest_promocode,
        },
    }
);

const tokenLoaded = response => ({
    credential: {
        accessToken: response.access_token,
        tokenType: response.token_type,
        expiresIn: response.expires_in,
    },
});

export default {
    req: {
        updateUser,
    },
    res: {
        userLoaded,
        tokenLoaded,
    },
};
