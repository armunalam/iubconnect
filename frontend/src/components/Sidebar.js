import React, { useState } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { FaHome, FaUserFriends } from 'react-icons/fa'
import { BsPeopleCircle, BsSearch } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'

function Sidebar(props) {
    const [search, setSearch] = useState('')
    const history = useHistory()

    const onClick = () => {
        if (window.innerWidth <= 850) {
            props.app.setState({ sidebar: false })
        } else {
            props.app.setState({ sidebar: true })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (search !== '')
            history.push(`/search?q=${search}`)

        props.app.setState({ sidebar: false })
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={props.app.state.sidebar ? "sidebar" : "sidebar sidebar-hidden"}>
            <ul className="sidebar-items">
                <div className="searchbar-sidebar hidden-element">
                    <form onSubmit={handleSubmit}>
                        <input className="searchbar-sidebar-field"
                            placeholder="Search"
                            name="search"
                            onChange={handleChange}
                            autoComplete="off" />
                        <button className="searchbar-sidebar-button"><BsSearch /></button>
                    </form>
                </div>
                <NavLink exact to="/" activeClassName="active-hightlight" onClick={onClick}>
                    <li><FaHome className="sidebar-icon" />Dashboard</li>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="active-hightlight" onClick={onClick}>
                    <li><BsPeopleCircle className="sidebar-icon" />Profile</li>
                </NavLink>
                <NavLink exact to="/connections" activeClassName="active-hightlight" onClick={onClick}>
                    <li><FaUserFriends className="sidebar-icon" />Connections</li>
                </NavLink>
                <NavLink exact to="/settings" activeClassName="active-hightlight" onClick={onClick}>
                    <li className="hidden-element"><FiSettings className="sidebar-icon" />Settings</li>
                </NavLink>
                <Link to="/logout">
                    <li className="hidden-element"><AiOutlineLogout className="sidebar-icon" />Log Out</li>
                </Link>
            </ul>
        </div>
    )
}

export default Sidebar
