import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Box from '../components/Box'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className="login">
                <Box extraClass="login-box">
                    <h1 style={{
                        margin: '20px',
                        marginTop: '5px',
                        fontSize: '40px',
                    }}>IUBConnect</h1>
                    <form onSubmit={this.onSubmit}>
                        <input className="login-field"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.onChange}
                            type="text"
                            autocomplete="off" />
                        <input className="login-field"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            type="password" />
                        {/* <Link to="/"> */}
                        <button className="login-button" type="submit">Log In</button>
                        {/* </Link> */}
                    </form>
                    <div style={{ marginTop: "15px" }}>Don't have an account? <Link to="/" className="inline-link">Create here</Link>.</div>
                </Box>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)