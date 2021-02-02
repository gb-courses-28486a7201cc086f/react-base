import { SET_PATH, CHANGE_CHAT, BLINK_CHAT } from "../actions/navi";
import {
    START_MESSAGE_LOADING,
    SUCCESS_MESSAGE_LOADING,
    ERROR_MESSAGE_LOADING,
    START_PROFILE_LOADING,
    SUCCESS_PROFILE_LOADING,
    ERROR_PROFILE_LOADING,
} from "../actions/api";

const initialState = {
    chatsBase: null,
    profilePath: null,
    currentChatId: null,
    blinkChatId: null,
    isLoading: false,
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

        case BLINK_CHAT:
            return {
                ...store,
                blinkChatId: action.chatId,
            }

        case START_MESSAGE_LOADING:
        case START_PROFILE_LOADING:
            return {
                ...store,
                isLoading: true,
            }

        case SUCCESS_MESSAGE_LOADING:
        case ERROR_MESSAGE_LOADING:
        case SUCCESS_PROFILE_LOADING:
        case ERROR_PROFILE_LOADING:
            return {
                ...store,
                isLoading: false,
            }
        

        default:
            return store;
    }
}