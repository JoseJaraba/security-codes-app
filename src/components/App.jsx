import React from "react";
import { UseState } from "./UseState.jsx";
import { UseReducer } from "./UseReducer.jsx";

const App = () => {
    return (
        <div className="App">
            <UseState name="UseState" />
            <UseReducer name="UseReducer" />
        </div>
    );
}

export { App };