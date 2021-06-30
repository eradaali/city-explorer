
import axios from 'axios';
import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
// import Alert from 'react-bootstrap/Alert';


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
    let axiosResponse= await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.60346fba30221450f0bd55e67928ff53&city=${this.state.displayName}&format=json`)
    let axiosResponse1= await axios.get(`http://localhost:8000/weather?searchQuery=${this.state.displayName}&format=json`)
    this.setState({
      displayName:axiosResponse1.data[0].display_name,
      longitude:axiosResponse1.data[0].lon,
      latitude:axiosResponse1.data[0].lat,


      displayName:axiosResponse.data[0].display_name,
      longitude:axiosResponse.data[0].lon,
      latitude:axiosResponse.data[0].lat
    })
    console.log(axiosResponse.data[0].lat)
    console.log(axiosResponse1.data[0].lat)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitData}>
          <input type='text' placeholder='city name....' onChange={(e)=>{this.nameChangeHandler(e)}} />
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

export default App
