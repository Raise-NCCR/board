import React, { useState, useContext, useCallback } from "react";
import { withRouter } from "react-router";
import { FirebaseContext } from "../contexts";
import firebase from 'firebase/app';
import { addPost } from "../firebase";

const AddPost: React.FC = () => {
  const [input, setInput] = useState('');
  const { user } = useContext(FirebaseContext);

  const onAdd = useCallback(
    async (event) => {
      event.preventDefault();

      await addPost({
        content: input,
        creater: user ? user.email : null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })

      setInput('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input]
  )

  return (
    <div className='input-wrapper'>
      <h3>入力</h3>
      <div className='form-wrapper'>
        <textarea
          className='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className='button'
          onClick={onAdd}
          disabled={!input}
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default withRouter(AddPost);
