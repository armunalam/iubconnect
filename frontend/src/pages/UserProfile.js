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
    const [userType, setUserType] = useState('')
    const [gender, setGender] = useState('')
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
                setUserType(response.data.user_type)
                setGender(response.data.gender)
                setEducation(response.data.education)
                setExperience(response.data.experience)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

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
                        <h2 id="profile-sub-title">{userType}</h2>
                    </div>
                </div>
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
