import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <div className={"button-component " + this.props.extraClass}
                onClick={this.props.buttonClick}
                id={this.props.idKey}
                style={{
                    userSelect: 'none'
                }}>
                {this.props.children}
            </div >
        )
    }
}
