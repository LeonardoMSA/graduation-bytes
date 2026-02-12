// Shared constants used across multiple components

export const THEME = {
  desktop: '#3A6EA5',
  titleBar: '#0A246A',
  titleText: '#FFFFFF',
  winFace: '#D4D0C8',
  winFace2: '#ECE9D8',
  winShadow: '#808080',
  winDkShadow: '#404040',
  winHighlight: '#FFFFFF',
  winLight: '#F5F5F5',
  text: '#000000',
  subText: '#3B3B3B',
  lilac: '#CBBACE',
  plum: '#A86AA8',
  progress1: '#2D78B7',
  progress2: '#0B6FB4',
  navy: '#0A246A',
  deep: '#06122A',
  paper: '#ECE9D8',
  ink: '#101114',
};

export const PIXEL_COLORS = [
  '#c8ff00', '#ff2d7b', '#00e5ff', '#a855f7',
  '#f59e0b', '#10b981', '#ef4444', '#ffffff',
];

export const STICKER_EMOJIS = ['⭐', '🎉', '💜', '🔥', '🚀'];

export const MARQUEE_ITEMS = [
  'FORMATURA', 'CIÊNCIA DA COMPUTAÇÃO', 'ANIVERSÁRIO', '2026', 'LUIZA OMENA',
];

export const TOTAL_EGGS = 10;

/** Chave e tipo para persistir confirmação de presença (uma vez só) */
export const RSVP_STORAGE_KEY = 'graduation-bytes-rsvp';

export interface RsvpStorage {
  confirmed: boolean;
  name?: string;
  attendance?: string;
  hasGuest?: boolean;
  guestName?: string;
}
