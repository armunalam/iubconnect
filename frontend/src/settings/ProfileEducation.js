import React from 'react'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import EditBox from './components/EditBox'

function ProfileEducation() {
    
    
    
    const handleClick = (e) => {
        e.preventDefault()
        alert('Hello World')
    }
    
    return (
        <div className='main-body-margin'>
            <Box extraClass="main-box">
                <h1>Edit Education</h1>

                <GridBox>
                    <EditBox />
                    <Box extraClass="box-padding add-button login-button">
                        <div className="center-container"
                            style={{
                                height: '100%',
                                width: '100%'
                            }} onClick={handleClick}>
                            +
                        </div>
                    </Box>
                </GridBox>
            </Box>
        </div>
    )
}

export default ProfileEducation
