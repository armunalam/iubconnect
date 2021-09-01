import React from 'react'
import Box from '../../components/Box'
import Button from '../../components/Button'
import { IoMdSchool } from 'react-icons/io'
import { GoCalendar } from 'react-icons/go'

function EditBox() {
    return (
        <Box extraClass="box-padding">
            <input className="login-field"
                placeholder="Institution Name" />
            <p className="vertical-flexbox">
                <IoMdSchool className="list-items" />
                <input className="login-field edit-field"
                    placeholder="Qualification(s)" />
            </p>
            <p className="vertical-flexbox">
                <GoCalendar className="list-items" />
                <input className="login-field edit-field"
                    placeholder="Year(s)" />
            </p>
            <Button extraClass="button-red edit-remove-button">Remove</Button>
        </Box>
    )
}

export default EditBox
