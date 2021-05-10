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
    [input]
  )

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={onAdd} disabled={!input}>
        送信
      </button>
    </div>
  );
};

export default withRouter(AddPost);
