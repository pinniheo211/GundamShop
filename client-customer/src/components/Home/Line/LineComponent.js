import React, { Component } from 'react'
import Line from '../../../assets/Gundam/Line.png'
import './LineModule.scss'
class LineComponent extends Component {
    render() {
        return (
            <div>
                <div className="line">
                    <img src={Line} alt=""></img>
                </div>
            </div>
        )
    }
}

export default LineComponent