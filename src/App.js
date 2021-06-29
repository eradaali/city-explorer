import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'

export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      displayName:'',
      longitude:'',
      latitude:''
    }
  }

  nameChangeHandler=(e)=>{
    this.setState({
      displayName:e.target.value
      })
  }
  submitData=async (e)=>{
    e.preventDefault()
    let axiosResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.afaca60038b93085cf4229304fcb1ffc&city=${this.state.displayName}&format=json`)

setTimeout(()=>{
  this.setState({
    displayName:axiosResponse.data[0].display_name,
    longitude:axiosResponse.data[0].lon,
    latitude:axiosResponse.data[0].lat
  })
},3000)
 
    console.log(axiosResponse.data[0].lat)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <input type='text' placeholder='city name....' onClick={(e)=>{this.nameChangeHandler(e)}} />
          <button>Search</button>
        </form>
        <h1>{this.state.displayName}</h1>
        <h1>{this.state.longitude}</h1>
        <h1>{this.state.latitude}</h1>
        <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.afaca60038b93085cf4229304fcb1ffc&center=${this.state.latitude},${this.state.longitude}&zoom=20`} rounded/>
        
      </div>
    )
  }
}

export default  App
