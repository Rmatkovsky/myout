import createUserManager from './createUserManager';

const processSilentRenew = (config) => {
    const mgr = createUserManager(config);

    mgr.signinSilentCallback();
};

export default processSilentRenew;
