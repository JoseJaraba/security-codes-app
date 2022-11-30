import React from "react";
import { UseState } from "./UseState.jsx";
import { ClassState } from "./ClassState.jsx";

const App = () => {
    return (
        <div className="App">
            <UseState name="UseState" />
            <ClassState name="ClassState" />
        </div>
    );
}

export { App };