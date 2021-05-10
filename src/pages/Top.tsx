import React, { useContext, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Login from '../components/Login';
import Signup from '../components/Signup';
import { FirebaseContext } from '../contexts';
import paths from '../paths';

const Top: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(FirebaseContext)

  useEffect(() => {
    user && history.push(paths.home)
  }, [history]);

  return (
    <div className='wrap-top'>
      <div className='wrap-login'>
        <div>
          <Login />
        </div>
      </div>
      <div className='wrap-signup'>
        <Signup />
      </div>
    </div>
  )
}

export default withRouter(Top)
