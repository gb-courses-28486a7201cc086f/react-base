import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom'

import Layout from './Layout';
import Profile from './Profile';
import { setPath } from "../store/actions/navi";

const chatsBase = "/chats";
const profilePath = "/profile/";

/**
 * Appication router
 * 
 * @param {Object} props Component properties object
 * @param {function(Object)} props.setPath (redux) Action to save router config to store 
 */
const Router = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPath({
            chatsBase: chatsBase,
            profilePath: profilePath,
        }));
    }, []);

    return (
        <Switch>
            <Route exact path="/" component={Layout}/>
            <Route exact path={`${chatsBase}/:chatId/`} render={ 
                (props) => <Layout chatId={props.match.params.chatId}/>
            }/>
            <Route exact path={profilePath} component={Profile} />
        </Switch>
    );
}

export default Router;