import React, { Component } from 'react'
import { FaBars } from 'react-icons/fa'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="navbar-button">
                        <FaBars className="navbar-icon" />
                    </div>
                    <div className="navbar-title">IUBConnect</div>
                </div>
            </div>
        )
    }
}
