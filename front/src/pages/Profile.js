import React, { Component } from 'react'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { IoMdSchool } from 'react-icons/io'
import { GoCalendar } from 'react-icons/go'
import { BsPen } from 'react-icons/bs'

export default class Profile extends Component {
    state = {
        first_name: null,
        last_name: null,
    }

    componentDidMount() {
        fetch('/main/api/user/1/')
            .then(response => response.json())
            .then(data => {
                console.log('This is your data', data)
                this.setState({first_name: data.first_name, last_name: data.last_name})
            })
    }

    render() {
        const state = this.state
        
        return (
            <div className='main-body-margin'>
                <Box extraClass="main-box">
                    <div className="profile-heading">
                        <div>
                            <img className="profile-image" src="https://raw.githubusercontent.com/armunalam/resume/main/images/ArmunAlam.jpg" />
                        </div>
                        <div>
                            <h1 id="profile-main-title">{state.first_name} {state.last_name}</h1>
                            <h2 id="profile-sub-title">Student</h2>
                        </div>
                    </div>
                </Box>
                <Box extraClass="main-box">
                    <div>
                        <h1>Education</h1>
                        <GridBox>
                            <Box extraClass="box-padding">
                                <h2>Ingenious International School</h2>
                                <p className="vertical-flexbox"><IoMdSchool className="list-items" />O and A Levels</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2016-2017</p>
                            </Box>
                            <Box extraClass="box-padding">
                                <h2>Independent University, Bangladesh</h2>
                                <p className="vertical-flexbox"><IoMdSchool className="list-items" />Computer Science and Engineering</p>
                                <p className="vertical-flexbox"><GoCalendar className="list-items" />2018-Present</p>
                            </Box>
                        </GridBox>
                    </div>
                    <div>
                        <h1>Experience</h1>
                        <GridBox>
                            <Box extraClass="box-padding">
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
                            </Box>
                        </GridBox>
                    </div>
                </Box>
            </div>
        )
    }
}
