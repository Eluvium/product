import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '_helpers';

import config from 'config';

const token = new BehaviorSubject(localStorage.getItem('token'));
export const backendService = {
  checkSession,
  token: token.asObservable(),
  get currentTokenValue() {
    return token.value;
  },
  GET,
  POST,
  PUT,
  DELETE,
  login,
  logout,
};

function login(username, password) {
  return new Promise((resolve, reject) => {
    POST('', 'auth', {
      Login: username,
      Password: password,
    })
      .then((user) => {
      // store user details and jwt token in local storage
      // to keep user logged in between page refreshes
        //user = JSON.parse(user);
        if (user.tocken !== "") {
          console.log(user.tocken);
          localStorage.setItem('token', user.tocken);
          token.next(user.tocken);
          resolve(user.tocken);
        } else {
          reject([{}]);
        }
      });
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  token.next(null);
}

function checkSession() {
  return new Promise((resolve, reject) => {
    // let token = localStorage.getItem('token')
    if (token === '') {
      reject();
    }
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${config.apiUrl}/api/user/checkSession`, option)
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject();
        }
      })
      .catch((err) => {
        reject();
      });
  });
}

function GET(model, action) {
  return new Promise((resolve, reject) => {
    let option = {};
    if (action !== 'login') {
      option = {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      };
    }
    if(model === ''){
    fetch(`${config.apiUrl}/api/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }else{
      fetch(`${config.apiUrl}/api/${model}/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }
  });
}

function POST(model, action, param) {
  return new Promise((resolve, reject) => {
    let option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(param),
    };
    if (action !== 'auth') {
      option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(param),
      };
    }
    if(model === ''){
      fetch(`${config.apiUrl}/api/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }else{
      fetch(`${config.apiUrl}/api/${model}/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }
    
  });
}
function PUT(model, action, param) {
  return new Promise((resolve, reject) => {
    let option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(param),
    };
    if (action !== 'auth') {
      option = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(param),
      };
    }
    if(model === ''){
      fetch(`${config.apiUrl}/api/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }else{
      fetch(`${config.apiUrl}/api/${model}/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }
    
  });
}

function DELETE(model, action, param) {
  return new Promise((resolve, reject) => {
    let option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(param),
    };
    if (action !== 'auth') {
      option = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(param),
      };
    }
    if(model === ''){
      fetch(`${config.apiUrl}/api/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }else{
      fetch(`${config.apiUrl}/api/${model}/${action}`, option)
      .then(handleResponse)
      .then((data) => resolve(data));
    }
    
  });
}