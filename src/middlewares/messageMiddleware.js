import { SEND_MESSAGE, sendMessage } from "../store/actions/message";
import { CHANGE_CHAT, blinkChat } from "../store/actions/navi";

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
    const chatId = action.chatId;

    switch(action.type) {
        case SEND_MESSAGE:
            // answer to user message:
            // last message is not from bot -> should answer
            if (action.author !== messageBot.name) {
                setTimeout(() => {
                    store.dispatch(
                        sendMessage(chatId, messageBot.name, messageBot.answerText)
                    );
                }, messageBot.delay);
            } 
            // last message from bot -> should highlight chat ("blink")
            else {
                store.dispatch(
                    blinkChat(chatId)
                );
            }
            break;
        
        case CHANGE_CHAT:
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