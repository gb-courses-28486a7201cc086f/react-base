/**
 * MessageStore is container for chat messages
 * 
 */
export class MessageStore {
    constructor() {
        this._bot = {
            "name": "bot",
            "answerText": "Не приставай ко мне, я робот!",
            "delay": 1000
        };
        this._chats = {
            "1": {title: "Brendan Lim"},
            "2": {title: "Eric Hoffman"},
            "3": {title: "Grace Ng"},
            "4": {title: "Kerem Suer"},
            "5": {title: "Raquel Parrado"},
        };
        this._messages = {};
        // fill all chats with default welcome messges
        for (let key in this._chats) {
            this._messages[key] = this._getWelcomeMsg(this._chats[key].title);
        }
    }

    _getWelcomeMsg(name) {
        return [
            {author: this._bot.name, text: `Привет, я ${name}!`},
            {author: this._bot.name, text: "Как дела?"}
        ];
    }

    _answer(chatId) {
        let id = +chatId;
        setTimeout(() => {
            this._messages[id].push({
                author: this._bot.name,
                text: this._bot.answerText
            });
        }, this._bot.delay);
    }

    getMessages(chatId) {
        let id = +chatId;
        if (id in this._messages) {
            return [...this._messages[id]];
        }
        console.warn("Trying to get messages from undefined chat, id=${chatId}");
        return [];
    }

    addMessage(chatId, author, text) {
        let id = +chatId;
        let msg = {
            author: author,
            text: text
        };
        this._messages[id].push(msg);
        this._answer(id);
        return msg;
    }

    getChatTitles() {
        let result = {};
        for (let key in this._chats) {
            result[key] = this._chats[key].title;
        }
        return result;
    }

    addChat(chatTitle) {
        let nextId = (Object.keys(this._chats).length + 1).toString();
        this._chats[nextId] = {title: chatTitle};
        this._messages[nextId] = this._getWelcomeMsg(chatTitle);
        return nextId;
    }
}

