import React, { Component } from 'react';

export default class Map extends Component {

    onScriptLoad = () => {
        this.map = new window.google.maps.Map(
            document.getElementById(this.props.id),
            this.props.options);
        this.props.onMapLoad(this.map)
    }

    async componentDidMount() {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAU9glT1jY7iaGsjhviTrnl8RgJzfvZci4&libraries=places`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    }

    render() {
        return (
            <div style={{ width: 500, height: 500 }} id={this.props.id} />
        )
    }
}