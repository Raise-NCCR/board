import firebase from 'firebase/app';

export type Post = {
  id?: string,
  creater: string | null,
  content: string,
  createdAt: firebase.firestore.FieldValue | null,
}
