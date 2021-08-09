import React, { Component } from 'react'
import { FaHome, FaUserFriends } from 'react-icons/fa'
import { BsPeopleCircle } from 'react-icons/bs'

export default class Sidebar extends Component {
    componentDidMount() {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 850) {
                this.props.app.setState({ sidebar: false })
            } else {
                this.props.app.setState({ sidebar: true })
            }
        })
    }
    
    componentDidUpdate() {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 850) {
                this.props.app.setState({ sidebar: false })
            } else {
                this.props.app.setState({ sidebar: true })
            }
        })
    }

    render() {
        // this.useEffect(() => {
        //     //     function handleResize() {
        //     //       console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)

        //     // }

        //     //     window.addEventListener('resize', handleResize)

        //     // window.addEventListener('resize', () => {
        //     //     if (window.innerWidth <= 850) {
        //     //         this.props.app.setState({ sidebar: false })
        //     //     } else {
        //     //         this.props.app.setState({ sidebar: true })
        //     //     }
        //     // })
        // })

        return (
            <div className={this.props.app.state.sidebar ? "sidebar" : "sidebar sidebar-hidden"}>
                <ul className="sidebar-items">
                    <li><FaHome className="sidebar-icon" />Dashboard</li>
                    <li><BsPeopleCircle className="sidebar-icon" />Profile</li>
                    <li><FaUserFriends className="sidebar-icon" />Connections</li>
                </ul>
            </div>
        )
    }
}
