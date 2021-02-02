import { SEND_MESSAGE } from "../actions/message";
import { DEL_CHAT } from "../actions/chat";
import { SUCCESS_MESSAGE_LOADING } from "../actions/api";

const initialState = {};

export default function messageReducer(store=initialState, action) {
    let newStore;

    switch (action.type) {
        case SEND_MESSAGE:
            const msgList = action.chatId in store? store[action.chatId] : [];

            const newMsg = {
                author: action.author,
                text: action.text,
            };

            newStore = {...store};
            newStore[action.chatId] = [...msgList, newMsg];

            return newStore;

        case DEL_CHAT:
            // filter out messages from chat with ID defined at delete action
            newStore = {};
            for (let key in store) {
                if (key !== action.chatId) {
                    newStore[key] = store[key];
                }
            }
            return newStore;            

        case SUCCESS_MESSAGE_LOADING:
            newStore = {};
            for (let item of action.payload) {
                if (item.messages.length != 0) {
                    newStore[item.chatId] = item.messages;
                }
            }

            return newStore;

        default:
            return store;
    }
}