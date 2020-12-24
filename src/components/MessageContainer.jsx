import React, { useState, useEffect } from "react";
import { MessageList } from "./MessageList";
import { SendMessageForm } from "./SendMessageForm";

import "../styles/styles.css"

/**
 * Displays list of messages and new message form.
 * Clicking "send" adds new message (using props.store.addMessage(author, text) method).
 * List of messages to display gets using props.store.getMessages() method.
 * 
 * @param {Object} props Component properties object
 * @param {Object} props.store Object which stores messages
 * @param {function(string, string): any} props.store.addMessage 
 * @param {function(): Array} props.store.getMessages 
 */
export default (props) => {
    const defaultAuthor = "user";
    const checkMsgInterval = 1000;

    // use callback inside useState to calculate initial state only once
    const [messages, setMessages] = useState(() => props.store.getMessages());
    useEffect(() => {
        let interval = setInterval(() => {
            // update component state to render new messages
            // only if new messages exists
            setMessages(oldMsg => {
                let newMsg = props.store.getMessages();
                if (newMsg.length > oldMsg.length) {
                    return newMsg;
                }
                return oldMsg;
            });
        }, checkMsgInterval);
        // cleanup
        return () => {
            clearInterval(interval);
        };
    }, []); // setup hook once

    function sendMessage(text) {
        props.store.addMessage(defaultAuthor, text);
        // update component state to render again
        setMessages(props.store.getMessages());
    };

    return (
        <div className="layout">
            <MessageList messages={messages} me={defaultAuthor}/>
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    );
};

