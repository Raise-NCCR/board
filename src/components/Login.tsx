import React, { useCallback }from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { signin } from '../firebase';
import paths from '../paths';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      await signin(email.value, password.value);
      history.push(paths.home);
    },
    [history]
  )

  return (
    <div>
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>ログイン</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <input name='email' type='email' placeholder='Eメール' />
            </div>
            <div>
              <input name='password' type='password' placeholder='パスワード' />
            </div>
            <button type='submit'>ログイン</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default withRouter(Login);
