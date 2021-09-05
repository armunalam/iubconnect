import React, { Component, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { BsPeopleCircle, BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import API_URL from '../urls'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.dropdownbox = React.createRef()
    }

    state = {
        user_name: ''
    }

    showSidebar = () => this.props.app.setState({
        sidebar: !this.props.app.state.sidebar
    })

    showDropdown = () => this.props.app.setState({
        dropdown: !this.props.app.state.dropdown
    })

    componentDidMount() {
        document.addEventListener('click', this.closeDropdown)

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
                this.setState({ user_name: `${res.data[0].first_name} ${res.data[0].last_name}` })
            })
            .catch((err) => console.log(err))
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeDropdown)
    }

    closeDropdown = (event) => {
        try {
            if (this.dropdownbox && !this.dropdownbox.current.contains(event.target)) {
                this.props.app.setState({
                    dropdown: false
                })
            }
        } catch (TypeError) {
            this.props.app.setState({
                dropdown: false
            })
        }
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="navbar-button" onClick={this.showSidebar}>
                        <FaBars className="navbar-icon" />
                    </div>
                    <Link to="/" exact>
                        <div className="navbar-title">IUBConnect</div>
                    </Link>
                    <div className="navbar-right">
                        <Searchbar />
                        <div style={{ height: '100%' }} ref={this.dropdownbox}>
                            <div className="navbar-user" onClick={this.showDropdown}>
                                <BsPeopleCircle className="navbar-user-icon" />
                                <span className="navbar-user-text">{this.state.user_name}</span>
                            </div>
                            <DropdownMenu app={this.props.app} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class DropdownMenu extends Component {
    onClick = () => {
        this.props.app.setState({ dropdown: false })
    }

    render() {
        return (
            <div className={this.props.app.state.dropdown ? "dropdown-menu" : "dropdown-menu dropdown-menu-hidden"}>
                <ul>
                    <Link exact to="/profile" onClick={this.onClick}>
                        <li><BsPeopleCircle className="sidebar-icon" />Profile</li>
                    </Link>
                    <Link exact to="/settings" onClick={this.onClick}>
                        <li><FiSettings className="sidebar-icon" />Settings</li>
                    </Link>
                    <Link exact to="/logout">
                        <li><AiOutlineLogout className="sidebar-icon" />Log Out</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

function Searchbar() {
    const [search, setSearch] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (search !== '')
            history.push(`/search?q=${search}`)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <input className="searchbar-field"
                    style={search !== '' ? { width: '400px' } : {}}
                    placeholder="Search"
                    name="search"
                    onChange={handleChange}
                    autoComplete="off" />
                <button className="searchbar-button"><BsSearch /></button>
            </form>
        </div>
    )
}
