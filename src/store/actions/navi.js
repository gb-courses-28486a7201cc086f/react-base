export const SET_PATH = "@@navi/SET_PATH";
export const CHANGE_CHAT = "@@navi/CHANGE_CHAT";
export const BLINK_CHAT = "@@navi/BLINK_CHAT";

export const setPath = (config) => ({
    type: SET_PATH,
    ...config,
});

export const changeChat = (chatId) => ({
    type: CHANGE_CHAT,
    chatId: chatId,
});

export const blinkChat = (chatId) => ({
    type: BLINK_CHAT,
    chatId: chatId,
});