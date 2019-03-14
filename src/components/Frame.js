import React, { Component } from "react";

class Frame extends Component {
  //This is not the best solution as it is recalculating every frame on every roll
  //and if I had more time I would have moved this to App and memoized the function
  //so that it only ran on the currentframe and the previous two to check for strikes
  //and spares

  //create an object to track the total of the frame to be displayed underneath
  //the individual roll scores
  renderFrameTotal() {
    let total = 0;
    //loop through the frames completed up to the current frame and add the totals
    //of each roll to the frame total.
    for (let i = 0; i <= this.props.idx; i++) {
      //if the current frame is a strike, run getNextRolls with the total rolls
      //that need to be checked(2) and the following frame(i + 1)
      if (this.props.playerInfo.frames[i][0] === 10) {
        total += this.getNextRolls(2, i + 1) + 10;
        //if the current frame is a spare(roll1 + roll2 = 10), run getNextRolls
        //with the total rolls that need to be checked(1) and the following
        //frame(i + 1)
      } else if (
        this.props.playerInfo.frames[i][0] +
          this.props.playerInfo.frames[i][1] ===
        10
      ) {
        total += this.getNextRolls(1, i + 1) + 10;
        //if the current role is an open frame just add the first and second rolls
      } else {
        total +=
          this.props.playerInfo.frames[i][0] +
          this.props.playerInfo.frames[i][1];
      }
    }
    return total;
  }

  //Ran on strikes and spares where amount is the amount of rolls to check and i is
  //the frame after the strike or spare
  getNextRolls(amount, i) {
    let rollIdx = 0;
    let total = 0;
    //while there are still rolls to check
    while (amount > 0) {
      //if the frame after the strike/spare has yet to be bowled just return total
      if (
        !this.props.playerInfo.frames[i] ||
        !this.props.playerInfo.frames[i][rollIdx]
      ) {
        return total;
      }
      //if the frame has been rolled add the total to the frame with the strike/spare
      total += this.props.playerInfo.frames[i][rollIdx];
      //if the roll after a strike/spare was also a strike/spare increment the frame
      if (rollIdx === 1 || this.props.playerInfo.frames[i][0] === 10) {
        i++;
        //otherwise increment the roll
      } else {
        rollIdx++;
      }
      //decrement the amount of rolls left to calculate
      amount--;
    }
    return total;
  }

  // render each roll/frame score in designated location
  render() {
    return (
      <div className="frame">
        <div className="rolls">
          <div className="roll">
            {this.props.playerInfo.frames[this.props.idx][0]
              ? this.props.playerInfo.frames[this.props.idx][0]
              : "roll"}
          </div>
          <div className="roll">
            {parseInt(this.props.playerInfo.frames[this.props.idx][1]) >= 0
              ? this.props.playerInfo.frames[this.props.idx][1]
              : "roll"}
          </div>
          {this.props.idx === 9 ? (
            <div className="roll">
              {this.props.currRoll.length
                ? this.props.playerInfo.frames[this.props.idx][2]
                : "roll"}
            </div>
          ) : null}
        </div>
        <div>{this.renderFrameTotal()}</div>
      </div>
    );
  }
}

export default Frame;
