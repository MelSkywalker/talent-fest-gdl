import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Card from './Card';
import Script from 'react-load-script';

export class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatLng: {
        lat: 0,
        lng: 0
      },
      radius: 1500,
      isMarkerShown: false,
      currentSchools: [],
      keyword: '',
    };
    this.initialState = this.state.currentSchools;
    this.markers = []
  }

  componentDidMount() {
    this.getGeoLocation();
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {
        types: ['geocode'],
        componentRestrictions: {'country': 'mx'}
    });
    this.places = new google.maps.places.PlacesService(this.map)
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect)
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState(prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
    } else {
      console.log("navigator.geolocation error");
    }
  };

  searchSchools = (mapProps, map) => {
      console.log('searching');
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location: this.state.currentLatLng,
        radius: this.state.radius,
        type: ["school"],
        keyword: this.state.keyword
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({
            currentSchools: results
          });
          this.renderCard();
        } else {
          console.log(status);
        }
      }
    );
  };

  handlePlaceSelect = () => {
      var place = this.autocomplete.getPlace();
      this.setState({
          currentLatLng: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
          }
      })
      console.log(this.state.currentLatLng);
      if(place.geometry) {

      }
  }

  clearSchools = () => {
      this.setState({
          currentSchools: (this.initialState)
      })
  }

  onRadioSelect = (e) => {
      console.log('onRadioSelect: ' + e.currentTarget.value);
      this.setState({
          keyword: e.currentTarget.value
      })
console.log(this.state.keyword);
  }

  renderCard = () => {
      const {currentSchools} = this.state;
      if(currentSchools.length){
          return(
          currentSchools.map(school => 
            <Card
                name={school.name}
            ></Card>)
          );
      }
      return null;
  }
  
  render() {
    return (
      <div>
             
        <input type="text" id="autocomplete" placeholder="Ciudad, colonia, calle, CP" hintText="Search City" style={{maxWidth: 800, margin: '0 auto'}} />
 
        <legend>Escolaridad</legend>
        <ul class="radio">
          <li>
            <input type="radio" className="preescolar" value="preescolar" onChange={this.onRadioSelect} />
            <label>Preescolar</label>
          </li>
          <li>
            <input type="radio" className="primaria" value="primaria" onChange={this.onRadioSelect} />
            <label>Primaria</label>
          </li>
          <li>
            <input type="radio" className="secundaria" value="secundaria" onChange={this.onRadioSelect} />
            <label>Secundaria</label>
          </li>
        </ul>
{/* 
        <fieldset class="radiogroup">
          <legend>Secundaria</legend>
          <ul class="radio">
            <li>
              <input type="radio" className="primero" value="in" />
              <label for="del1">Primero</label>
            </li>
            <li>
              <input type="radio" className="segundo" value="out" />
              <label for="del2">Segundo</label>
            </li>
            <li>
              <input type="radio" className="tercero" value="delivery" />
              <label for="del3">Tercero</label>
            </li>
          </ul>
        </fieldset> */}

        <ul class="radio">
          <li>
            <input type="radio" className="medioSuperior" value="in" />
            <label>Medio Superior</label>
          </li>
        </ul>
        <label>
          Distancia{" "}
          <input
            type="range"
            className="distancia"
            name="radio"
            min="1"
            max="30"
            step="1"
            value="20"
          />{" "}
        </label>

        {this.renderCard}

        <Map
        id='myMap'
          zoom={15}
          center={this.state.currentLatLng}
          google={this.props.google}
          onReady={this.searchSchools}
          onCenterChanged={this.searchSchools}
        >
            {this.state.currentSchools.map(school => <Marker name={school.name} position={{lat: school.geometry.location.lat(), lng: school.geometry.location.lng()}} key={school.name} />)}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "API_KEY"
})(Filters);
