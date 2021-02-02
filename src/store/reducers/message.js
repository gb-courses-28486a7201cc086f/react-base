import { SEND_MESSAGE } from "../actions/message";

const initialState = {};

export default function messageReducer(store=initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            const msgList = action.chatId in store? store[action.chatId] : [];

            const newMsg = {
                author: action.author,
                text: action.text,
            };

            let newStore = {...store};
            newStore[action.chatId] = [...msgList, newMsg];

            return newStore;

        default:
            return store;
    }
}