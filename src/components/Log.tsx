import React, { useState, useEffect, useContext} from "react";
import { db } from '../firebase';
import { FirebaseContext } from "../contexts";
import { Post } from '../models';
import UpdateDeletePost from './UpdateDeletePost';

const Log: React.FC = () => {
  const[posts, setPosts] = useState<Post[]>([
    {id: '', content: '', creater: '', createdAt: null},
  ])
  const { user } = useContext(FirebaseContext);

  useEffect(() => {
    if (user) {
      const unsub = db
        .collection("threads").doc("thread1").collection("posts")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            creater: doc.data().creater,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
          }))
          data.sort((a, b) => {
            const x = a.createdAt;
            const y = b.createdAt;
            if (!x || !y)
              return 1;
            if (x > y)
              return 1;
            else
              return -1;
          })
          setPosts(data);
        });
      return () => unsub();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {posts && posts.map((post) => <UpdateDeletePost key={post.id} post={post} />)}
    </div>
  )
};

export default Log;
