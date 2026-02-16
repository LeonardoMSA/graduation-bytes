import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Message {
  id: string;
  text: string;
  createdAt: Timestamp | null;
}

const messagesRef = collection(db, 'messages');

export async function sendMessage(text: string, guestName?: string): Promise<void> {
  await addDoc(messagesRef, {
    text,
    guestName: guestName ?? '',
    createdAt: serverTimestamp(),
  });
}

export function subscribeToMessages(
  callback: (messages: Message[]) => void,
): () => void {
  const q = query(messagesRef, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text as string,
      createdAt: (doc.data().createdAt as Timestamp) ?? null,
    }));
    callback(messages);
  });
}
