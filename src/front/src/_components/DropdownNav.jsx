import React, { Component } from 'react';

export default class DropdownNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  }

  render() {
    const { title, children } = this.props;

    return (
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant="link">
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>

        <div
          aria-labelledby="navbarDropdownMenuLink"
          className={`dropdown-menu${this.state.show ? ' show' : ''}`}
        >
          {React.Children.map(children,
            ((child) => React.cloneElement(child, {
              className: 'dropdown-item',
              onMouseUp: this.toggleShow,
            })))}
        </div>
      </Dropdown>
    );
  }
}
