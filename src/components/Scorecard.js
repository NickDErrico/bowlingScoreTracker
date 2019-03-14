import React, { Component } from "react";
import Frame from "./Frame";

class Scorecard extends Component {
  //if players exist map through them and render 10 frames inside the players scorecard
  renderFrames = () =>
    this.props.playerInfo.frames.map((frame, idx) => (
      <Frame
        key={idx}
        frame={frame}
        idx={idx}
        playerInfo={this.props.playerInfo}
        currRoll={this.props.currRoll}
      />
    ));

  render() {
    return (
      <div className="scorecard">
        <div className="frame-container">
          {this.props.playerInfo.frames && this.renderFrames()}
        </div>
      </div>
    );
  }
}

export default Scorecard;
