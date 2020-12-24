import React, { useState, useEffect } from "react";
import { MessageList } from "./MessageList";
import { SendMessageForm } from "./SendMessageForm";

/**
 * Displays list of messages and new message form.
 * Clicking "send" adds new message (using props.store.addMessage(author, text) method).
 * List of messages to display gets using props.store.getMessages() method.
 * 
 * @param {Object} props Component properties object
 * @param {Object} props.store Object which stores messages
 * @param {function(string, string): any} props.store.addMessage 
 * @param {function(): string[]} props.store.getMessages 
 */
export default (props) => {
    const defaultAuthor = "user";
    const checkMsgInterval = 1000;

    const [messages, setMessages] = useState(props.store.getMessages());
    useEffect(() => {
        let interval = setInterval(() => {
            // update component state to render new messages
            setMessages(props.store.getMessages());
        }, checkMsgInterval);
        // cleanup
        return () => {
            clearInterval(interval);
        };
    }, messages);

    function sendMessage(text) {
        props.store.addMessage(defaultAuthor, text);
        // update component state to render again
        setMessages(props.store.getMessages());
    };

    return (
        <div className="msg-container">
            <MessageList messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    );
};

