import React, { Component } from 'react'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { IoMdSchool } from 'react-icons/io'
import { GoCalendar } from 'react-icons/go'
import { BsPen } from 'react-icons/bs'

export default class Profile extends Component {
    render() {
        return (
            <div className='main-body-margin'>
                <Box extraClass="main-box">
                    <div className="profile-heading">
                        <div>
                            {/* <img className="profile-image" src="images/ArmunAlam.jpg" /> */}
                            <img className="profile-image"
                                 src="https://raw.githubusercontent.com/armunalam/resume/main/images/ArmunAlam.jpg"
                                 alt="Profile" />
                        </div>
                        <div>
                            <h1 id="profile-main-title">Armun Alam</h1>
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
