import React, { useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

export default function Connections() {
    const [users, setUsers] = useState([])
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/allaccount/`)
                setUsers(response.data)
                if (response.data.length === 0) setEmpty(true)
                else setEmpty(false)
            } catch (error) {
                setEmpty(true)
                console.error(error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='main-body-margin'>
            <Box extraClass="main-box">
                <h1>Connections</h1>
                {!empty ? (
                    <GridBox>
                        {users.map(({ first_name, last_name, user_type, department_name }) =>
                            <Box extraClass="box-padding box-button">
                                <h2>{`${first_name} ${last_name}`}</h2>
                                <p className="vertical-flexbox">
                                    <BsFillPersonLinesFill className="list-items" />
                                    {user_type}
                                </p>
                                <p className="vertical-flexbox">
                                    <BsBuilding className="list-items" />
                                    {department_name}
                                </p>
                            </Box>
                        )}
                    </GridBox>
                ) : <h2>You have no connection yet.</h2>}
            </Box>
        </div>
    )
}
