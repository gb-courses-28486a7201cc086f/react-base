import React, { useState } from "react";

const SendMessageButton = (props) => {
    return <button onClick={props.onClick}>Отправить сообщение</button>
};

const Message = (props) => {
    return <div className="msg">{props.text}</div>;
};

const MessageList = (props) => {
    return (
        <div className="msg-list">
            { props.messages.map((msg) => <Message text={msg} />)}
        </div>
    );
};

/**
 * Displays list of messages and "send" button.
 * Clicking "send" adds new message (using props.store.addMessage(text) method).
 * List of messages to display gets using props.store.getMessages() method.
 * 
 * @param {Object} props Component properties object
 * @param {Object} props.store Object which stores messages
 * @param {function(string)} props.store.addMessage 
 * @param {function(): string[]} props.store.getMessages 
 */
export const MessageContainer = (props) => {
    const defaultMsgText = "Нормально";

    const [sentCounter, setSentCounter] = useState(0);

    function onMsgSend(e) {
        props.store.addMessage(defaultMsgText);
        setSentCounter(sentCounter + 1);
    };

    return (
        <div className="msg-container">
            <MessageList messages={props.store.getMessages()} />
            <SendMessageButton onClick={onMsgSend} />
        </div>
    );
};

