import React, { Component } from 'react'

export default class GridBox extends Component {
    render() {
        return (
            <div className="grid-box">
                {this.props.children}
            </div>
        )
    }
}
