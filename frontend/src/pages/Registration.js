import React, { Component } from 'react'
import axios from 'axios'
import Box from '../components/Box'
import API_URL from '../urls'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GridBox from '../components/GridBox';
// import DatePicker from "react-datepicker";
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
        user_type: '',
        department_list: [],
        department: '',
        gender: '',
        phone: '',
        day: '',
        month: '',
        year: '',
        dayNum: [],
        monthName: [],
        yearNum: [],
    }

    componentDidMount() {
        document.title = 'Registration | IUBConnect'
        
        const bDay = []
        const bMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const bYear = []
        for (let i = 1; i <= 31; i++) {
            if (i >= 10)
                bDay.push(`${i}`)
            else bDay.push(`0${i}`)
        }
        for (let i = new Date().getFullYear(); i >= 1930; i--)
            bYear.push(`${i}`)
        this.setState({
            dayNum: bDay,
            monthName: bMonth,
            yearNum: bYear
        })


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

        if (this.state.password !== this.state.password_confirm) {
            alert('Passwords do not match')
            return
        }

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
            console.log(`${this.year}-${this.month}-${this.day}`)

            const responseAccount = await axios.post(`${API_URL}/account/`, {
                user: userID,
                iub_id_number: this.state.iub_id_number,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                date_of_birth: `${this.state.year}-${this.state.month}-${this.state.day}`,
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
            alert('Something went wrong, please try again later.')
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
                            {/* <div className="form-fields"> */}
                            <GridBox>
                                <input className="registration-field"
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    onChange={this.onChange} />
                                <input className="registration-field"
                                    name="iub_id_number"
                                    placeholder="IUB ID number"
                                    type="text"
                                    autoComplete="off"
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
                                    autoComplete="off"
                                    required
                                    onChange={this.onChange} />
                                <input className="registration-field"
                                    name="last_name"
                                    placeholder="Last name"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    onChange={this.onChange} />
                                <input className="registration-field"
                                    name="email"
                                    placeholder="Email"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    onChange={this.onChange} />
                                <input className="registration-field"
                                    name="phone"
                                    placeholder="Phone number"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    onChange={this.onChange} />
                            </GridBox>
                            <div className="grid-three" style={{ marginTop: '20px' }}>
                                <select className="registration-field"
                                    name="department"
                                    type="text"
                                    required
                                    onChange={this.onChange}>
                                    <option
                                        value="" selected disabled hidden
                                    >Department</option>
                                    {this.state.department_list.map((item, index) =>
                                        <option key={item.department_id}
                                            value={item.department_id}
                                            style={{ fontSize: '20px' }}>
                                            {item.department_name}
                                        </option>
                                    )}
                                </select>
                                {/* <DatePicker className="registration-field"
                                    placeholderText="Date of birth"
                                    dateFormat="yyyy-MM-dd"
                                    // showMonthDropdown
                                    showYearDropdown
                                    // minDate={subDays(new Date(), 1000000)}
                                    // adjustDateOnChange
                                    onSelect={this.state.date_of_birth}
                                    selected={this.state.date_of_birth}
                                    onChange={(dateSelect) => this.setState({ date_of_birth: dateSelect })} /> */}
                                <select className="registration-field"
                                    name="user_type"
                                    type="text"
                                    required
                                    onChange={this.onChange}>
                                    <option
                                        value="" selected disabled hidden
                                    >User type</option>
                                    <option value="Student">Student</option>
                                    <option value="Faculty">Faculty</option>
                                    <option value="Alumnus">Alumnus</option>
                                </select>
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
                            <div className="grid-four"
                                style={{
                                    marginTop: '20px'
                                }}>
                                <div className="field-label">Date of birth:</div>
                                <select className="registration-field"
                                    name="day"
                                    value={this.state.day}
                                    onChange={this.onChange}
                                    type="text"
                                    required>
                                    <option
                                        value="" selected disabled hidden
                                    >Day</option>
                                    {this.state.dayNum.map((item) =>
                                        <option key={item}
                                            value={item}
                                            style={{ fontSize: '20px' }}>
                                            {item}
                                        </option>
                                    )}
                                </select>
                                <select className="registration-field"
                                    name="month"
                                    value={this.state.month}
                                    onChange={this.onChange}
                                    type="text"
                                    required>
                                    <option
                                        value="" selected disabled hidden
                                    >Month</option>
                                    {this.state.monthName.map((item, i) =>
                                        <option key={item}
                                            value={i + 1 >= 10 ? `${i + 1}` : `0${i + 1}`}
                                            style={{ fontSize: '20px' }}>
                                            {item}
                                        </option>
                                    )}
                                </select>
                                <select className="registration-field"
                                    name="year"
                                    value={this.state.year}
                                    onChange={this.onChange}
                                    type="text"
                                    required>
                                    <option
                                        value="" selected disabled hidden
                                    >Year</option>
                                    {this.state.yearNum.map((item) =>
                                        <option key={item}
                                            value={item}
                                            style={{ fontSize: '20px' }}>
                                            {item}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <button className="registration-button" type="submit" style={{
                                marginTop: '20px'
                            }}>Sign Up</button>
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
