import { AtomElement } from '../types';

export const ELEMENTS: Record<string, AtomElement> = {
  H: {
    id: 'H',
    symbol: 'H',
    name: 'Hydrogen',
    color: '#F8FAFC', // Slate 50 (White)
    borderColor: '#94A3B8',
    radius: 12,
    mass: 1,
  },
  O: {
    id: 'O',
    symbol: 'O',
    name: 'Oxygen',
    color: '#EF4444', // Red 500
    borderColor: '#B91C1C',
    radius: 16,
    mass: 16,
  },
  C: {
    id: 'C',
    symbol: 'C',
    name: 'Carbon',
    color: '#475569', // Slate 600 (Dark Gray)
    borderColor: '#1E293B',
    radius: 15,
    mass: 12,
  },
  N: {
    id: 'N',
    symbol: 'N',
    name: 'Nitrogen',
    color: '#3B82F6', // Blue 500
    borderColor: '#1D4ED8',
    radius: 15,
    mass: 14,
  },
  Na: {
    id: 'Na',
    symbol: 'Na',
    name: 'Sodium',
    color: '#A855F7', // Purple 500
    borderColor: '#7E22CE',
    radius: 18,
    mass: 23,
  },
  Cl: {
    id: 'Cl',
    symbol: 'Cl',
    name: 'Chlorine',
    color: '#10B981', // Emerald 500
    borderColor: '#047857',
    radius: 17,
    mass: 35.5,
  },
  He: {
    id: 'He',
    symbol: 'He',
    name: 'Helium',
    color: '#38BDF8', // Cyan 400
    borderColor: '#0284C7',
    radius: 12,
    mass: 4,
  },
  Fe: {
    id: 'Fe',
    symbol: 'Fe',
    name: 'Iron',
    color: '#F59E0B', // Amber 500
    borderColor: '#B45309',
    radius: 18,
    mass: 56,
  },
  Ar: {
    id: 'Ar',
    symbol: 'Ar',
    name: 'Argon',
    color: '#EC4899', // Pink 500
    borderColor: '#BE185D',
    radius: 16,
    mass: 40,
  },
  Ne: {
    id: 'Ne',
    symbol: 'Ne',
    name: 'Neon',
    color: '#F97316', // Orange 500
    borderColor: '#C2410C',
    radius: 13,
    mass: 20,
  },
};
