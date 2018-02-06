const config = {
    production: {
        baseUrl: 'http://web.challenges-app.com/',
        apiUrl: 'http://web.challenges-app.com/api/',
        fbApp: '547713152236593',
    },
    development: {
        baseUrl: 'http://challenges-staging.tubikstudio.io/',
        apiUrl: 'http://challenges-staging.tubikstudio.io/api/',
        fbApp: '547713152236593',
    },
};

export default config[process.env.NODE_ENV || 'development'];
