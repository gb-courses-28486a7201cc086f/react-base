import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
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
    useEffect(() => {
        props.setPath({
            chatsBase: chatsBase,
            profilePath: profilePath,
        });
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

const mapDispatchToProps = dispatch => bindActionCreators({setPath}, dispatch);

export default connect(null, mapDispatchToProps)(Router);