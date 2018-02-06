import createUserManager from '../../utils/auth/createUserManager';
import apiConfig from '../../config/apiConfig';

const userManager = createUserManager(apiConfig.authServer.sso);

export default userManager;
