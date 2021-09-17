import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

class HiddenText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleHide = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
    setTimeout(this.handleHide, 4000);
  }

  render() {
    const { text, placeholder = 'Скрыт' } = this.props;
    const { show } = this.state;
    return (
      <Button
        variant={show ? 'outline-secondary' : 'secondary'}
        onClick={this.handleShow}
      >
        {show ? text : placeholder}
      </Button>
    );
  }
}

HiddenText.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default HiddenText;
