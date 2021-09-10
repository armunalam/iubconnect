import React, { Component } from 'react'
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
import { Link } from 'react-router-dom'

export default class Profile extends Component {
    state = {
        name: '',
        user_type: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        iub_id_number: '',
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
                    iub_id_number: res.data[0].iub_id_number,
                    phone: res.data[0].phone,
                    date_of_birth: res.data[0].date_of_birth
                })
                document.title = `${this.state.name} | IUBConnect`
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

            try {
                const response = await axios.get(`${API_URL}/getaccountdept`, config)
                this.setState({
                    email: response.data.email,
                    department: response.data.department
                })
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
                <Box extraClass="main-box">
                    <h1 style={{ marginBottom: '0px' }}>Personal Information</h1>
                    <GridBox>
                        <Box extraClass="box-padding">
                            <h2>Basic Information</h2>
                            <p className="vertical-flexbox">
                                <HiOutlineIdentification className="list-items" />
                                <span className="bold-text">IUB ID Number:</span> {this.state.iub_id_number}
                            </p>
                            <p className="vertical-flexbox">
                                <FaGenderless className="list-items" />
                                <span className="bold-text">Gender:</span> {this.state.gender}
                            </p>
                            <p className="vertical-flexbox">
                                <FaBirthdayCake className="list-items" />
                                <span className="bold-text">Date of Birth:</span> {this.state.date_of_birth}
                            </p>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Contact Information</h2>
                            <p className="vertical-flexbox">
                                <FiPhoneCall className="list-items" />
                                <span className="bold-text">Phone:</span> {this.state.phone}
                            </p>
                            <p className="vertical-flexbox">
                                <FiMail className="list-items" />
                                <span className="bold-text">Email:</span> {this.state.email}
                            </p>
                            <p className="vertical-flexbox">
                                <BsBuilding className="list-items" />
                                <span className="bold-text">Department:</span> {this.state.department}
                            </p>
                        </Box>
                    </GridBox>
                </Box>
            </div>
        )
    }
}
