import React, { Component } from "react";
import Scorecard from "./Scorecard";

class Player extends Component {
  // Player component to render the player name and scorecard
  render() {
    return (
      <div className="player-scorecard">
        <span className="player-name">
          <h3>{this.props.playerInfo.name}</h3>
        </span>
        <Scorecard
          playerInfo={this.props.playerInfo}
          currRoll={this.props.currRoll}
        />
      </div>
    );
  }
}

export default Player;
