import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import Button from '../components/Button'
import { IoMdSchool } from 'react-icons/io'
import { GoCalendar } from 'react-icons/go'
import { BsPen } from 'react-icons/bs'
import male_avatar from '../assets/male_avatar.png'
import female_avatar from '../assets/female_avatar.png'
import { Link } from 'react-router-dom'

function UserProfile({ match }) {
    const [name, setName] = useState('')
    const [username, setUsername] = useState(match.params.username)
    const [userType, setUserType] = useState('')
    const [gender, setGender] = useState('')
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
            // if (connectionStatus === 'Connected') {
            //     const response = await axios.post(`${API_URL}/connect`, {
                    
            //     }, config)
            console.log('Okay')
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
                            ) : <div>No education information added yet.</div>
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
                            ) : <div>No experience information added yet.</div>
                        }
                    </GridBox>
                </div>
            </Box>
        </div>
    )
}

export default UserProfile
