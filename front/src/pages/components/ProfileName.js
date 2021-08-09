import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class ProfileName extends Component {
    render() {
        return (
            <div className = 'profile-name'>
            <h2>{this.props.firstName}</h2>
        </div>
        )
    }
}


ProfileName.defaultProps = {
    firstName: 'FirstName LastName',
}

ProfileName.propTypes = {
    firstName: PropTypes.string.isRequired,
}

