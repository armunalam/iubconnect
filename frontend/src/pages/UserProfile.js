import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import Button from '../components/Button'
import { IoMdSchool } from 'react-icons/io'
import { GoCalendar } from 'react-icons/go'
import { HiOutlineIdentification } from 'react-icons/hi'
import { BsBuilding } from 'react-icons/bs'
import { FaGenderless, FaBirthdayCake } from 'react-icons/fa'
import { FiPhoneCall, FiMail } from 'react-icons/fi'
import { BsPen } from 'react-icons/bs'
import male_avatar from '../assets/male_avatar.png'
import female_avatar from '../assets/female_avatar.png'

function UserProfile({ match }) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState(match.params.username)
    const [userType, setUserType] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [iub_id_number, setIubIdNumber] = useState('')
    const [department, setDepartment] = useState('')
    const [date_of_birth, setDateOfBirth] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('')
    const [connectionStatusButton, setConnectionStatusButton] = useState('')
    const [selfRequested, setSelfRequested] = useState(true)
    const [education, setEducation] = useState([])
    const [experience, setExperience] = useState([])
    const [isCurrentUser, setIsCurrentUser] = useState(false)

    useEffect(() => {
        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            params: {
                'username': match.params.username
            },
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/user`, config)
                setIsCurrentUser(response.data.is_current_user)
                setName(`${response.data.first_name} ${response.data.last_name}`)
                setUsername(response.data.user__username)
                setUserType(response.data.user_type)
                setGender(response.data.gender)
                setEducation(response.data.education)
                setExperience(response.data.experience)
                setIsConnected(response.data.is_connected)
                if (response.data.is_connected === true) {
                    setPhone(response.data.phone)
                    setEmail(response.data.user__email)
                    setIubIdNumber(response.data.iub_id_number)
                    setDepartment(response.data.department__department_name)
                    setDateOfBirth(response.data.date_of_birth)
                }

                document.title = `${response.data.first_name} ${response.data.last_name} | IUBConnect`
            } catch (error) {
                console.error(error)
            }
        }

        const fetchConnectionData = async () => {
            try {
                const response = await axios.get(`${API_URL}/connect`, config)
                const status = response.data.connection_status
                const selfReq = response.data.self_requested
                setConnectionStatus(status)
                setSelfRequested(response.data.self_requested)
                if (status === 'Connected') {
                    setConnectionStatusButton('Disconnect')
                } else if (status === 'Requested' && selfReq) {
                    setConnectionStatusButton('Cancel Request')
                } else if (status === 'Requested' && !selfReq) {
                    setConnectionStatusButton('Confirm Request')
                } else {
                    setConnectionStatusButton('Connect')
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
        fetchConnectionData()
    }, [])

    const handleConnectionClick = (e) => {
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
                if (connectionStatus === 'Not Connected') {
                    const response = await axios.post(`${API_URL}/connect`, {
                        username: username,
                        type: 'connect'
                    }, config)
                    if (response.data.status === 'requested') {
                        setConnectionStatus('Requested')
                        setConnectionStatusButton('Cancel Request')
                        setSelfRequested(true)
                    }
                } else if (connectionStatus === 'Requested' && !selfRequested) {
                    const response = await axios.post(`${API_URL}/connect`, {
                        username: username,
                        type: 'accept'
                    }, config)
                    if (response.data.status === 'accepted') {
                        setConnectionStatus('Connected')
                        setConnectionStatusButton('Disconnect')
                    }
                } else {
                    const response = await axios.post(`${API_URL}/connect`, {
                        username: username,
                        type: 'disconnect'
                    }, config)
                    if (response.data.status === 'disconnected') {
                        setConnectionStatus('Not Connected')
                        setConnectionStatusButton('Connect')
                    }
                }
            } catch (error) {
                console.error(error)
            }
        }

        postData()
    }

    if (isCurrentUser)
        return <Redirect to="/profile" />

    return (
        <div className='main-body-margin'>
            <Box extraClass="main-box">
                <div className="profile-heading">
                    <div>
                        <img className="profile-image"
                            src={gender === 'Female' ? female_avatar : male_avatar}
                            alt="Profile" />
                    </div>
                    <div>
                        <h1 id="profile-main-title">{name}</h1>
                        <h2 id="profile-sub-title">{userType} | {connectionStatus}</h2>
                    </div>
                </div>
                <Button extraClass=" button-profile"
                    buttonClick={handleConnectionClick} >{connectionStatusButton}</Button>
            </Box>
            <Box extraClass="main-box">
                <div>
                    <h1>Education</h1>
                    <GridBox>
                        {education.length !== 0 ?
                            education.map((item, index) =>
                                <Box extraClass="box-padding" key={index}>
                                    <h2>{item.name}</h2>
                                    <p className="vertical-flexbox">
                                        <IoMdSchool className="list-items" />
                                        {item.qual}
                                    </p>
                                    <p className="vertical-flexbox">
                                        <GoCalendar className="list-items" />
                                        {item.year}
                                    </p>
                                </Box>
                            ) :
                            <h2 style={{
                                fontWeight: 'normal',
                                marginTop: '-5px',
                                color: '#666666'
                            }}>No education information added yet.</h2>
                        }
                    </GridBox>
                </div>
                <div>
                    <h1>Experience</h1>
                    <GridBox>
                        {experience.length !== 0 ?
                            experience.map((item, index) =>
                                <Box extraClass="box-padding">
                                    <h2>{item.title}</h2>
                                    <p className="vertical-flexbox">
                                        <BsPen className="list-items" />
                                        {item.pos}
                                    </p>
                                    <p className="vertical-flexbox">
                                        <GoCalendar className="list-items" />
                                        {item.year}
                                    </p>
                                </Box>
                            ) :
                            <h2 style={{
                                fontWeight: 'normal',
                                marginTop: '-5px',
                                color: '#666666'
                            }}>No experience information added yet.</h2>
                        }
                    </GridBox>
                </div>
            </Box>
            {isConnected ?
                <Box extraClass="main-box">
                    <h1 style={{ marginBottom: '0px' }}>Personal Information</h1>
                    <GridBox>
                        <Box extraClass="box-padding">
                            <h2>Basic Information</h2>
                            <p className="vertical-flexbox">
                                <HiOutlineIdentification className="list-items" />
                                <span className="bold-text">IUB ID Number:</span> {iub_id_number}
                            </p>
                            <p className="vertical-flexbox">
                                <FaGenderless className="list-items" />
                                <span className="bold-text">Gender:</span> {gender}
                            </p>
                            <p className="vertical-flexbox">
                                <FaBirthdayCake className="list-items" />
                                <span className="bold-text">Date of Birth:</span> {date_of_birth}
                            </p>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Contact Information</h2>
                            <p className="vertical-flexbox">
                                <FiPhoneCall className="list-items" />
                                <span className="bold-text">Phone:</span> {phone}
                            </p>
                            <p className="vertical-flexbox">
                                <FiMail className="list-items" />
                                <span className="bold-text">Email:</span> {email}
                            </p>
                            <p className="vertical-flexbox">
                                <BsBuilding className="list-items" />
                                <span className="bold-text">Department:</span> {department}
                            </p>
                        </Box>
                    </GridBox>
                </Box> : <div style={{ display: 'none' }}></div>}
        </div>
    )
}

export default UserProfile
