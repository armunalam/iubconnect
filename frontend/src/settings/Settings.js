import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import API_URL from '../urls'

function Settings() {
    const [departmentList, setDepartmentList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/department/`)
                setDepartmentList(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

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
                <form>
                    <GridBox>
                        <input className="registration-field"
                            name="username"
                            placeholder="Username"
                            type="text"
                            autoComplete="off"
                            required />

                        <input className="registration-field"
                            name="iub_id_number"
                            placeholder="IUB ID number"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="first_name"
                            placeholder="First name"
                            type="text"
                            autoComplete="off"
                            required />

                        <input className="registration-field"
                            name="last_name"
                            placeholder="Last name"
                            type="text"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="email"
                            placeholder="Email"
                            type="text"
                            autoComplete="off"
                            required />

                        <select className="registration-field"
                            name="department"
                            type="text"
                            required>
                            <option
                                value="" selected disabled hidden
                            >Select Department</option>
                            {departmentList.map((item) =>
                                <option key={item.department_id}
                                    value={item.department_id}
                                    style={{ fontSize: '20px' }}>
                                    {item.department_name}
                                </option>
                            )}
                        </select>
                    </GridBox>
                    <button className="registration-button" type="submit">Save Changes</button>
                </form>
            </Box>
            <Box extraClass="main-box">
                <h1>Change Password</h1>
                <form>
                    <div className="grid-three">
                        <input className="registration-field"
                            name="password"
                            placeholder="New password"
                            type="password"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="password-confirm"
                            placeholder="Confirm password"
                            type="password"
                            autoComplete="off"
                            required />
                        <input className="registration-field"
                            name="password-old"
                            placeholder="Old password"
                            type="password"
                            autoComplete="off"
                            required />
                    </div>
                    <button className="registration-button" type="submit">Save Changes</button>
                </form>
            </Box>
        </div>
    )
}

export default Settings
