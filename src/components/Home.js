import React from "react";
import MapComponent from "./MapComponent";
import Filters from "./Filters";
// import { Link } from "react-router-dom";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      loadedPlaces: [],
      filteredPlaces: [],
      filters: {
        // -1 es el estado inicial
        lvlFilter: -1,
        ratingFilter: -1
      },
    };
  }

  setLoadedPlaces = loadedPlaces => {
    this.setState({ loadedPlaces });
  };

  setFilter = e => {
    const { value, name } = e.target;

    let newFilters = { [name]: Number(value) };
    if (name === "lvlFilter") {
      newFilters.ratingFilter = this.state.filters.ratingFilter;
    } else {
      newFilters.lvlFilter = this.state.filters.lvlFilter;
    }
    this.setState({ filters: newFilters }, this.setFilteredPlaces);
  };

  setFilteredPlaces = () => {
    // traer solo los que cumplen las condiciones
    const filteredPlaces = this.state.loadedPlaces.filter(e => {
      const lvlFilter =
        this.state.filters.lvlFilter > -1
          ? e.lvl_level <= this.state.filters.lvlFilter
          : true;
      const ratingFilter =
        this.state.filters.ratingFilter > -1
          ? e.rating >= this.state.filters.ratingFilter
          : true;
          console.log('rating filter')
      return lvlFilter && ratingFilter;
    });
    this.setState({ filteredPlaces });
  };

  getGroupedPlaces = () => {
    let placesInGroupsOfTwo = [];

    this.state.filteredPlaces.forEach((place, i) => {
      if (i % 3 === 0) {
        placesInGroupsOfTwo.push([place]);
      } else {
        let lastArray = placesInGroupsOfTwo[placesInGroupsOfTwo.length - 1];
        lastArray.push(place);
      }
    });
    return placesInGroupsOfTwo;
  };

  render() {
    window.filteredPlaces = this.state.filteredPlaces;
    return (
      <div>
        <Filters filters={this.state.filters} setFilter={this.setFilter} />

        <MapComponent
            // mainLocation={this.props.mainLocation}
            filteredPlaces={this.state.filteredPlaces}
            loadedPlaces={this.state.loadedPlaces}
            setLoadedPlaces={this.setLoadedPlaces}
            setFilteredPlaces={this.setFilteredPlaces}
        />

        <div className="container" style={{ marginTop: "20px" }}>
          {this.getGroupedPlaces().map((places, i) => (
            <div className="row" key={`places${i}`}>
              {places.map((place, i2) => (
                <div
                  className="col-md card"
                  key={`place${i2}`}
                  style={{ margin: "5px", paddingTop: "5px" }}
                >
                    <div className="card-body">
                    <h6 className="card-title" style={{'fontSize': '20px'}}>{place.name}</h6>
                    <p>{place.vicinity}</p>
                  </div>
                  {place.photos && place.photos.length > 0 ? (
                    <img
                      className="card-img-top"
                      src={place.photos[0].getUrl()}
                      alt={place.name}
                      style={{'width': '400px'}}
                    />
                  ) : (
                    <img
                      className="card-img-top"
                      src='http://louispasteur.edu.mx/images/2018/02/02/primaria.jpg'
                      alt={place.name}
                      style={{'width': '400px'}}

                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;