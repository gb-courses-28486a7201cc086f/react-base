import { RSAA, getJSON } from "redux-api-middleware";

export const START_MESSAGE_LOADING = "@@message/START_MESSAGE_LOADING";
export const SUCCESS_MESSAGE_LOADING = "@@message/SUCCESS_MESSAGE_LOADING";
export const ERROR_MESSAGE_LOADING = "@@message/ERROR_MESSAGE_LOADING";

export const loadMessages = () => ({
    [RSAA]: {
        endpoint: "/api/messages.json",
        method: "GET",
        types: [
            START_MESSAGE_LOADING,
            {
                type: SUCCESS_MESSAGE_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json,
                ), 
            },
            ERROR_MESSAGE_LOADING,
        ],
    },
});

export const START_PROFILE_LOADING = "@@message/START_PROFILE_LOADING";
export const SUCCESS_PROFILE_LOADING = "@@message/SUCCESS_PROFILE_LOADING";
export const ERROR_PROFILE_LOADING = "@@message/ERROR_PROFILE_LOADING";

export const loadProfile = () => ({
    [RSAA]: {
        endpoint: "/api/profile.json",
        method: "GET",
        types: [
            START_PROFILE_LOADING,
            {
                type: SUCCESS_PROFILE_LOADING,
                payload: (action, state, res) => getJSON(res).then(
                    json => json,
                ), 
            },
            ERROR_PROFILE_LOADING,
        ],
    },
});