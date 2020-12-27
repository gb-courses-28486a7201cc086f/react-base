import React, { useState } from "react";

/**
 * Displays input for new message and "send" button.
 * 
 * @param {Object} props Component properties object
 * @param {function(string)} props.sendMessage Callback for sending new message from input
 */
export const SendMessageForm = (props) => {
    const [text, setText] = useState("");

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleClick() {
        props.sendMessage(text);
        setText("");
    }

    return (
        <div>
            <input type="text" value={text} onChange={handleChange}/><br/>
            <button onClick={handleClick}>Отправить сообщение</button>
        </div>
    );
};