import React, { useState, useEffect } from "react";
import { MessageList } from "./MessageList";
import { SendMessageForm } from "./SendMessageForm";

/**
 * Displays list of messages and new message form.
 * Clicking "send" adds new message (using props.store.addMessage(author, text) method).
 * List of messages to display gets using props.store.getMessages() method.
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 * @param {Object} props.store Object which stores messages
 * @param {function(string, string, string): any} props.store.addMessage 
 * @param {function(string): Array} props.store.getMessages 
 */
export const MessageContainer = (props) => {
    const defaultAuthor = "user";
    const checkMsgInterval = 1000;
    const chatId = props.chatId;

    // use callback inside useState to calculate initial state only once
    const [messages, setMessages] = useState(() => props.store.getMessages(chatId));
    useEffect(() => {
        let interval = setInterval(() => {
            // update component state to render new messages
            // only if new messages exists
            setMessages(oldMsg => {
                let newMsg = props.store.getMessages(chatId);
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
        props.store.addMessage(chatId, defaultAuthor, text);
        // update component state to render again
        setMessages(props.store.getMessages(chatId));
    };

    return (
        <>
            <MessageList messages={messages} me={defaultAuthor}/>
            <SendMessageForm sendMessage={sendMessage} />
        </>
    );
};

