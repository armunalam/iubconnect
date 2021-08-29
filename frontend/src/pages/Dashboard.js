import React, { Component } from 'react'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import Button from '../components/Button'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

export default class Dashboard extends Component {
    state = {
        name: '',
        user_type: '',
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
                })
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { name, user_type } = this.state

        return (
            <div className='main-body-margin'>
                <Box extraClass="main-box">
                    <div style={{ textAlign: 'center' }}>
                        <div>
                            <h1 id="profile-main-title">{name}</h1>
                            <h2 id="profile-sub-title">{user_type}</h2>
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
