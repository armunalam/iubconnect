import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Box from '../components/Box'
import API_URL from '../urls'

function Settings() {
    const [departmentList, setDepartmentList] = useState([])

    const [birthday, setBirthday] = useState({
        day: [''],
        month: [''],
        year: ['']
    })

    const [fieldInfo, setFieldInfo] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        iub_id_number: '',
        email: '',
        phone: '',
        department: '',
        user_type: '',
        gender: '',
        day: '',
        month: '',
        year: '',
    })

    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: '',
        currentPassword: ''
    })

    const message = useRef()
    const messageFail = useRef()
    const messagePassword = useRef()
    const messagePasswordFail = useRef()

    useEffect(() => {
        document.title = 'Settings | IUBConnect'
        
        // Date of birth selectors
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
        setBirthday({
            day: bDay,
            month: bMonth,
            year: bYear
        })

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/department/`)
                setDepartmentList(response.data)
            } catch (error) {
                console.error(error)
            }

            try {
                const response = await axios.get(`${API_URL}/settings`, config)
                console.log(response.data)
                setFieldInfo({
                    id: response.data.id,
                    username: response.data.user__username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    iub_id_number: response.data.iub_id_number,
                    email: response.data.user__email,
                    phone: response.data.phone,
                    department: response.data.department__department_id,
                    user_type: response.data.user_type,
                    gender: response.data.gender,
                    day: response.data.day,
                    month: response.data.month,
                    year: response.data.year,
                })
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const handleInfoChange = (e) => {
        setFieldInfo({ ...fieldInfo, [e.target.name]: e.target.value })
    }

    const handleInfoSubmit = (e) => {
        e.preventDefault()

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const postData = async () => {
            try {
                const response = await axios.post(`${API_URL}/settings`, {
                    id: fieldInfo.id,
                    username: fieldInfo.username,
                    first_name: fieldInfo.first_name,
                    last_name: fieldInfo.last_name,
                    iub_id_number: fieldInfo.iub_id_number,
                    email: fieldInfo.email,
                    phone: fieldInfo.phone,
                    department: fieldInfo.department,
                    user_type: fieldInfo.user_type,
                    gender: fieldInfo.gender,
                    date_of_birth: `${fieldInfo.year}-${fieldInfo.month}-${fieldInfo.day}`
                }, config)
                console.log(response)
                message.current.innerHTML = 'Successfully saved changes!'
                message.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
                messageFail.current.style = 'display: none;'
            } catch (error) {
                console.error(error)
                messageFail.current.innerHTML = 'Something went wrong, please try again!'
                messageFail.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
                message.current.style = 'display: none;'
            }
        }

        postData()
    }

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value })
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        if (password.newPassword !== password.confirmPassword) {
            messagePasswordFail.current.innerHTML = '"New password" does not match with "confirmation password"'
            messagePasswordFail.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
            messagePassword.current.style = 'display: none;'
            return
        }

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const postData = async () => {
            try {
                const response = await axios.post(`${API_URL}/passwordsettings`, {
                    password: password.currentPassword,
                    new_password: password.newPassword
                }, config)

                if (!response.data.auth) {
                    messagePasswordFail.current.innerHTML = 'Incorrect current password!'
                    messagePasswordFail.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
                    messagePassword.current.style = 'display: none;'
                } else if (!response.data.valid) {
                    messagePasswordFail.current.innerHTML = 'Password must include numbers, uppercase & lowercase letters, and must be at least 8 characters long.'
                    messagePasswordFail.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
                    messagePassword.current.style = 'display: none;'
                } else {
                    messagePassword.current.innerHTML = 'Successfully changed password!'
                    messagePassword.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
                    messagePasswordFail.current.style = 'display: none;'
                }
            } catch (error) {
                console.error(error)
                messagePasswordFail.current.innerHTML = 'Something went wrong, please try again later!'
                messagePasswordFail.current.style = 'display: block; margin-top: 100px; font-size: 25px;'
                messagePassword.current.style = 'display: none;'
            }
        }

        postData()
    }

    return (
        <div className='main-body-margin'>
            <Box extraClass="main-box">
                <h1 style={{
                    margin: '0px',
                    textAlign: 'center',
                    fontFamily: 'Inter, Oxygen, sans-serif',
                    fontSize: '40px'
                }}>Settings</h1>
            </Box>
            <Box extraClass="main-box">
                <h1>Change Basic Info</h1>
                <form onSubmit={handleInfoSubmit}>
                    <div className="grid-three">
                        <input className="registration-field"
                            name="username"
                            value={fieldInfo.username}
                            onChange={handleInfoChange}
                            placeholder="Username"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="first_name"
                            value={fieldInfo.first_name}
                            onChange={handleInfoChange}
                            placeholder="First name"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="last_name"
                            value={fieldInfo.last_name}
                            onChange={handleInfoChange}
                            placeholder="Last name"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="iub_id_number"
                            value={fieldInfo.iub_id_number}
                            onChange={handleInfoChange}
                            placeholder="IUB ID number"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="email"
                            value={fieldInfo.email}
                            onChange={handleInfoChange}
                            placeholder="Email"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="phone"
                            value={fieldInfo.phone}
                            onChange={handleInfoChange}
                            placeholder="Phone number"
                            type="text"
                            autoComplete="off"
                            required />
                        <select className="registration-field"
                            name="department"
                            value={fieldInfo.department}
                            onChange={handleInfoChange}
                            type="text"
                            required>
                            <option
                                value="" selected disabled hidden
                            >Select department</option>
                            {departmentList.map((item) =>
                                <option key={item.department_id}
                                    value={item.department_id}
                                    style={{ fontSize: '20px' }}>
                                    {item.department_name}
                                </option>
                            )}
                        </select>
                        <select className="registration-field"
                            name="user_type"
                            value={fieldInfo.user_type}
                            onChange={handleInfoChange}
                            type="text"
                            required>
                            <option
                                value="" selected disabled hidden
                            >User type</option>
                            <option value="Student">Student</option>
                            <option value="Faculty">Faculty</option>
                            <option value="Alumnus">Alumnus</option>
                        </select>
                        <select className="registration-field"
                            name="gender"
                            value={fieldInfo.gender}
                            onChange={handleInfoChange}
                            type="text"
                            required>
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
                            value={fieldInfo.day}
                            onChange={handleInfoChange}
                            type="text"
                            required>
                            <option
                                value="" selected disabled hidden
                            >Day</option>
                            {birthday.day.map((item) =>
                                <option key={item}
                                    value={item}
                                    style={{ fontSize: '20px' }}>
                                    {item}
                                </option>
                            )}
                        </select>
                        <select className="registration-field"
                            name="month"
                            value={fieldInfo.month}
                            onChange={handleInfoChange}
                            type="text"
                            required>
                            <option
                                value="" selected disabled hidden
                            >Month</option>
                            {birthday.month.map((item, i) =>
                                <option key={item}
                                    value={i + 1 >= 10 ? `${i + 1}` : `0${i + 1}`}
                                    style={{ fontSize: '20px' }}>
                                    {item}
                                </option>
                            )}
                        </select>
                        <select className="registration-field"
                            name="year"
                            value={fieldInfo.year}
                            onChange={handleInfoChange}
                            type="text"
                            required>
                            <option
                                value="" selected disabled hidden
                            >Year</option>
                            {birthday.year.map((item) =>
                                <option key={item}
                                    value={item}
                                    style={{ fontSize: '20px' }}>
                                    {item}
                                </option>
                            )}
                        </select>
                    </div>
                    <button className="registration-button" type="submit"
                        style={{ marginTop: '20px' }}>Save Changes</button>
                    <div style={{ textAlign: 'center' }}>
                        <div ref={message} style={{ display: 'none' }} className="login-success-message"></div>
                        <div ref={messageFail} style={{ display: 'none' }} className="login-fail-message"></div>
                    </div>
                </form>
            </Box>
            <Box extraClass="main-box">
                <h1>Change Password</h1>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="grid-three">
                        <input className="registration-field"
                            name="newPassword"
                            value={password.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New password"
                            type="password"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="confirmPassword"
                            value={password.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm password"
                            type="password"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="currentPassword"
                            value={password.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Current password"
                            type="password"
                            autoComplete="off"
                            required />
                    </div>
                    <button className="registration-button" type="submit"
                        style={{ marginTop: '20px' }}>Save Changes</button>
                    <div style={{ textAlign: 'center' }}>
                        <div ref={messagePassword} style={{ display: 'none' }} className="login-success-message"></div>
                        <div ref={messagePasswordFail} style={{ display: 'none' }} className="login-fail-message"></div>
                    </div>
                </form>
            </Box>
        </div>
    )
}

export default Settings
