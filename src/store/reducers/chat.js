import { ADD_CHAT } from "../actions/chat";

const initialState = [
    {chatId: "1", title: "Brendan Lim"},
    {chatId: "2", title: "Eric Hoffman"},
    {chatId: "3", title: "Grace Ng"},
    {chatId: "4", title: "Kerem Suer"},
    {chatId: "5", title: "Raquel Parrado"},
];

export default function chatReducer(store=initialState, action) {
    switch (action.type) {
        case ADD_CHAT:
            const newChat = {
                chatId: (store.length + 1).toString(),
                title: action.title,
            };

            return [...store, newChat];

        default:
            return store;
    }
}