import React from "react";
import ReactDOM from "react-dom";

import { MessageContainer } from "./components/messages.jsx";

class MessageStore {
    constructor() {
        this.messages = ["Привет!", "Как дела?"];
    }

    getMessages() {
        return this.messages;
    }

    addMessage(text) {
        this.messages.push(text);
        console.log(this.messages);
    }
}

ReactDOM.render(
    <MessageContainer store={new MessageStore()} />,
    document.getElementById("root")
);

