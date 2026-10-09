export type ParticleType = 'atom' | 'molecule' | 'compound' | 'element' | 'pure' | 'mixture' | 'solid' | 'liquid' | 'gas';

export type AtomElement = {
  id: string;
  symbol: string;
  name: string;
  color: string;
  borderColor: string;
  radius: number; // in pixels
  mass: number;
};

export type AtomPosition = {
  id: string;
  elementId: string; // references AtomElement.id
  x: number; // percentage 0-100 or relative unit
  y: number;
  vx?: number; // velocity x for simulation
  vy?: number; // velocity y for simulation
};

export type Bond = {
  atom1Id: string;
  atom2Id: string;
  type: 'single' | 'double' | 'triple' | 'ionic';
};

export type ParticleGroup = {
  id: string;
  atoms: AtomPosition[];
  bonds: Bond[];
  xOffset?: number;
  yOffset?: number;
  rotation?: number;
  vx?: number;
  vy?: number;
};

export type ParticleDiagram = {
  id: string;
  title: string;
  description?: string;
  groups: ParticleGroup[];
  // Reaction / Physical-Chemical Change comparison
  reactantsGroups?: ParticleGroup[];
  productsGroups?: ParticleGroup[];
  reactantsLabel?: string;
  productsLabel?: string;
  // Classifications
  isAtom: boolean;
  isMolecule: boolean;
  isElement: boolean;
  isCompound: boolean;
  isPureSubstance: boolean;
  isMixture: boolean;
  isPhysicalChange?: boolean;
  isChemicalChange?: boolean;
  mixtureType?: 'homogeneous' | 'heterogeneous' | 'none';
  stateOfMatter: 'solid' | 'liquid' | 'gas';
  // Educational breakdown
  explanation: string;
  particleCountBreakdown: string;
};

export type DropZone = {
  id: string;
  label: string;
  subLabel?: string;
  acceptTypes: string[]; // matching criteria e.g. ['atom', 'element', 'pure']
  iconName?: string;
  colorTheme: string; // tailwind color border/bg
};

export type LevelDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';

export type GameLevel = {
  id: number;
  title: string;
  category: 'Atom vs Molecule' | 'Element vs Compound' | 'Pure vs Mixture' | 'Matter Matrix' | 'Physical vs Chemical Change' | 'States of Matter' | 'Separation Lab';
  difficulty: LevelDifficulty;
  instruction: string;
  dropZones: DropZone[];
  diagrams: ParticleDiagram[];
  hint: string;
  badgeRewardId?: string;
  unlockedByDefault?: boolean;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name or emoji
  category: string;
  unlocked: boolean;
  unlockedAt?: string;
  reqCondition: string;
};

export type UserProgress = {
  completedLevelIds: number[];
  levelStars: Record<number, number>; // levelId -> 1..3
  levelHighScores: Record<number, number>; // levelId -> score
  unlockedBadgeIds: string[];
  totalScore: number;
  currentStreak: number;
  highestStreak: number;
  builtMoleculesCount: number;
};
