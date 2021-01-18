import React, { useState, useEffect, useRef } from "react";
import { bindActionCreators } from "redux";
import connect from  "react-redux/es/connect/connect";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

import { sendMessage } from "../store/actions/message";

/**
 * Displays input for new message and "send" button.
 * 
 * @param {Object} props Component properties object
 * @param {string} props.me (redux) Name of current user
 * @param {string} props.currentChatId (redux) ID of currently selected chat
 * @param {function(string)} props.sendMessage (redux action) Callback for sending new message from input
 */
const SendMessageForm = (props) => {
    const [text, setText] = useState("");
    // focus on send form when chat changed
    const formFocus = useRef(null);
    useEffect(() => {
        formFocus.current.focus();
    }, [props.currentChatId]); 

    const send = (text) => {
        props.sendMessage(props.currentChatId, props.me, text);
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

const mapStateToProps = ({naviReducer, profileReducer}) => ({
    me: profileReducer.name,
    currentChatId: naviReducer.currentChatId,
});

const mapDispatchToProps = dispatch => bindActionCreators({sendMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);