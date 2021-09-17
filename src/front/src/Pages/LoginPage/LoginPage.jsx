import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { backendService } from '_services';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (backendService.currentTokenValue) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="container-fluid p-5">
        <div className="row justify-content-center">
          <Jumbotron className="col col-sm-5 col-lg-3 p-4">
            <div className="mx-auto">
              <h2>Тестовое задание А-Софт</h2>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                render={({
                  errors, status, touched, isSubmitting,
                }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username">Электронная почта</label>
                      <Field
                        className={`form-control${
                          errors.username && touched.username
                            ? ' is-invalid'
                            : ''}`}
                        name="username"
                        type="text"
                      />
                      <ErrorMessage
                        className="invalid-feedback"
                        component="div"
                        name="username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Пароль</label>
                      <Field
                        className={`form-control${
                          errors.password && touched.password
                            ? ' is-invalid'
                            : ''}`}
                        name="password"
                        type="password"
                      />
                      <ErrorMessage
                        className="invalid-feedback"
                        component="div"
                        name="password"
                      />
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        Вход
                      </button>
                      {isSubmitting
                      && (
                      <img
                        alt="Submitting"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                      />
                      )}
                    </div>
                    {status
                    && <div className="alert alert-danger">{status}</div>}
                  </Form>
                )}
                validationSchema={Yup.object().shape({
                  username: Yup.string().required('Введите емэйл'),
                  password: Yup.string().required('Введите пароль'),
                })}
                onSubmit={(
                  { username, password }, { setStatus, setSubmitting },
                ) => {
                  setStatus();
                  backendService.login(username, password).then(
                    (user) => {
                      //const { from } = this.props.location.state;
                      location.href ="/"
                      //this.props.history.push(from);
                    },
                  ).catch((error) => {
                    console.log(error);
                    setSubmitting(false);
                    alert('Неправильный логин или пароль');
                  });
                }}
              />
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export { LoginPage };
