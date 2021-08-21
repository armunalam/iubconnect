import React, { Component } from 'react'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import Button from '../components/Button'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

export default class Dashboard extends Component {
    render() {
        return (
            <div className='main-body-margin'>
                <Box extraClass="main-box">
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <h1 id="profile-main-title">Armun Alam</h1>
                            <h2 id="profile-sub-title">Student</h2>
                        </div>
                    </div>
                </Box>
                <Box extraClass="main-box">
                    <h1>Connection Requests</h1>
                    <GridBox>
                        <Box extraClass="box-padding">
                            <h2>Sadia Khan</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Confirm</Button>
                            <Button extraClass="button-red">Remove</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Samsul Amin</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Confirm</Button>
                            <Button extraClass="button-red">Remove</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Writban Alim</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Alumnus</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Confirm</Button>
                            <Button extraClass="button-red">Remove</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Mir Sayad Bin Almas</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Economics</p>
                            <Button extraClass="button-green">Confirm</Button>
                            <Button extraClass="button-red">Remove</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Sabrina Masum</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Faculty</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Confirm</Button>
                            <Button extraClass="button-red">Remove</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Zafore Sadek</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Marketing</p>
                            <Button extraClass="button-green">Confirm</Button>
                            <Button extraClass="button-red">Remove</Button>
                        </Box>
                    </GridBox>
                </Box>
                <Box extraClass="main-box">
                    <h1>People You May Know</h1>
                    <GridBox>
                        <Box extraClass="box-padding">
                            <h2>Yasir Arafat Diganta</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Connect</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Rajdeep Das</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Connect</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Adnan Alam</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Alumnus</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Connect</Button>
                        </Box>
                        <Box extraClass="box-padding">
                            <h2>Bushra Jahangir</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                            <Button extraClass="button-green">Connect</Button>
                        </Box>
                    </GridBox>
                </Box>
            </div>
        )
    }
}
