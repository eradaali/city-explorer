import React, { Component } from 'react'
import axios from 'axios';
import Form from'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Errormsg from './Errormsg';
import Weather from './components/Weather';
 import Movies from './components/Movies';
export class Forme extends Component {

    constructor(props) {
        super(props);
        this.state = {
          cityName: '',
          cityData: '',
          disalay:false,
          error:'',
          alert:false,
          weatherInfo:[],
          moiveInfo:[],
        };
    }

    getData=async(event)=>{
    event.preventDefault();
    try{

      const url=`https://eu1.locationiq.com/v1/search.php?key=pk.60346fba30221450f0bd55e67928ff53&city=${this.state.cityName}&format=json`;
      const req=await axios.get(url);

      this.setState({
        cityData:req.data[0],
       disalay:true,
       alert:false,
       

      });
    }
    catch(err){
        this.setState(
          {error: `${err.message}: ${err.response.data.error}`,
        alert:true})
      }
      this.getWeather();
      this.getMovie()
    };

    updateCity=(event)=>{
        event.preventDefault();
        this.setState({
          cityName:event.target.value,
        });
        
      };
    
      getWeather=async()=>{
        const expressWeatherUrl=`${process.env.REACT_APP_CLIENT_SERVER}/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;
        const reqExpress=await axios.get(expressWeatherUrl);
        console.log(expressWeatherUrl);
        this.setState({
          weatherInfo:reqExpress.data
        });
        console.log(this.state.weatherInfo);
      };

      getMovie=async()=>{
        const expressMovieURL=`${process.env.REACT_APP_CLIENT_SERVER}/movie?query=${this.state.cityName}&limit=8`
        console.log(expressMovieURL);
        const reqMovie=await axios.get(expressMovieURL);
        this.setState({
          moiveInfo:reqMovie.data
        });
        
      }
    
    render() {
        return (
            <div>
                  <Errormsg  alert={this.state.alert} error=
        {this.state.error}/>
            <Form onSubmit={this.getData}>
            <Form.Group>
              <Form.Label>City name</Form.Label>
              <Form.Control placeholder="Write the City Name .." size="lg" type="text"  onChange={this.updateCity}  />
            </Form.Group>
            <Button variant="dark" type="submit">
              Serach
            </Button>
          </Form>

          
        {this.state.disalay &&
          <>
            <p>{this.state.cityData.display_name}</p>
            <h5> Longitude: {this.state.cityData.lon}, Latitude: {this.state.cityData.lat}</h5>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.60346fba30221450f0bd55e67928ff53&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10&size=500x500`} rounded />;
           
      </>}

 <Weather weatherInfo={this.state.weatherInfo}/>
 <Movies movieInfo={this.state.moiveInfo}/>

            </div>
        )
    }
}

export default Forme