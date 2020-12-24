import React from "react";
import { Message } from "./Message";

/**
 * Displays list of messages
 * 
 * @param {Object} props Component properties object
 * @param {Array} props.messages Collection of messages
 */
export const MessageList = (props) => {
    return (
        <div className="msg-list">
            {props.messages.map((msg, idx) => <Message message={msg} key={`message_${idx}`}/>)}
        </div>
    );
};