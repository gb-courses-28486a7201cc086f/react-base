import React from "react";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from 'material-ui/Avatar';
import Typography from '@material-ui/core/Typography';

import { Header } from "./Header";

import "../styles/styles.css"

/**
 * Displays user profile page
 */
export const Profile = (props) => {
    const chatsButton = (
        <Link to={"/"}>
            <Button color="inherit">Чаты</Button>
        </Link>
    );
    
    return (
        <div className="root">
            <Header 
                title={"Профиль"}
                rightButton={chatsButton}
                />
            <Grid container className="content-container">
                <Grid 
                    container 
                    direction="column"
                    alignItems="center"
                    style={{padding: "50px"}}
                    >
                    <Grid item xs>
                        <Avatar 
                            src={`https://picsum.photos/seed/1000/600`}
                            style={{width: "100px", height: "100px"}}
                            />
                        <br/>
                        <Typography variant="h3">User</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}