import React, { Component, createRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Box from '../components/Box'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.authMessage = createRef()
        this.authField1 = createRef()
        this.authField2 = createRef()
    }
    
    componentDidMount() {
        document.title = 'Login | IUBConnect'
    }

    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    }

    onSubmit = async (e) => {
        e.preventDefault()

        const { username, password } = this.state
        const isLoggedIn = await this.props.login(username, password)
        
        if (!isLoggedIn) {
            this.authMessage.current.className = 'login-fail-message'
            this.authField1.current.className = 'login-field auth-field'
            this.authField2.current.className = 'login-field auth-field'
        }
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
                        fontFamily: 'Inter, Oxygen, sans-serif'
                    }}>IUBConnect</h1>
                    <form onSubmit={this.onSubmit}>
                        <input className="login-field"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.onChange}
                            type="text"
                            autoComplete="off"
                            ref={this.authField1} />
                        <input className="login-field"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChange}
                            type="password"
                            ref={this.authField2} />
                        <button className="login-button" type="submit">Log In</button>
                    </form>
                    <div ref={this.authMessage} className="login-no-message">The username or password is incorrect.</div>
                    <div style={{ marginTop: '15px' }}>Don't have an account? <Link to="/register" className="inline-link">Create here</Link>.</div>
                </Box>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)