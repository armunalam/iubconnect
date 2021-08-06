import React, { Component } from 'react'
import { render } from 'react-dom'

import Navbar from './Navbar'

export class App extends Component {
    render() {
        return (
            <Navbar />
        )
    }
}

export default App

const container = document.getElementById("root")
render(<App />, container)