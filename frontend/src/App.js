import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Connections from './pages/Connections'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/PrivateRoute'
import { loadUser } from './actions/auth'

export default class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {/* <Navbar app={this} />
                <Sidebar app={this} />
                <div className={this.state.sidebar ? "main-body" : "main-body main-body-sidebar"}>
                    <Switch>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/profile" exact component={Profile} />
                        <Route path="/connections" exact component={Connections} />
                    </Switch>
                </div> */}
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/register" component={Registration} />
                        <PrivateRoute component={MainView} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

class MainView extends Component {
    state = {
        sidebar: true,
        dropdown: false,
    }

    componentDidMount() {
        if (window.innerWidth <= 850) {
            this.setState({ sidebar: false })
        } else {
            this.setState({ sidebar: true })
        }
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
            <>
                <Navbar app={this} />
                <Sidebar app={this} />
                <div className={this.state.sidebar ? "main-body" : "main-body main-body-sidebar"}>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/connections" component={Connections} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </>
        )
    }
}


function PageNotFound() {
    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            height: '100vh',
            marginTop: '-60px'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1>Page Not Found</h1>
                <p>Go back to <Link to="/" className="inline-link">homepage</Link>.</p>
            </div>
        </div >
    )
}
