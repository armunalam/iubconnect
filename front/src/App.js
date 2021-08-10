import React, { Component } from 'react'
import { render } from 'react-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Connections from './pages/Connections'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default class App extends Component {
    state = {
        sidebar: true,
        dropdown: false,
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 850) {
                this.setState({ sidebar: false })
            } else {
                this.setState({ sidebar: true })
            }
        })
    }

    componentDidUpdate() {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 850) {
                this.setState({ sidebar: false })
            } else {
                this.setState({ sidebar: true })
            }
        })
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar app={this} />
                <Sidebar app={this} />
                <div className={this.state.sidebar ? "main-body" : "main-body main-body-sidebar"}>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/connections" exact component={Connections} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

const container = document.getElementById("root")
render(<App />, container)