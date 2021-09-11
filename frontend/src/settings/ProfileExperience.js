import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import EditBox from './components/EditBox'
import { BsPen } from 'react-icons/bs'
import { GoCalendar } from 'react-icons/go'

function ProfileExperience() {
    const [state, setState] = useState([])
    const [deletedState, setDeletedState] = useState([])
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        document.title = 'Edit Experience | IUBConnect'

        const token = window.localStorage['token']
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/experience`, config)
                setState(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
        setState(state => [...state, { id: '', title: '', pos: '', year: '' }])
    }

    const removeClick = (e) => {
        e.preventDefault()
        const arr = state.filter((item, index) => index !== parseInt(e.target.id))
        setDeletedState(deletedState => {
            const temp = state[parseInt(e.target.id)]
            if (temp.id === '' &&
                temp.title === '' &&
                temp.pos === '' &&
                temp.year === '')
                return [...deletedState]

            return [...deletedState, temp]
        })
        setState(arr)
    }

    const handleChange = (e) => {
        const arr = [...state]

        if (e.target.placeholder === 'Title') {
            arr[e.target.name] = {
                ...arr[e.target.name],
                title: e.target.value
            }
        } else if (e.target.placeholder === 'Area/Position') {
            arr[e.target.name] = {
                ...arr[e.target.name],
                pos: e.target.value
            }
        } else if (e.target.placeholder === 'Year(s)') {
            arr[e.target.name] = {
                ...arr[e.target.name],
                year: e.target.value
            }
        }

        setState(arr)
    }

    const handleSave = (e) => {
        console.log(state)
        console.log(deletedState)

        const postData = async () => {
            const token = window.localStorage['token']
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            }

            const updateData = async () => {
                state.forEach(async (item) => {
                    if (item.id === '') {
                        try {
                            const response = await axios.post(`${API_URL}/experience`, {
                                title: item.title,
                                pos: item.pos,
                                year: item.year
                            }, config)
                            console.log(response)
                        } catch (error) {
                            console.log(error)
                        }
                    } else {
                        try {
                            const response = await axios.post(`${API_URL}/experience`, {
                                id: item.id,
                                title: item.title,
                                pos: item.pos,
                                year: item.year
                            }, config)
                            console.log(response)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                })

                deletedState.forEach(async (item) => {
                    try {
                        const response = await axios.post(`${API_URL}/experience`, {
                            id: item.id,
                            delete: 'd'
                        }, config)
                        console.log(response)
                    } catch (error) {
                        console.error(error)
                    }
                })
            }
            
            await updateData()
            setRedirect(true)
        }

        postData()
    }

    if (redirect)
        return <Redirect to="/profile" />

    return (
        <div className='main-body-margin'>
            <Box extraClass="main-box">
                <h1>Edit Experience</h1>

                <GridBox>
                    {state.map((item, index) =>
                        <EditBox key={index}
                            idKey={index}
                            name={item.title}
                            qual={item.pos}
                            year={item.year}
                            handleChange={handleChange}
                            removeClick={removeClick}
                            svg1={<BsPen className="list-items" />}
                            svg2={<GoCalendar className="list-items" />}
                            ps1="Title"
                            ps2="Area/Position"
                            ps3="Year(s)" />
                    )}
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
                {state.length !== 0 || deletedState.length !== 0 ?
                    <button className="login-button"
                        onClick={handleSave}
                    >Save</button>
                    : <div style={{ display: 'none' }}></div>
                }
            </Box>
        </div>
    )
}

export default ProfileExperience
