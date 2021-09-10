import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

export default function Connections() {
    const [users, setUsers] = useState([])
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        document.title = 'Connections | IUBConnect'

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/getconnectionlist`, config)
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
                        {users.map(({ first_name, last_name, user_type, department__department_name, user__username }) =>
                            <Link to={`/user/${user__username}`}>
                                <Box extraClass="box-padding box-button">
                                    <h2>{`${first_name} ${last_name}`}</h2>
                                    <p className="vertical-flexbox">
                                        <BsFillPersonLinesFill className="list-items" />
                                        {user_type}
                                    </p>
                                    <p className="vertical-flexbox">
                                        <BsBuilding className="list-items" />
                                        {department__department_name}
                                    </p>
                                </Box>
                            </Link>
                        )}
                    </GridBox>
                ) :
                    <h2 style={{
                        fontWeight: 'normal',
                        marginTop: '-15px',
                        color: '#666666'
                    }}>You have no connection yet.</h2>}
            </Box>
        </div>
    )
}
