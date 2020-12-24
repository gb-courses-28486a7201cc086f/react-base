import React, { useState, useRef, useEffect } from "react";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';


/**
 * Displays input for new message and "send" button.
 * 
 * @param {Object} props Component properties object
 * @param {function(string)} props.sendMessage Callback for sending new message from input
 */
export const SendMessageForm = (props) => {
    const [text, setText] = useState("");
    const textInput = useRef(null);
    useEffect(() => {
        textInput.current.focus();
    }, []); // focus only once

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleKeyUp(e) {
        // send on enter
        if (e.keyCode === 13) {
            props.sendMessage(text);
            setText("");
        }
    }

    function handleClick() {
        props.sendMessage(text);
        setText("");
    }

    return (
        <div className="message-new-container">
            <TextField 
                fullWidth={ true }
                hintText="Введите сообщение"
                ref={textInput}
                value={text} 
                onChange={handleChange} 
                onKeyUp={handleKeyUp}            
            />
            <FloatingActionButton onClick={handleClick}>
                <SendIcon/>
            </FloatingActionButton>
        </div>
    );
};