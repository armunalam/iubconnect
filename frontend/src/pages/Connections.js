import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import API_URL from '../urls'
import Box from '../components/Box'
import GridBox from '../components/GridBox'
import { BsFillPersonLinesFill, BsBuilding } from 'react-icons/bs'

export default function Connections() {
    const [users, setUsers] = useState([])
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        axios.get(`${API_URL}/allaccount/`).then(response => {
            setUsers(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if (users.length === 0)
            setEmpty(true)
        else setEmpty(false)
    }, [users])

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



// export default class Connections extends Component {
//     state = {
//         users: [],
//         empty: false,
//     }

//     componentDidMount() {
//         axios.get(`${API_URL}/allaccount/`).then(response => {
//             this.setState({ users: response.data })
//             console.log(response)
//             if (this.state.users.length === 0)
//                 this.setState({ empty: true })
//             else this.setState({ empty: false })
//         }).catch(error => console.log(error))
//     }

//     componentDidUpdate(users) {

//     }

//     render() {
//         return (
//             <div className='main-body-margin'>
//                 <Box extraClass="main-box">
//                     <h1>Connections</h1>
//                     {!this.state.empty ? (
//                         <GridBox>
//                             {this.state.users.map(user =>
//                                 <Box extraClass="box-padding box-button">
//                                     <h2>{`${user.first_name} ${user.last_name}`}</h2>
//                                     <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />{user.user_type}</p>
//                                     <p className="vertical-flexbox"><BsBuilding className="list-items" />{user.department_name}</p>
//                                 </Box>
//                             )}
//                             {/* <Box extraClass="box-padding box-button">
//                             <h2>Claret Bolt</h2>
//                             <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
//                             <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
//                         </Box>
//                         <Box extraClass="box-padding box-button">
//                             <h2>Mayabee Tahsin</h2>
//                             <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
//                             <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
//                         </Box>
//                         <Box extraClass="box-padding box-button">
//                             <h2>Tahmid Hossain</h2>
//                             <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Student</p>
//                             <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
//                         </Box>
//                         <Box extraClass="box-padding box-button">
//                             <h2>Talha Hassan</h2>
//                             <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Alumnus</p>
//                             <p className="vertical-flexbox"><BsBuilding className="list-items" />Economics</p>
//                         </Box>
//                         <Box extraClass="box-padding box-button">
//                             <h2>Zannat Chowdhury</h2>
//                             <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Faculty</p>
//                             <p className="vertical-flexbox"><BsBuilding className="list-items" />Computer Science and Engineering</p>
//                         </Box>
//                         <Box extraClass="box-padding box-button">
//                             <h2>Jannat Khair</h2>
//                             <p className="vertical-flexbox"><BsFillPersonLinesFill className="list-items" />Faculty</p>
//                             <p className="vertical-flexbox"><BsBuilding className="list-items" />Media and Communications</p>
//                         </Box> */}
//                         </GridBox>
//                     ) : <h2>You have no connection yet.</h2>}
//                 </Box>
//             </div>
//         )
//     }
// }
