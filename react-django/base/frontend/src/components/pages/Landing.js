import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

export class Landing extends Component {
  render() {
    return (
      <div>
        <h1
          style={{
            fontFamily: "Montserrat",
            fontSize: 150,
            textAlign: "center",
            color: "white",
            textShadow: "5px 5px 5px 	#484848"
          }}
        >
          Agile Link
        </h1>

        <p
          style={{
            fontFamily: "Roboto",
            fontSize: 30,
            textAlign: "center",
            color: "white",
            textShadow: "5px 5px 5px 	#484848"
          }}
        >
          Boost students' learning with tools and resources tailored to them
        </p>
      </div>
    );
  }
}

export default Landing;
