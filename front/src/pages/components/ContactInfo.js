import React, { Component } from 'react'
import PropTypes from 'prop-types'



export default class ContactInfo extends Component {
    render() {
        return (
            <div className = 'contact-info'>
            <h3>{this.props.contact}</h3>
            <h3>{this.props.email}</h3>            
        </div>
        )
    }
}


ContactInfo.defaultProps = {
    contact: '00000000000',
    email: '#######@iub.edu.bd',
}

ContactInfo.propTypes = {
    contact: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
}

