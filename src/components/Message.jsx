import React from "react";

/**
 * Displays single message
 * 
 * @param {Object} props Component properties object
 * @param {Object} props.message Message content
 * @param {string} props.message.author Author of message
 * @param {string} props.message.text Text of message
 */
export const Message = (props) => {
    return <div className="msg">{props.message.author}&gt;&gt;&gt; {props.message.text}</div>;
};
