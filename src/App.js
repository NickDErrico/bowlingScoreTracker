import React, { Component } from "react";
import "./App.css";
import { Button } from "reactstrap";
import Player from "./components/Player";
import AddPlayer from "./components/AddPlayer";
import Pins from "./components/Pins";

class App extends Component {
  state = {
    players: [],
    morePlayers: true,
    currRoll: [] // [playeridx, [frameidx, rollidx]]
  };

  // TODO - write up end of game functionality
  //The controller of the game. calcCurrRoll is the function that transitions from
  //roll to roll, frame to frame, and player to player.
  calcCurrRoll = (rollInfo, num) => {
    if (!rollInfo.length) {
      rollInfo = [0, [0, 0]];
    }
    //create copy of current rollInfo so we can alter as needed without affecting
    //the actual rollInfo that we may need for setState later on
    let newRollInfo = rollInfo.slice();

    let playeridx = newRollInfo[0];
    let frameidx = newRollInfo[1][0];
    let rollidx = newRollInfo[1][1];
    if (
      playeridx === this.state.players.length - 1 &&
      rollidx === 1 &&
      frameidx !== 9
    ) {
      //if it is the last player in the rotation, increment the frame
      frameidx++;
      if (
        frameidx === 9 &&
        playeridx === this.state.players.length - 1 &&
        rollidx === 2
        //if it is the last roll in the last frame of the last player then end game
      ) {
        console.log("game over");
        //if we increment the frame and the game has not ended start back at the
        //top of the player rotation at the first roll of the new frame
      } else {
        newRollInfo = [0, [frameidx, 0]];
      }
      //if it is the last role in the players frame increment the player
    } else if (rollidx === 1) {
      newRollInfo = [playeridx + 1, [frameidx, 0]];
    } else {
      //if a strike was rolled
      if (num === 10) {
        //if we are at the end of the player rotation jump back up to the top of
        //the line up at the next frame first roll
        if (playeridx === this.state.players.length - 1) {
          newRollInfo = [0, [frameidx + 1, 0]];
          //if there are more players to bowl in the current frame increment to
          //next player in lineup
        } else {
          newRollInfo = [playeridx + 1, [frameidx, 0]];
        }
        //if it is the first roll in the players frame increment the roll
      } else {
        newRollInfo = [playeridx, [frameidx, rollidx + 1]];
      }
    }

    //update state with the change to the current roll pointer from calcCurrRoll
    // and update the player the score of who just rolled where they rolled
    this.updateRoll(num, rollInfo, newRollInfo);
  };
  //function for updating state for roll tracker(currRoll) and player/frame score
  updateRoll(num, rollInfo, newRollInfo = false) {
    this.setState({
      //if there a newRollInfo was passed in use that other set currRoll to rollInfo
      currRoll: newRollInfo ? newRollInfo : rollInfo,

      players: [
        ...this.state.players.map((player, i) => {
          if (i === rollInfo[0]) {
            return {
              ...player,
              total: player.total + num,
              frames: player.frames.map((frame, j) => {
                if (j === rollInfo[1][0]) {
                  let newFrame = frame.slice();
                  newFrame[rollInfo[1][1]] = num;
                  return newFrame;
                }
                return frame;
              })
            };
          } else {
            return player;
          }
        })
      ]
    });
  }
  //function for creating the player obj in state
  addPlayerToGame = name => {
    const frame = [null, null];
    const lastFrame = [null, null, null];
    const newFrames = [];
    //create 10 frames, each frame should be an array with 2 null elements that
    //will later become the score of the first and second rolls of the frame
    for (let i = 1; i <= 10; i++) {
      //if it is the last frame add 3 null elements instead since the last frame
      //get 3 rolls potentially
      if (i === 10) {
        newFrames.push([null, null, null]);
      } else {
        newFrames.push([null, null]);
      }
    }
    //create the playerObj and update state.players with the new playerObj
    let playerObj = {
      name: name,
      frames: newFrames,
      total: 0,
      history: []
    };
    this.setState({ players: [...this.state.players, playerObj] });
  };

  //hide the add player button once the game has started
  hideAddButton = () => {
    this.setState({ morePlayers: !this.state.morePlayers });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>React Bowling</h2>
        </div>
        {/*check the state of morePlayers if false disable the addPlayer button*/}
        {this.state.morePlayers ? (
          <div className="add-player-button">
            <AddPlayer addPlayerToGame={this.addPlayerToGame} />
          </div>
        ) : null}
        <div className="start-button">
          <Button
            onClick={this.hideAddButton}
            color={this.state.morePlayers ? "success" : "secondary"}
          >
            Start
          </Button>
        </div>
        {/* if there are players map over them and create the player scorecard */}
        {this.state.players
          ? this.state.players.map((player, idx) => (
              <Player
                key={idx}
                playerInfo={player}
                currRoll={this.state.currRoll}
              />
            ))
          : null}
        <Pins
          morePlayers={this.state.morePlayers}
          calcCurrRoll={this.calcCurrRoll}
          currRoll={this.state.currRoll}
        />
      </div>
    );
  }
}

export default App;
