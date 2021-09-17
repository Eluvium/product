import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default class PasswordInput extends Component {
  static propTypes = {
    isInvalid: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleTogglePassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    const { onChange, value, isInvalid } = this.props;
    const { showPassword } = this.state;

    return (
      <InputGroup>
        <Form.Control
          isInvalid={isInvalid}
          name="password"
          placeholder="Пароль"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={this.handleTogglePassword}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
