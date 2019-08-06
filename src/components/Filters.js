import React from "react";
// import Button from 'react-bootstrap/Button';

class Filters extends React.Component {
  render() {
    return (
      <div className="container" style={{ marginTop: "10px", backgroundColor: "#E19B5F",textAlign:"center", fontSize:"20px", fontFamily:'Palatino Linotype', color:"red" }} >
        <div className="row">
          <div className="col-3">
            <label htmlFor="ratingFilter">Calificacion:</label>{" "}
            <select
              className="custom-select"
              name="ratingFilter"
              value={this.props.filters.ratingFilter}
              onChange={this.props.setFilter}
            >
              <option value={-1}>Mostrar todo</option>
              <option value={1}>1 o más</option>
              <option value={2}>2 o más</option>
              <option value={3}>3 o más</option>
              <option value={4}>4 o más</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="col-3">
            <label htmlFor="ratingFilter">Nivel:</label>{" "}
            <select
              className="custom-select"
              name="ratingFilter"
              value={this.props.filters.lvlFilter}
              onChange={this.props.setFilter}
            >
              <option value={-1}>Primaria</option>
              <option value={1}>Preescolar</option>
              <option value={2}>Secundaria</option>
              <option value={3}>Preparatoria</option>
              <option value={4}>Universidad</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;