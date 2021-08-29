import React, { Component } from 'react'
import axios from 'axios'
import Box from '../components/Box'
import API_URL from '../urls'
import DatePicker from "react-datepicker";
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'
// import { addDays, subDays } from 'date-fns';

class Registration extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    }
    
    state = {
        username: '',
        password: '',
        password_confirm: '',
        iub_id_number: '',
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        user_type: '',
        department_list: [],
        department: '',
        gender: '',
        phone: '',
    }

    componentDidMount() {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        axios
            .get(`${API_URL}/department/`)
            .then(response => {
                this.setState({ department_list: response.data })
                console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        const configUser = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
            }, configUser)

            console.log(response)
            const userID = response.data.user.id
            const token = response.data.token
            console.log(userID)
            console.log(token)

            const configAccount = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            }

            const responseAccount = await axios.post(`${API_URL}/account/`, {
                user: userID,
                iub_id_number: this.state.iub_id_number,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                // date_of_birth: this.state.date_of_birth,
                user_type: this.state.user_type,
                department: this.state.department,
                phone: this.state.phone,
                gender: this.state.gender,
            }, configAccount)
            
            console.log(responseAccount)
            
            window.localStorage.setItem('token', token)
            window.location.reload()
            
            
        } catch (error) {
            console.log(error)
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
            <div className="unauthenticated-body">
                <div className="registration">
                    <Box extraClass="registration-box">
                        <h1 style={{
                            margin: '14px',
                            marginTop: '10px',
                            fontSize: '40px',
                            fontFamily: 'Inter, Oxygen, sans-serif'
                        }}>IUBConnect</h1>
                        <h2 style={{
                            margin: '14px',
                            marginTop: '5px',
                        }}>Create your account</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-fields">
                                <input className="registration-field"
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    onChange={this.onChange} />

                                <input className="registration-field"
                                    name="iub_id_number"
                                    placeholder="IUB ID number"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    onChange={this.onChange} />

                                <input className="login-field"
                                    name="password"
                                    placeholder="New password"
                                    type="password"
                                    required
                                    onChange={this.onChange} />

                                <input className="login-field"
                                    name="password_confirm"
                                    placeholder="Confirm password"
                                    type="password"
                                    required
                                    onChange={this.onChange} />

                                <input className="registration-field"
                                    name="first_name"
                                    placeholder="First name"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    onChange={this.onChange} />

                                <input className="registration-field"
                                    name="last_name"
                                    placeholder="Last name"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    onChange={this.onChange} />

                                <input className="registration-field"
                                    name="email"
                                    placeholder="Email"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    onChange={this.onChange} />

                                <select className="registration-field"
                                    name="department"
                                    type="text"
                                    required
                                    onChange={this.onChange}>
                                    <option
                                        value="" selected disabled hidden
                                    >Select Department</option>
                                    {this.state.department_list.map((item, index) =>
                                        <option key={item.department_id}
                                            value={item.department_id}
                                            style={{ fontSize: '20px' }}>
                                            {item.department_name}
                                        </option>
                                    )}
                                </select>

                                <DatePicker className="registration-field"
                                    placeholderText="Date of birth"
                                    dateFormat="yyyy-MM-dd"
                                    // showMonthDropdown
                                    showYearDropdown
                                    // minDate={subDays(new Date(), 1000000)}
                                    // adjustDateOnChange
                                    onSelect={this.state.date_of_birth}
                                    selected={this.state.date_of_birth}
                                    onChange={(dateSelect) => this.setState({ date_of_birth: dateSelect })} />

                                <select className="registration-field"
                                    name="user_type"
                                    type="text"
                                    required
                                    onChange={this.onChange}>
                                    <option
                                        value="" selected disabled hidden
                                    >User Type</option>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Alumnus">Alumnus</option>
                                </select>
                                
                                <input className="registration-field"
                                    name="phone"
                                    placeholder="Phone Number"
                                    type="text"
                                    autocomplete="off"
                                    required
                                    onChange={this.onChange} />
                                
                                <select className="registration-field"
                                    name="gender"
                                    type="text"
                                    required
                                    onChange={this.onChange}>
                                    <option
                                        value="" selected disabled hidden
                                    >Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <button className="registration-button" type="submit">Sign Up</button>
                        </form>
                        <div style={{ marginTop: '90px', textAlign: 'center' }}>Already have an account? <Link to="/login" className="inline-link">Log in</Link>.</div>
                    </Box>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Registration)