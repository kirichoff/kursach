const constants = {tokenKey: 'TOKEN'};

export default {
    saveAuth: (userId, token) => {
        sessionStorage.setItem(constants.tokenKey, JSON.stringify({ userId: userId, access_token: token }));
    },

    clearAuth: () => {
        sessionStorage.removeItem(constants.tokenKey);
    },

    getId: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        let userId = 0;
        if (item) {
            userId = JSON.parse(item).userId;
        }
        return userId;
    },

    isLogged: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        if (item) {
            return true;
        } else {
            return false;
        }
    },

    getToken: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        console.log(sessionStorage)
        let token = null;
        if (item) {
            token = JSON.parse(item).access_token;
        }
        return token;
    }
}
