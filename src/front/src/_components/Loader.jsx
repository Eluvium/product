import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';

export class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={css(styles.background)}>
        <div className={css(styles.text)}>
          Загрузка...
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  text: {
    color: 'rgb(255,255,255)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '20px',
    fontWeight: 'bold',
  },
});
