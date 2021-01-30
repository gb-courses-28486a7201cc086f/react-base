import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

import Router from "./components/Router";
import initStore, { history } from "./store";

import "./styles/styles.css"

const store = initStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <Router/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

