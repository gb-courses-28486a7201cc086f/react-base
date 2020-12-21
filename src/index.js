import React from "react";
import ReactDOM from "react-dom";

import { hello } from "./helper";

hello();

const Element = (props) => <h1 className="element">Hello, React!</h1>;

ReactDOM.render(
    <Element/>,
    document.getElementById("root")
);
