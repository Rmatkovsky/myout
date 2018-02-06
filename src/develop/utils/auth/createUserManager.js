import Oidc, { UserManager, WebStorageStateStore } from 'oidc-client';

Oidc.Log.logger = window.console;
Oidc.Log.level = Oidc.Log.INFO;

const createUserManager = (config) => {
    config.userStore = new WebStorageStateStore({ store: window.sessionStorage, prefix: 'app_' });

    return new UserManager(config);
};

export default createUserManager;
