import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BsPeopleCircle, BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { AiOutlineLogout } from 'react-icons/ai'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.dropdownbox = React.createRef()
    }

    showSidebar = () => this.props.app.setState({
        sidebar: !this.props.app.state.sidebar
    })

    showDropdown = () => this.props.app.setState({
        dropdown: !this.props.app.state.dropdown
    })

    componentDidMount() {
        document.addEventListener('click', this.closeDropdown)
    }

    closeDropdown = (event) => {
        try {
            if (this.dropdownbox && !this.dropdownbox.current.contains(event.target)) {
                this.props.app.setState({
                    dropdown: false
                })
            }
        } catch(TypeError) {
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
                                <span className="navbar-user-text">Armun Alam</span>
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
                    <li><FiSettings className="sidebar-icon" />Settings</li>
                    <Link exact to="/logout">
                        <li><AiOutlineLogout className="sidebar-icon" />Log Out</li>
                    </Link>
                </ul>
            </div>
        )
    }
}

class Searchbar extends Component {
    render() {
        return (
            <div className="searchbar">
                <form>
                    <input className="searchbar-field" placeholder="Search" name="search" autocomplete="off" />
                    <button className="searchbar-button"><BsSearch /></button>
                </form>
            </div>
        )
    }
}
