import React, {Component} from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAP_KEY,
});

class Mapa extends Component {
  state={
    lat: null,
    long: null,
    counter: 0,
    center: []
  }

  componentDidMount() {
    this.interval2 = setInterval(()=>{
      this.setState({
        counter: this.state.counter+1
      })
    },1200);

    this.interval = setInterval(() => {
      fetch(process.env.REACT_APP_API_URL)
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
      <div className="App" style={{textAlign:"center"}}>
        {
          (this.state.lat) ? (
            <div>
              <h1 style={{position:"relative",zIndex:"2"}}>BASTÓN INTELIGENTE</h1>
              <Map
                 style="mapbox://styles/mapbox/streets-v9"
                 zoom={[16]}
                 center={[this.state.long,this.state.lat]}
                 containerStyle={{
                   height: "90vh",
                   width: "90vw",
                   position: "absolute",
                   top: "55%",
                   left: "50%",
                   transform: "translate(-50%,-50%)",
                   border: "20px solid red",
                   marginBottom:"10px"
                 }}
                 renderChildrenInPortal={true}
              >
                <Layer
                   type="symbol"
                   id="marker"
                   layout={{ "icon-image": "marker-15", "icon-size":2 }}
                   key={this.state.counter}>
                  <Feature coordinates={[this.state.long,this.state.lat]}/>
                </Layer>
              </Map>
            </div>
          ) : 'Cargando data'
        }
      </div>
    );
  }
}

export default Mapa;
