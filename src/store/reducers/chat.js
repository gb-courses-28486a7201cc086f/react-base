import { ADD_CHAT, DEL_CHAT } from "../actions/chat";
import { SUCCESS_MESSAGE_LOADING } from "../actions/api";

/*
const initialState = [
    {chatId: "1", title: "Brendan Lim"},
    {chatId: "2", title: "Eric Hoffman"},
    {chatId: "3", title: "Grace Ng"},
    {chatId: "4", title: "Kerem Suer"},
    {chatId: "5", title: "Raquel Parrado"},
];
*/
const initialState = [];

export default function chatReducer(store=initialState, action) {
    switch (action.type) {
        case ADD_CHAT:
            const newChat = {
                chatId: (store.length + 1).toString(),
                title: action.title,
            };

            return [...store, newChat];

        case DEL_CHAT:
            // filter out chat with ID from delete action
            return store.filter((item) => !(action.chatId === item.chatId));

        case SUCCESS_MESSAGE_LOADING:
            return action.payload.filter((item) => ({
                chatId: item.chatId,
                title: item.title,
            }));

        default:
            return store;
    }
}