import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//... 
import React, { Component } from 'react'; 
 
const AnyReactComponent = ({img_src})=><div><img src={img_src}className="schools" style={{}}/></div>;
export class MapContainer extends React.Component {
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
componentWillMount(){
  this.getGeoLocation()
 
}
getGeoLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          position => {
              console.log(position.coords);
              this.setState(prevState => ({
                  currentLatLng: {
                      ...prevState.currentLatLng,
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
      <Map 
      google={this.props.google} zoom={10}
      center  = {{lat: 20.650483, lng: -103.4054717}}
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAU9glT1jY7iaGsjhviTrnl8RgJzfvZci4"),
})(MapContainer)