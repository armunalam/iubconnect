import React from 'react'
import Box from '../../components/Box'
import Button from '../../components/Button'

function EditBox({ name, qual, year, handleChange, idKey, removeClick, svg1, svg2,
                   ps1, ps2, ps3 }) {
    return (
        <Box extraClass="box-padding">
            <input className="login-field"
                placeholder={ps1}
                value={name}
                onChange={handleChange}
                name={idKey} />
            <p className="vertical-flexbox">
                {svg1}
                <input className="login-field edit-field"
                    placeholder={ps2}
                    value={qual}
                    onChange={handleChange}
                    name={idKey} />
            </p>
            <p className="vertical-flexbox">
                {svg2}
                <input className="login-field edit-field"
                    placeholder={ps3}
                    value={year}
                    onChange={handleChange}
                    name={idKey} />
            </p>
            <Button extraClass="button-red edit-remove-button"
                idKey={idKey}
                buttonClick={removeClick}>Remove</Button>
        </Box>
    )
}

export default EditBox
