
/**
 * MessageStore is container for chat messages
 * 
 */
export class MessageStore {
    constructor() {
        this.bot = {
            "name": "bot",
            "answerText": "Не приставай ко мне, я робот!",
            "delay": 1000
        };
        this.chats = {
            "1": {name: "Brendan Lim"},
            "2": {name: "Eric Hoffman"},
            "3": {name: "Grace Ng"},
            "4": {name: "Kerem Suer"},
            "5": {name: "Raquel Parrado"},
        };
        this.messages = {};
        // fill all chats with default welcome messges
        for (let key in this.chats) {
            this.messages[key] = [
                {author: this.bot.name, text: `Привет, я ${this.chats[key].name}!`},
                {author: this.bot.name, text: "Как дела?"}
            ];
        }
    }

    _answer(chatId) {
        setTimeout(() => {
            this.messages[chatId].push({
                author: this.bot.name,
                text: this.bot.answerText
            });
        }, this.bot.delay);
    }

    getMessages(chatId) {
        return [...this.messages[chatId]];
    }

    addMessage(chatId, author, text) {
        let msg = {
            author: author,
            text: text
        };
        this.messages[chatId].push(msg);
        this._answer(chatId);
        return msg;
    }
}

