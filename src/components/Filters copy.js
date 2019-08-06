import React, { Component, createRef } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete from 'react-places-autocomplete';

export class Filters extends Component {
    constructor(props){
    super (props)
      this.state={
        currentLatLng:{
          lat: 0,
          lng:0,
        },
        radius: 500,
      isMarkerShown: false,
      currentSchools:{}
    }
  }

  componentDidMount(){
    this.getGeoLocation();
  }

  getGeoLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          position => {
              console.log(position.coords);
              this.setState(prevState => ({
                  currentLatLng: {
                      // ...prevState.currentLatLng,
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              }))
          }
      )
  } else {
       console.log("error")
  }
}

createMarker=()=>{
    const schoolResults = this.state.currentSchools
  console.log(schoolResults);
  const nearSchools=schoolResults.map(element=>{
    console.log(element.geometry.location)
     return(<Marker
      key={element.id}
    name = {element.name}
    position = {element.geometry.location}
    />)
  });return nearSchools;
}

searchSchools = (mapProps,map) => {
  console.log("searching")
  const { google } = mapProps;
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: this.state.currentLatLng,
    radius: this.state.radius,
    type: ["school"]
  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      this.setState({
        currentSchools: results,
    }); console.log(this.state.currentSchools)
this.createMarker();

    }
    else{
      console.log("no encontrado")
    }
  });
};


    render() {
        return (
            <div>
                <input id="autocomplete" type="text" className="searchBar" placeholder="Buscar escuelas cercanas a tu ubicación" />
                <legend>Escolaridad</legend>
                <ul className="radio">
                    <li><input type="radio" className="preescolar" value="in" /><label >Preescolar</label></li>
                    <li><input type="radio" className="primaria" value="out" /><label >Primaria</label></li>
                </ul>

                <fieldset class="radiogroup">
                    <legend>Secundaria</legend>
                    <ul className="radio">
                        <li><input type="radio" className="primero" value="in" /><label for="del1">Primero</label></li>
                        <li><input type="radio" className="segundo" value="out" /><label for="del2">Segundo</label></li>
                        <li><input type="radio" className="tercero" value="delivery" /><label for="del3">Tercero</label></li>
                    </ul>
                </fieldset>

                <ul class="radio">
                    <li><input type="radio" className="medioSuperior" value="in" /><label >Medio Superior</label></li>
                </ul>
                <label>Distancia  <input type="range" className="distancia" name="radio" min="1" max="30" step="1" value="20" /> </label>

                {/* <div className="mapa" id="google-map" ref={this.googleMapRef}>
                </div> */}
                <Map
                google={this.props.google} zoom={15}
                center  = {this.state.currentLatLng}
                google={this.props.google}
                onReady={this.searchSchools}
                >

                <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position = {{lat: this.state.currentLatLng.lat, lng: this.state.currentLatLng.lng}}
                />
             {/*}   {this.state.currentSchools.map((marker,i)=>{
                  return (
                    <AnyReactComponent
                    lat={marker.lat}
                    lng={marker.lng}
                    img_src={marker.img_src
                    }
                    />
                  )
                })}*/}
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
            </div>
        </InfoWindow>
      </Map>

            </div>
        )
    }
}

// export default Filters;
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAU9glT1jY7iaGsjhviTrnl8RgJzfvZci4"),
})(Filters)