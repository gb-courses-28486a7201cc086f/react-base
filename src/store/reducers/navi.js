import { SET_PATH, CHANGE_CHAT, BLINK_CHAT } from "../actions/navi";

const initialState = {
    chatsBase: null,
    profilePath: null,
    currentChatId: null,
    blinkChatId: null,
};

export default function naviReducer(store=initialState, action) {
    switch (action.type) {
        case SET_PATH:
            return {
                ...store,
                chatsBase: action.chatsBase,
                profilePath: action.profilePath,
            };
            break;

        case CHANGE_CHAT:
            return {
                ...store,
                currentChatId: action.chatId,
            }
            break;

        case BLINK_CHAT:
            return {
                ...store,
                blinkChatId: action.chatId,
            }
            break;

        default:
            return store;
    }
}