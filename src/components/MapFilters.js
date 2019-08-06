import React, { Component } from 'react';

export default class Filter extends Component {
    constructor(props){
        super();
    }

    render(){
        return(
            <div className='container'>
                <label htmlFor="gradeFilter">Nivel:</label>{" "}
                <select
                    className="custom-select"
                    name="gradeFilter"
                    value={this.props.filters.priceFilter}
                    onChange={this.props.setFilter}
                >
                    <option value={-1}>Mostrar todo</option>
                    <option value={0}>Preescolar</option>
                    <option value={1}>Primaria</option>
                    <option value={2}>Secundaria</option>
                    <option value={3}>Preparatoria</option>
                </select>
            </div>
        )
    }
}