import React from "react";
import { Button, Modal, ModalBody, Input, Form } from "reactstrap";

class PlayerInputModal extends React.Component {
  //create the component state for toggle the showing of the add player modal
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  // pass the value of the users input for player name to addPlayerToGame function
  addPlayer = e => {
    e.preventDefault();
    this.props.addPlayerToGame(e.target.name.value);
  };
  // toggle show/hide for modal
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add Player
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <Form onSubmit={this.addPlayer}>
              <label htmlFor="name">Name</label>
              <Input type="text" name="name" placeholder="Enter Name" />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button color="primary" type="submit" onClick={this.toggle}>
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default PlayerInputModal;
