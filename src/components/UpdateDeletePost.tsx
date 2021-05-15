import React, { useState, useContext, useCallback } from "react";
import { updatePost, deletePost } from "../firebase";
import { FirebaseContext } from "../contexts";
import { Post } from '../models';

const UpdateDeletePost: React.FC<{ post: Post}> = ({post}) => {
  const [input, setInput] = useState('');
  const { user } = useContext(FirebaseContext);

  const onUpdate = useCallback((event) => {
      event.preventDefault();

      updatePost({
        id: post.id,
        content: post.content,
        creater: user ? user.email : null,
        createdAt: post.createdAt,
      });

      alert('更新しました。');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input]
  );

  const onDelete = useCallback((event) => {
    event.preventDefault();

    deletePost({
      id: post.id,
      content: post.content,
      creater: post.creater,
      createdAt: post.createdAt,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let Log;
  if (post.creater !== user?.email) {
     Log = (
      <div className='log'>
        {post.content}
      </div>
    );
  } else {
    Log = (
      <div className='log-wrapper'>
        <div className='log'>
          <textarea className='input' onChange={(e) => setInput(e.target.value)}>
            {post.content}
          </textarea>
          <div className='button'>
            <button onClick={onUpdate}>更新</button>
            <button onClick={onDelete}>削除</button>
          </div>
          <hr />
        </div>
      </div>
    );
  }


  return (
    <div>
      {Log}
    </div>
  );
};

export default UpdateDeletePost;
