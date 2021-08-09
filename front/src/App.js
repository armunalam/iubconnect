import React, { Component } from 'react'
import { render } from 'react-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Profile from './pages/Profile'

export class App extends Component {
    state = {
        sidebar: true,
        dropdown: false,
    }

    render() {
        return (
            <>
                <Navbar app={this} />
                <Sidebar app={this} />
                <div className={this.state.sidebar ? "main-body" : "main-body main-body-sidebar"}>
                    <Profile />
                </div>
            </>
        )
    }
}

export default App

const container = document.getElementById("root")
render(<App />, container)