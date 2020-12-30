import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Layout } from './Layout';

const defaultChatId = 1;

export const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" render={ () => <Layout chatId={defaultChatId}/>}/>
            <Route exact path="/chat/:chatId" render={
                (obj) => <Layout chatId={+obj.match.params.chatId}/>
            }/>
        </Switch>
    );
}