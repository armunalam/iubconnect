import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <div className={"button-component " + this.props.extraClass}>
                {this.props.children}
            </div>
        )
    }
}
