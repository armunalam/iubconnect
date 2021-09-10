import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        requestedUsers: [],
        btnName: [],
        empty: false,
        suggestedEmpty: false,
        suggestedUsers: []
    }

    componentDidMount() {
        document.title = 'Dashboard | IUBConnect'

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

        const fetchRequestedData = async () => {
            try {
                const response = await axios.get(`${API_URL}/getrequestedlist`, config)
                this.setState({ requestedUsers: response.data })
                if (response.data.length === 0) this.setState({ empty: true })
                else this.setState({ empty: false })
                const arr = []
                for (let i = 0; i < response.data.length; i++) {
                    arr.push('Remove')
                }
                this.setState({ btnName: arr })
            } catch (error) {
                this.setState({ empty: true })
                console.error(error)
            }
        }

        const fetchSuggestedData = async () => {
            try {
                const response = await axios.get(`${API_URL}/suggest`, config)
                this.setState({ suggestedUsers: response.data })
                if (response.data.length === 0) this.setState({ suggestedEmpty: true })
                else this.setState({ suggestedEmpty: false })
            } catch (error) {
                console.error(error)
            }
        }

        fetchRequestedData()
        fetchSuggestedData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.requestedUsers !== prevState.requestedUsers) {
            console.log(this.state.requestedUsers.length)
            if (this.state.requestedUsers.length === 0)
                this.setState({ empty: true })
        }
    }

    handleConfirmButton = (e) => {
        e.preventDefault()

        const username = this.state.requestedUsers[parseInt(e.target.id)].user__username

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const postData = async () => {
            try {
                const response = await axios.post(`${API_URL}/connect`, {
                    username: username,
                    type: 'accept'
                }, config)
                if (response.data.status === 'accepted') {
                    const arr = []
                    for (let i = 0; i < this.state.btnName.length; i++) {
                        if (i === parseInt(e.target.id)) {
                            arr.push('Disconnect')
                        } else {
                            arr.push(this.state.btnName[i])
                        }
                    }
                    this.setState({ btnName: arr })
                }
            } catch (error) {
                console.error(error)
            }
        }

        postData()
    }

    handleRemoveButton = (e) => {
        e.preventDefault()
        const id = parseInt(e.target.id.slice(1))
        const username = this.state.requestedUsers[id].user__username

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const postData = async () => {
            try {
                const response = await axios.post(`${API_URL}/connect`, {
                    username: username,
                    type: 'disconnect'
                }, config)
                if (response.data.status === 'disconnected') {
                    const arr = this.state.requestedUsers.filter((item, index) => index !== id)
                    this.setState({ requestedUsers: arr })
                    const btnArr = this.state.btnName.filter((item, index) => index !== id)
                    this.setState({ btnName: btnArr })
                }
            } catch (error) {
                console.error(error)
            }
        }

        postData()
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
                    {!this.state.empty ? (
                        <GridBox>
                            {this.state.requestedUsers.map(({ first_name, last_name, user_type, department__department_name, user__username }, index) =>
                                <Box extraClass="box-padding" key={index}>
                                    <Link to={`/user/${user__username}`}>
                                        <h2>{`${first_name} ${last_name}`}</h2>
                                    </Link>
                                    <p className="vertical-flexbox">
                                        <BsFillPersonLinesFill className="list-items" />
                                        {user_type}
                                    </p>
                                    <p className="vertical-flexbox">
                                        <BsBuilding className="list-items" />
                                        {department__department_name}
                                    </p>
                                    <Button extraClass={`button-green ${this.state.btnName[index] === 'Remove' ? '' : 'display-none'}`}
                                        buttonClick={this.handleConfirmButton}
                                        idKey={index}>Confirm</Button>
                                    <Button extraClass="button-red"
                                        buttonClick={this.handleRemoveButton}
                                        idKey={`b${index}`}>{this.state.btnName[index]}</Button>
                                </Box>
                            )}
                        </GridBox>
                    ) :
                        <h2 style={{
                            fontWeight: 'normal',
                            marginTop: '-15px',
                            color: '#666666'
                        }}>You have no connection request right now.</h2>}
                </Box>
                <Box extraClass="main-box">
                    <h1>People You May Know</h1>
                    {!this.state.suggestedEmpty ? (
                        <GridBox>
                            {this.state.suggestedUsers.map(({ first_name, last_name, user_type, department__department_name, user__username }) =>
                                <Link to={`/user/${user__username}`}>
                                    <Box extraClass="box-padding box-button">
                                        <h2>{`${first_name} ${last_name}`}</h2>
                                        <p className="vertical-flexbox">
                                            <BsFillPersonLinesFill className="list-items" />
                                            {user_type}
                                        </p>
                                        <p className="vertical-flexbox">
                                            <BsBuilding className="list-items" />
                                            {department__department_name}
                                        </p>
                                    </Box>
                                </Link>
                            )}
                        </GridBox>
                    ) :
                        <h2 style={{
                            fontWeight: 'normal',
                            marginTop: '-15px',
                            color: '#666666'
                        }}>Sorry, we have no suggestion for you at the moment.</h2>}
                </Box>
            </div>
        )
    }
}
