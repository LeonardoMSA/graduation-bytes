import { RSVP_STORAGE_KEY, type RsvpStorage } from '@/components/shared/constants';
import { saveRsvpToFirestore } from './rsvpFirestore';

export function getStoredRsvp(): RsvpStorage | null {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as RsvpStorage;
    return data?.confirmed ? data : null;
  } catch {
    return null;
  }
}

export function saveRsvp(data: Omit<RsvpStorage, 'confirmed'> & { confirmed: true }) {
  try {
    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }

  saveRsvpToFirestore(data).catch(() => {
    // fire-and-forget: Firestore failure doesn't affect local UX
  });
}
