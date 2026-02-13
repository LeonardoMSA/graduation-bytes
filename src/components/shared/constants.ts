// Shared constants used across multiple components
// Paleta: azuis (#A6CEE8, #7BB1D9, #3794CF, #077BC6, #0668BC) + lilases (#CBBACE, #CB8CC2)

export const PALETTE = {
  bluePastel: '#A6CEE8',
  blueMedium: '#7BB1D9',
  blueVivid: '#3794CF',
  blueIntense: '#077BC6',
  blueDeep: '#0668BC',
  lilacLight: '#CBBACE',
  lilacMedium: '#CB8CC2',
} as const;

export const THEME = {
  desktop: PALETTE.blueVivid,
  titleBar: PALETTE.blueDeep,
  titleText: '#FFFFFF',
  winFace: '#D4D0C8',
  winFace2: '#ECE9D8',
  winShadow: '#808080',
  winDkShadow: '#404040',
  winHighlight: '#FFFFFF',
  winLight: '#F5F5F5',
  text: '#000000',
  subText: '#3B3B3B',
  lilac: PALETTE.lilacLight,
  plum: PALETTE.lilacMedium,
  progress1: PALETTE.blueIntense,
  progress2: PALETTE.blueDeep,
  navy: PALETTE.blueDeep,
  deep: '#06122A',
  paper: '#ECE9D8',
  ink: '#101114',
};

export const PIXEL_COLORS = [
  PALETTE.bluePastel,
  PALETTE.lilacMedium,
  PALETTE.blueVivid,
  PALETTE.lilacLight,
  PALETTE.blueMedium,
  PALETTE.blueIntense,
  PALETTE.blueDeep,
  '#ffffff',
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
