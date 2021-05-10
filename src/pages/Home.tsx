import React, { useContext } from 'react';
import { signout } from '../firebase';
import { FirebaseContext } from '../contexts';
import AddPost from '../components/AddPost';
import Log from '../components/Log';

const Home = () => {
  const { user } = useContext(FirebaseContext)

  return (
    <>
      <header>
        <h1>Home</h1>
      </header>
      <div>
        <Log />
        <AddPost />
      </div>
      <footer>
        <div>
          <p>
            <strong>{user?.email}でログイン中</strong>
          </p>
          <button onClick={signout}>ログアウト</button>
        </div>
      </footer>
    </>
  )
}

export default Home
