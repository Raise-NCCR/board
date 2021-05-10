import React, { useCallback } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { signup } from '../firebase'
import paths from '../paths'

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      await signup(email.value, password.value);
      history.push(paths.home);
    },
    [history]
  )

  return (
    <>
      <div>
        <span>サインアップ</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='email' type='email' placeholder='Eメール' />
        </div>
        <div>
          <input name='password' type='password' placeholder='パスワード' />
        </div>
        <button type='submit'>サインアップ</button>
      </form>
    </>
  )
}

export default withRouter(Signup);