export const SEND_MESSAGE = "@@message/SEND_MESSAGE";

export const sendMessage = (chatId, author, text) => ({
    type: SEND_MESSAGE,
    chatId, 
    author, 
    text,
});