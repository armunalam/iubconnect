import React, { Component } from 'react'


export default class Skills extends Component {
    render() {
        return (
            <div>
            <div className = 'skills'>
            <h2>Education</h2>
            </div>

            <div className = 'skills-text'>
            <h3>Technical Skills</h3>
            
            <div className='skill-list' >
                <p>Skill 1: ★★★☆☆</p>
                <p>Skill 2: ★★★☆☆</p>
                <p>Skill 3: ★★★☆☆</p>
            </div>
            
            <br />

            <h3>Non-Technical Skills</h3>
            <p>
                <div className='skill-list' >
                <p>Skill 1: ★★★☆☆</p>
                <p>Skill 2: ★★★☆☆</p>
                <p>Skill 3: ★★★☆☆</p>
                </div>
                
            </p>

            </div>
        </div>
        )
    }
}


