import React, { Component } from 'react'

export class Weather extends Component {
    render() {
        return (
            this.props.weatherInfo.map((data, index) => {
                return (<div key={index}>
                    <p>{data.date}</p>
                    <p>{data.description}</p>
                </div>)
            })
        )
    }
}

export default Weather
