import React from "react";

import { Header } from "./Header";
import { ChatList } from "./ChatList";
import { MessageContainer } from "./MessageContainer";
import { MessageStore } from "../MessageStore";

export const Layout = (props) => {
    return (
        <div className="layout">
            <Header/>
            <div className="content-container">
                <ChatList/>
                <MessageContainer store={new MessageStore()}/>
            </div>
        </div>
    );
}