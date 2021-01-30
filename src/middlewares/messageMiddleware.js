import { SEND_MESSAGE, sendMessage } from "../store/actions/message";
import { CHANGE_CHAT } from "../store/actions/navi";

const messageBot = {
    name: "bot",
    answerText: "Не приставай ко мне, я робот!",
    delay: 3000,
    getWelcome: function(name) {
        return [
            {author: this.name, text: `Привет, я ${name}!`},
            {author: this.name, text: "Как дела?"}
        ];
    },
};

/**
 * Chat bot effect: send welcome and answer to user
 */
export default store => next => action => {
    const state = store.getState();
    let chatId;

    switch(action.type) {
        case SEND_MESSAGE:
            // chat not changed -> use id from state
            chatId = state.naviReducer.currentChatId
            // answer to user message:
            // last message is not from bot -> should answer
            if (action.author !== messageBot.name) {
                setTimeout(() => {
                    store.dispatch(
                        sendMessage(chatId, messageBot.name, messageBot.answerText)
                    );
                }, messageBot.delay);
            }
            break;
        
        case CHANGE_CHAT:
            // new chat selected -> use id from action
            chatId = action.chatId;
            const selectedChat = state.chatReducer.filter((c) => c.chatId === chatId)[0];
            const chatTitle = selectedChat === undefined? null : selectedChat.title;
            const messages = state.messageReducer[chatId];
            // send welcome from bot:
            // messages is undefined -> it is new chat
            if (messages === undefined) {
                let welcome = messageBot.getWelcome(chatTitle);
                welcome.map(({author, text}) => {
                    store.dispatch(
                        sendMessage(chatId, author, text)
                    );
                })
            }
            break;
            
    }
    return next(action);
}