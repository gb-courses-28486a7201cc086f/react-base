import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from 'material-ui/Avatar';
import Typography from '@material-ui/core/Typography';

import { Header } from "./Header";
import { loadProfile } from "../store/actions/api";

/**
 * Displays user profile page
 * 
 * @param {Object} props Component properties object
 */
const Profile = (props) => {
    const chatsButton = (
        <Link to={"/"}>
            <Button color="inherit">Чаты</Button>
        </Link>
    );

    const name = useSelector(state => state.profileReducer.name);
    
    return (
        <div className="root">
            <Header 
                title={`Профиль: ${name}`}
                rightButton={chatsButton}
                />
            <Grid container className="content-container">
                <Grid 
                    container 
                    direction="column"
                    alignItems="center"
                    style={{padding: "50px"}}
                    >
                    <Grid 
                        item xs
                        style={{textAlign: "center"}}
                        >
                        <Avatar 
                            src={`https://picsum.photos/seed/1000/600`}
                            style={{width: "100px", height: "100px"}}
                            />
                        <br/>
                        <Typography variant="h3">{`${name}`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Profile;