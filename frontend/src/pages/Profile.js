import React, { Component } from 'react'
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

export default class Profile extends Component {
    state = {
        name: '',
        user_type: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        address: '',
        department: '',
        education: [],
        experience: [],
    }

    componentDidMount() {
        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        axios
            .get(`${API_URL}/account/`, config)
            .then((res) => {
                this.setState({
                    name: `${res.data[0].first_name} ${res.data[0].last_name}`,
                    user_type: res.data[0].user_type,
                    gender: res.data[0].gender,
                })
            })
            .catch((err) => console.log(err))


        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/education`, config)
                this.setState({ education: response.data })
            } catch (error) {
                console.error(error)
            }

            try {
                const response = await axios.get(`${API_URL}/experience`, config)
                this.setState({ experience: response.data })
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }

    render() {
        const { name, user_type, gender } = this.state

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
                            <h2 id="profile-sub-title">{user_type}</h2>
                        </div>
                    </div>
                </Box>
                <Box extraClass="main-box">
                    <div>
                        <div>
                            <h1 style={{ float: 'left' }}>Education</h1>
                            <Link to="/profile/education"><Button extraClass="edit-button">Edit</Button></Link>
                        </div>
                        <GridBox>
                            {this.state.education.length !== 0 ?
                                this.state.education.map((item, index) =>
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
                        <div>
                            <h1 style={{ float: 'left' }}>Experience</h1>
                            <Link to="/profile/experience"><Button extraClass="edit-button">Edit</Button></Link>
                        </div>
                        <GridBox>
                            {this.state.experience.length !== 0 ?
                                this.state.experience.map((item, index) =>
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
}
