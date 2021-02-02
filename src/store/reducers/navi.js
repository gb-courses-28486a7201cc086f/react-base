import { SET_PATH, CHANGE_CHAT } from "../actions/navi";

const initialState = {
    chatsBase: null,
    profilePath: null,
    currentChatId: null,
};

export default function naviReducer(store=initialState, action) {
    switch (action.type) {
        case SET_PATH:
            return {
                ...store,
                chatsBase: action.chatsBase,
                profilePath: action.profilePath,
            };

        case CHANGE_CHAT:
            return {
                ...store,
                currentChatId: action.chatId,
            }

        default:
            return store;
    }
}