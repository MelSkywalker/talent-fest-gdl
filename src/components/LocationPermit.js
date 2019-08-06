import React from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

class LocationPermit extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
        modalShow: false,
        currentLatLng: {
            lat: 0,
            lng: 0,
        }
    };
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  getGeoLocation = () => {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.setState(prevState => ({
                currentLatLng: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            }))
          })
      }
    // const successAction = position => {
    //   this.setState(prevState => ({
    //       currentLatLng: {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //       }
    //   }))
    //   this.props.setMainLocation({ lat, lng });
    //   this.props.history.push("/home");
    // };

    // const errorAction = () => {
    //   this.props.setStatusMessage("Unable to retrieve your location");
    //   this.props.history.push("/home");
    // };
    navigator.geolocation.getCurrentPosition(successAction, errorAction);
  };

  render() {
    if (!window.navigator.geolocation) {
      this.props.setStatusMessage(
        "Geolocation is not supported by your browser."
      );
      return <Redirect to="/home" />;
    }

    return (
      <Modal
        show={this.state.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ubicación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Acceso</h4>
          <p>
            ¿Autorizas la acción?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.getGeoLocation}>
            Aceptar
          </Button>
          <Button
            variant="secondary"
            onClick={() => this.props.history.push("/home")}
          >
            Ignorar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(LocationPermit);