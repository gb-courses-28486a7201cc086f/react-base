import React, { useState, useEffect, useRef } from "react";
import { MessageList } from "./MessageList";
import { SendMessageForm } from "./SendMessageForm";

/**
 * Displays list of messages and new message form.
 * Clicking "send" adds new message (using props.store.addMessage(author, text) method).
 * List of messages to display gets using props.store.getMessages() method.
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 * @param {function(string, string): any} props.addMessage 
 * @param {function(): Array} props.getMessages 
 */
export const MessageContainer = (props) => {
    const defaultAuthor = "user";
    const checkMsgInterval = 1000;

    // focus on send form when subscription changed
    const formFocus = useRef(null);
    useEffect(() => {
        formFocus.current.focus();
    }, [props.getMessages]); 

    // use callback inside useState to calculate initial state only once
    const [messages, setMessages] = useState(() => props.getMessages());

    // rerender when new messages has been received
    // update hook when subsription has changed
    useEffect(() => {
        let interval = setInterval(() => {
            // update component state to render new messages
            // only if new messages exists
            setMessages(oldMsg => {
                let newMsg = props.getMessages();
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
    }, [props.getMessages]);

    // update message list immideatly when subsription has changed
    useEffect(() => {
        setMessages(props.getMessages());
    }, [props.getMessages]);

    function sendMessage(text) {
        props.addMessage(defaultAuthor, text);
        // update component state to render again
        setMessages(props.getMessages());
    };

    return (
        <>
            <MessageList messages={messages} me={defaultAuthor}/>
            <SendMessageForm 
                sendMessage={sendMessage}
                focusRef={formFocus}
                />
        </>
    );
};

