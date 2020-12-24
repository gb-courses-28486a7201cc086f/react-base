import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MessageContainer from "./components/MessageContainer";


class MessageStore {
    constructor() {
        this.bot = {
            "name": "bot",
            "answerText": "Не приставай ко мне, я робот!",
            "delay": 1000
        }
        this.messages = [
            {author: this.bot.name, text: "Привет!"},
            {author: this.bot.name, text: "Как дела?"}
        ];
    }

    _answer() {
        setTimeout(() => {
            this.messages.push({
                author: this.bot.name,
                text: this.bot.answerText
            });
        }, this.bot.delay);
    }

    getMessages() {
        return [...this.messages];
    }

    addMessage(author, text) {
        let msg = {
            author: author,
            text: text
        };
        this.messages.push(msg);
        this._answer();
        return msg;
    }
}


ReactDOM.render(
    <MuiThemeProvider>
        <MessageContainer store={new MessageStore()} />
    </MuiThemeProvider>,
    document.getElementById("root")
);

