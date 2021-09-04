import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import { getProfileData } from '../actions/profile'
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

    // static propTypes = {
    //     profileData: PropTypes.array.isRequired,
    //     getProfileData: PropTypes.func.isRequired,
    // }

    componentDidMount() {
        // this.props.getProfileData()
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
                const response2 = await axios.get(`${API_URL}/experience`, config)
                this.setState({ experience: response2.data })
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }

    // componentWillMount() {
    //     if (this.props.profileData) {
    //         let gender = this.props.profileData[0].gender
    //         if (gender == 'm') gender = 'Male'
    //         else if (gender == 'f') gender = 'Female'
    //         else gender = ''

    //         this.setState({
    //             name: `${this.props.profileData[0].first_name} ${this.props.profileData[0].last_name}`,
    //             date_of_birth: this.props.profileData[0].date_of_birth,
    //             gender: gender,
    //             phone: this.props.profileData[0].phone,
    //             address: '',
    //             department: '',
    //         })

    //         console.log(this.props.profileData[0].address)
    //     }
    // }

    render() {
        const { name, user_type, gender } = this.state

        return (
            <div className='main-body-margin'>
                <Box extraClass="main-box">
                    <div className="profile-heading">
                        <div>
                            {/* <img className="profile-image" src="images/ArmunAlam.jpg" /> */}
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
                            {/* <Box extraClass="box-padding">
                                <h2>Ingenious International School</h2>
                                <p className="vertical-flexbox"><IoMdSchool className="list-items" />O and A Levels</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2016-2017</p>
                            </Box>
                            <Box extraClass="box-padding">
                                <h2>Independent University, Bangladesh</h2>
                                <p className="vertical-flexbox"><IoMdSchool className="list-items" />Computer Science and Engineering</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2018-Present</p>
                            </Box> */}
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
                            {/* <Box extraClass="box-padding">
                                <h2>Cloud Creative Limited</h2>
                                <p className="vertical-flexbox"><BsPen className="list-items" />Software Support Engineer</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2021-Present</p>
                            </Box>
                            <Box extraClass="box-padding">
                                <h2>Teaching</h2>
                                <p className="vertical-flexbox"><BsPen className="list-items" />Students of O and A Levels</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2016-Present</p>
                            </Box>
                            <Box extraClass="box-padding">
                                <h2>Personal Projects</h2>
                                <p className="vertical-flexbox"><BsPen className="list-items" />Web Development, Machine Learning</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2014-Present</p>
                            </Box>
                            <Box extraClass="box-padding">
                                <h2>Independent University, Bangladesh</h2>
                                <p className="vertical-flexbox"><BsPen className="list-items" />Student on Duty</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2018-2019</p>
                            </Box> */}
                        </GridBox>
                    </div>
                </Box>
            </div>
        )
    }
}


// const mapStateToProps = (state) => ({
//     profileData: state.profile.profileData,
// })

// export default connect(mapStateToProps, { getProfileData })(Profile)