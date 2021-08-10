import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaUserFriends } from 'react-icons/fa'
import { BsPeopleCircle, BsSearch } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'

export default class Sidebar extends Component {
    render() {
        return (
            <div className={this.props.app.state.sidebar ? "sidebar" : "sidebar sidebar-hidden"}>
                <ul className="sidebar-items">
                    <div className="searchbar-sidebar hidden-element">
                        <form>
                            <input className="searchbar-sidebar-field" placeholder="Search" name="search" autocomplete="off" />
                            <button className="searchbar-sidebar-button"><BsSearch /></button>
                        </form>
                    </div>
                    <NavLink exact to="/" activeClassName="active-hightlight">
                        <li><FaHome className="sidebar-icon" />Dashboard</li>
                    </NavLink>
                    <NavLink exact to="/profile" activeClassName="active-hightlight">
                        <li><BsPeopleCircle className="sidebar-icon" />Profile</li>
                    </NavLink>
                    <NavLink exact to="/connections" activeClassName="active-hightlight">
                        <li><FaUserFriends className="sidebar-icon" />Connections</li>
                    </NavLink>
                    <li className="hidden-element"><FiSettings className="sidebar-icon" />Settings</li>
                    <li className="hidden-element"><AiOutlineLogout className="sidebar-icon" />Log Out</li>
                </ul>
            </div>
        )
    }
}
