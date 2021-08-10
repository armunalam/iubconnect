import React, { Component } from 'react'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

export default class Connections extends Component {
    render() {
        return (
            <div className='main-body-margin'>
                <Box extraClass="main-box">
                    <h1>Connections</h1>
                    <GridBox>
                        <Box extraClass="box-padding box-button">
                            <h2>Claret Bolt</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                        </Box>
                        <Box extraClass="box-padding box-button">
                            <h2>Mayabee Tahsin</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                        </Box>
                        <Box extraClass="box-padding box-button">
                            <h2>Tahmid Hossain</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                        </Box>
                        <Box extraClass="box-padding box-button">
                            <h2>Talha Hassan</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Alumnus</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Economics</p>
                        </Box>
                        <Box extraClass="box-padding box-button">
                            <h2>Zannat Chowdhury</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Faculty</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
                        </Box>
                        <Box extraClass="box-padding box-button">
                            <h2>Jannat Khair</h2>
                            <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Faculty</p>
                            <p className="vertical-flexbox"><BsBuilding className="list-items" />Media and Communications</p>
                        </Box>
                    </GridBox>
                </Box>
            </div>
        )
    }
}
