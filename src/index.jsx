import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Layout } from "./components/Layout";


ReactDOM.render(
    <MuiThemeProvider>
        <Layout chatId="1"/>
    </MuiThemeProvider>,
    document.getElementById("root")
);

