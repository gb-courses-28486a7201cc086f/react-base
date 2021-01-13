import React, { useRef, useEffect } from "react";
import { Message } from "./Message";

/**
 * Displays list of messages
 * 
 * @param {Object} props Component properties object
 * @param {Array} props.messages Collection of messages
 * @param {string} props.me Name of current user
 */
export const MessageList = (props) => {
    const bottomEl = useRef(null);

    useEffect(() => {
        bottomEl.current.scrollIntoView({ behavior: "smooth" });
    }, [props.messages]); // scroll down when messages list updated

    function makeMessage(msg, idx) {
        return <Message message={msg} key={`message_${idx}`} me={props.me}/>
    }

    return (
        <div className="message-field">
            {props.messages.map(makeMessage)}
            <div ref={bottomEl}></div>
        </div>
    );
};