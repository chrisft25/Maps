import React, {Component} from 'react';
import './App.css';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiY2hyaXNmdDI1IiwiYSI6ImNqemxheXBpaTB0bXczY2s2MG5rM3BrZzgifQ.IJuNpj8FMzhcaHNXSeJM8w",
});

class Mapa extends Component {

  state={
    lat:null,
    long:null,
    counter: 0,
    center:[]
  }

constructor(props){
  super(props);
  
}

componentDidMount(){
  console.log(this.state)
this.interval2 = setInterval(()=>{
  this.setState({
    counter: this.state.counter+1
  })
},1200);

  this.interval = setInterval(() => {
    fetch('https://lit-reaches-54466.herokuapp.com/coordenadas')
    .then((data)=>{
      return data.json()
    }).then((data =>{

      this.setState({
        lat:data.data.latitud,
        long:data.data.longitud,
      })
    }))
    
  }, 1000);
  }

componentWillUnmount() {
  clearInterval(this.interval);
  clearInterval(this.interval2);
}


  render(){

  return (
    <div className="App">
      {/* <div>{this.state.counter}</div> */}
      {
        (this.state.lat) ? (
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            zoom={[16]}
            center={[this.state.long,this.state.lat]}
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            renderChildrenInPortal={true}> 
            {/* <Marker
            coordinates={[this.state.long,this.state.lat]}
            >
              Hola
            </Marker> */}
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15", "icon-size":2 }}
                  key={this.state.counter}>
                  <Feature coordinates={[this.state.long,this.state.lat]}/>
                </Layer>
            </Map>  
        ) : 'Cargando data'
      }
    </div>
  );
}
}

export default Mapa
