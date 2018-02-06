// import { UserAuthWrapper } from 'redux-auth-wrapper';
// import { handleReplace } from '../history.helper';
//
// export const UserIsAuthorized = UserAuthWrapper({
//     authSelector: state => state.user,
//     predicate: ({ ...isAuthorized }) => !!isAuthorized,
//     redirectAction: () => () => handleReplace({ pathname: 'login' }),
//     wrapperDisplayName: 'UserIsAuthorized',
// });
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/login',
    // Determine if the user is authenticated or not
    authenticatedSelector: state => state.user.isAuthorized !== false,
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsOwner = connectedRouterRedirect({
    // The url to redirect user to if they fail
    redirectPath: '/news',
    // Determine if the user is authenticated or not
    authenticatedSelector: state => state.user.payload.id === state.user.current.id,
    // A nice display name for this check
    wrapperDisplayName: 'UserIsAuthenticated',
});
