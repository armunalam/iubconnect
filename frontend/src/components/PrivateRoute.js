import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import loading from '../assets/loading.gif'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (auth.isLoading) {
                console.log('Entered Loading')
                return <h1 className="login"><img src={loading} alt="Loading..." /></h1>
            } else if (auth.isAuthenticated === false) {
                return <Redirect to="/login" />
            } else {
                return <Component {...props} />
            }
        }}
    />
)

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute)