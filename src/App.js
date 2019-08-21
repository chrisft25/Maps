import React, {Component} from 'react';
import logo from './logo.svg';
import icono from './img/red-circle.png'
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class App extends Component {
constructor(props){
  super(props);
  
}

componentWillMount(){ 
  
  this.setState({
  lat:13.83,
  long:-88.91,
  counter: 0
})

  this.interval = setInterval(() => {
    fetch('https://lit-reaches-54466.herokuapp.com/coordenadas')
    .then((data)=>{
      return data.json()
    }).then((data =>{
      this.setState({
        lat2:data.data.latitud,
        long2:data.data.longitud
      })
    }))
    
  }, 1000);

}

componentDidMount(){
  this.interval2 = setInterval(() => {
    if(this.state.lat!=this.state.lat2){
    this.setState({
        lat:this.state.lat2,
        long: this.state.long2,
        counter: this.state.counter+1
      })
    }else{
      this.setState({
        counter: this.state.counter+1
      })
    }
    }, 1000);
  }


componentWillUnmount() {
  clearInterval(this.interval);
  clearInterval(this.interval2);
}



  render(){

  return (
    <div className="App">
      <Map google={this.props.google} zoom={18} initialCenter={{lat:this.state.lat, lng:this.state.long}} center={{lat:this.state.lat, lng:this.state.long}}>
 
        <Marker onClick={this.onMarkerClick}
                title={'Posición actual'}
                name={'Posición actual'}
                position={{lat:this.state.lat, lng:this.state.long}} 
                icon={{
                  url: icono,
                  anchor: new this.props.google.maps.Point(32,32),
                  scaledSize: new this.props.google.maps.Size(32,32)
                }}
                key={this.state.counter}
                />

        <InfoWindow onClose={this.onInfoWindowClose}>
           
        </InfoWindow>
      </Map>
    </div>
  );
}
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDUDLJhwMj7E_XDadPtqPyOkumsDP6NqrE")
})(App)
