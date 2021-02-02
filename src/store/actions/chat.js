export const ADD_CHAT = "@@chat/ADD_CHAT";
export const DEL_CHAT = "@@chat/DEL_CHAT";

export const addChat = (title) => ({
    type: ADD_CHAT,
    title,
});

export const delChat = (chatId) => ({
    type: DEL_CHAT,
    chatId: chatId,
});