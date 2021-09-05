import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import qs from 'query-string'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

function Search({ match, location }) {
    const [search, setSearch] = useState([])
    const searchParam = qs.parse(location.search)

    useEffect(() => {
        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            params: {
                'q': searchParam.q
            }
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/search`, config)
                setSearch(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [match])

    return (
        <div className='main-body-margin'>
            <Box extraClass="main-box">
                <h1>
                    {search.length !== 1 ?
                        'Search Results' : 'Search Result'
                    } for "{searchParam.q}"
                </h1>
                {search.length !== 0 ? (
                    <GridBox>
                        {search.map(({ first_name, last_name, user_type, department__department_name, user__username }) =>
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
                ) : <h2>No match found.</h2>}
            </Box>
        </div>
    )
}

export default Search
