import React, { Component } from "react";
import { ButtonGroup, Button } from "reactstrap";

class Pins extends Component {
  state = {
    pinsDown: null
  };
  //call calcCurrRoll within App and pass it the number of pins knocked down
  //also set the state of pinsDown to the num for the disableButton function
  handleClick(num) {
    this.props.calcCurrRoll(this.props.currRoll, num);
    this.setState({ pinsDown: num });
  }

  // disable buttons if the button plus the previous roll in the frame would
  //exceed 10
  disableButton = num => {
    if (this.state.pinsDown === null) {
      return false;
    } else if (this.props.currRoll[1][1]) {
      if (this.state.pinsDown + num > 10) {
        return true;
      }
    } else {
      return false;
    }
  };

  //function to render the pin buttons
  renderPinButtons() {
    //create empty array for the button jsx
    let buttonArr = [];
    for (let i = 0; i <= 10; i++) {
      //push each button into the array
      buttonArr.push(
        <Button
          key={i}
          color="primary"
          disabled={this.disableButton(i)}
          onClick={e => this.handleClick(i)}
        >
          {i}
        </Button>
      );
    }
    //return all the buttons
    return buttonArr;
  }
  render() {
    return (
      <ButtonGroup className="pin-count-controls">
        {this.renderPinButtons()}
      </ButtonGroup>
    );
  }
}

export default Pins;
