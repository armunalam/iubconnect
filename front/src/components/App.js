import React, { Component } from 'react'
import { render } from "react-dom";

export class App extends Component {
    render() {
        return (
            <div>
                Hello World 6
            </div>
        )
    }
}

export default App

const container = document.getElementById("app")
render(<App />, container)