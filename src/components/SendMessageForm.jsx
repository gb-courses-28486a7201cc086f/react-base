import React, { useState, useEffect, useRef } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

import { sendMessage } from "../store/actions/message";

/**
 * Displays input for new message and "send" button.
 * 
 * @param {Object} props Component properties object
 */
const SendMessageForm = (props) => {
    const state = useSelector(state => ({
        me: state.profileReducer.name,
        currentChatId: state.naviReducer.currentChatId,
    }), shallowEqual);
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    // focus on send form when chat changed
    const formFocus = useRef(null);
    useEffect(() => {
        formFocus.current.focus();
    }, [state.currentChatId]); 

    const send = (text) => {
        dispatch(sendMessage(state.currentChatId, state.me, text));
        setText("");
    };

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleKeyUp(e) {
        // send on enter
        if (e.keyCode === 13) {
            send(text);
        }
    }

    function handleClick() {
        send(text);
    }

    return (
        <div className="message-new-container">
            <TextField 
                fullWidth={ true }
                hintText="Введите сообщение"
                ref={formFocus}
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

export default SendMessageForm;