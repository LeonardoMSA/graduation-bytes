import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

interface RsvpData {
  name?: string;
  hasGuest?: boolean;
  guestName?: string;
}

export async function saveRsvpToFirestore(data: RsvpData): Promise<void> {
  await addDoc(collection(db, 'rsvps'), {
    name: data.name ?? '',
    hasGuest: data.hasGuest ?? false,
    guestName: data.guestName ?? '',
    createdAt: serverTimestamp(),
  });
}
