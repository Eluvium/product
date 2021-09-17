import React from 'react';
import { Route, Router } from 'react-router-dom';

import { history } from '_helpers';
import { backendService } from '_services';
import { PrivateRoute } from '_components';
import HomePage from 'Pages/HomePage';
import { LoginPage } from 'Pages/LoginPage';
import Header from '_components/Header';
import * as routes from 'routes';
import { matchPath } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
    };
  }

  componentWillMount() {
    //this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
  }

  componentDidMount() {
    backendService.token.subscribe((x) => {
      // alert(x)
      this.setState({ token: x });
    });
  }

  componentWillUnmount() {
    //if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }


  logout = () => {
    backendService.logout();
    history.push('/login');
  }

  render() {
    const { token } = this.state;
    // alert(this.state.token)

    return (
      <Router history={history}>
        <div className="wrapper">
          {(token !== null)
            ? (
              <Header
                isSimplified={false}
                logout={this.logout}
                onChangeRoute={this.handleUpdateMatchPath}
              />
            )
            : null}

          <Route component={LoginPage} path="/login" />

          <PrivateRoute exact component={HomePage} path="/" />

        </div>
      </Router>
    );
  }
}

export default App;
