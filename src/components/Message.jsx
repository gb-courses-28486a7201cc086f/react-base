import React from "react";

/**
 * Displays single message
 * 
 * @param {Object} props Component properties object
 * @param {Object} props.message Message content
 * @param {string} props.message.author Author of message
 * @param {string} props.message.text Text of message
 * @param {string} props.me Name of current user
 */
export const Message = (props) => {
    let align = props.message.author === props.me? "flex-end" : "flex-start";

    return (
        <div className="message" style={{alignSelf: align}}>
            <div>{props.message.text}</div>
            <div className="message-sender">{props.message.author}</div>
        </div>
    );
};
