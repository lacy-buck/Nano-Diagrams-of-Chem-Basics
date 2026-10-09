import React, { useState, useEffect, useRef } from 'react';
import { ParticleDiagram } from '../types';
import { ParticleDiagramCanvas } from './ParticleDiagramCanvas';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Flame,
  Award,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Search,
  Atom,
  FlaskConical,
  HelpCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Eye,
  BarChart3
} from 'lucide-react';

// Sample diagrams specifically curated for speed blitz - 21 Distinct Chemistry Examples!
const SPEED_BLITZ_POOL: (ParticleDiagram & { correctCategory: 'pure_element' | 'pure_compound' | 'mix_elements' | 'mix_element_compound' })[] = [
  // 1
  {
    id: 'sb_o2',
    title: 'Pure Oxygen Sample (O₂)',
    correctCategory: 'pure_element',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 25, y: 30 }, { id: 'a2', elementId: 'O', x: 35, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'O', x: 65, y: 70 }, { id: 'a4', elementId: 'O', x: 75, y: 70 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }] },
      { id: 'g3', atoms: [{ id: 'a5', elementId: 'O', x: 70, y: 25 }, { id: 'a6', elementId: 'O', x: 80, y: 25 }], bonds: [{ atom1Id: 'a5', atom2Id: 'a6', type: 'double' }] },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Contains only O₂ diatomic molecules. Every particle is identical and made of 1 element.',
    particleCountBreakdown: '3 O₂ Diatomic Molecules',
  },
  // 2
  {
    id: 'sb_co2',
    title: 'Pure Carbon Dioxide (CO₂)',
    correctCategory: 'pure_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 20, y: 40 }, { id: 'a2', elementId: 'C', x: 32, y: 40 }, { id: 'a3', elementId: 'O', x: 44, y: 40 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }, { atom1Id: 'a2', atom2Id: 'a3', type: 'double' }] },
      { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 55, y: 70 }, { id: 'a5', elementId: 'C', x: 67, y: 70 }, { id: 'a6', elementId: 'O', x: 79, y: 70 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'double' }, { atom1Id: 'a5', atom2Id: 'a6', type: 'double' }] },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Pure sample of identical CO₂ compound molecules.',
    particleCountBreakdown: '2 CO₂ Compound Molecules',
  },
  // 3
  {
    id: 'sb_air',
    title: 'Gaseous Mixture (N₂ + Ar)',
    correctCategory: 'mix_elements',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 20, y: 30 }, { id: 'a2', elementId: 'N', x: 30, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'Ar', x: 70, y: 30 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a4', elementId: 'Ar', x: 35, y: 75 }], bonds: [] },
      { id: 'g4', atoms: [{ id: 'a5', elementId: 'N', x: 75, y: 70 }, { id: 'a6', elementId: 'N', x: 85, y: 70 }], bonds: [{ atom1Id: 'a5', atom2Id: 'a6', type: 'triple' }] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Contains both N₂ element molecules and Ar single element atoms.',
    particleCountBreakdown: '2 N₂ molecules + 2 Ar atoms (Mixture of Elements)',
  },
  // 4
  {
    id: 'sb_mix_el_comp',
    title: 'Exhaust Gas (N₂ + CO₂)',
    correctCategory: 'mix_element_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 20, y: 30 }, { id: 'a2', elementId: 'N', x: 30, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'O', x: 55, y: 70 }, { id: 'a4', elementId: 'C', x: 67, y: 70 }, { id: 'a5', elementId: 'O', x: 79, y: 70 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }, { atom1Id: 'a4', atom2Id: 'a5', type: 'double' }] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Contains N₂ (Element) and CO₂ (Compound) mixed together.',
    particleCountBreakdown: '1 N₂ Element + 1 CO₂ Compound',
  },
  // 5
  {
    id: 'sb_he',
    title: 'Noble Gas Sample (He)',
    correctCategory: 'pure_element',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'He', x: 30, y: 30 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'He', x: 70, y: 30 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a3', elementId: 'He', x: 50, y: 70 }], bonds: [] },
    ],
    isAtom: true,
    isMolecule: false,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Single unbonded Helium atoms. Pure element!',
    particleCountBreakdown: '3 He Atoms',
  },
  // 6
  {
    id: 'sb_h2o',
    title: 'Pure Steam (H₂O)',
    correctCategory: 'pure_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 30, y: 30 }, { id: 'a2', elementId: 'H', x: 22, y: 22 }, { id: 'a3', elementId: 'H', x: 38, y: 22 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a3', type: 'single' }] },
      { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 70, y: 65 }, { id: 'a5', elementId: 'H', x: 62, y: 57 }, { id: 'a6', elementId: 'H', x: 78, y: 57 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Identical H₂O compound molecules throughout.',
    particleCountBreakdown: '2 H₂O Molecules',
  },
  // 7
  {
    id: 'sb_n2',
    title: 'Pure Nitrogen Gas (N₂)',
    correctCategory: 'pure_element',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 25, y: 35 }, { id: 'a2', elementId: 'N', x: 37, y: 35 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'N', x: 65, y: 65 }, { id: 'a4', elementId: 'N', x: 77, y: 65 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'triple' }] },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Contains only triple-bonded N₂ diatomic molecules. Pure element!',
    particleCountBreakdown: '2 N₂ Molecules',
  },
  // 8
  {
    id: 'sb_ch4',
    title: 'Pure Methane Gas (CH₄)',
    correctCategory: 'pure_compound',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'C', x: 40, y: 40 },
          { id: 'a2', elementId: 'H', x: 30, y: 40 },
          { id: 'a3', elementId: 'H', x: 50, y: 40 },
          { id: 'a4', elementId: 'H', x: 40, y: 28 },
          { id: 'a5', elementId: 'H', x: 40, y: 52 },
        ],
        bonds: [
          { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a3', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a4', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a5', type: 'single' },
        ],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a6', elementId: 'C', x: 75, y: 70 },
          { id: 'a7', elementId: 'H', x: 67, y: 70 },
          { id: 'a8', elementId: 'H', x: 83, y: 70 },
          { id: 'a9', elementId: 'H', x: 75, y: 60 },
          { id: 'a10', elementId: 'H', x: 75, y: 80 },
        ],
        bonds: [
          { atom1Id: 'a6', atom2Id: 'a7', type: 'single' },
          { atom1Id: 'a6', atom2Id: 'a8', type: 'single' },
          { atom1Id: 'a6', atom2Id: 'a9', type: 'single' },
          { atom1Id: 'a6', atom2Id: 'a10', type: 'single' },
        ],
      },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Contains identical CH₄ compound molecules.',
    particleCountBreakdown: '2 CH₄ Molecules',
  },
  // 9
  {
    id: 'sb_mix_h2_he',
    title: 'Stellar Gas Mixture (H₂ + He)',
    correctCategory: 'mix_elements',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'H', x: 20, y: 30 }, { id: 'a2', elementId: 'H', x: 30, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'He', x: 75, y: 25 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a4', elementId: 'H', x: 30, y: 75 }, { id: 'a5', elementId: 'H', x: 40, y: 75 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }] },
      { id: 'g4', atoms: [{ id: 'a6', elementId: 'He', x: 80, y: 75 }], bonds: [] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Mixture of two different elements: H₂ element molecules and He element atoms.',
    particleCountBreakdown: '2 H₂ + 2 He (Mixture of Elements)',
  },
  // 10
  {
    id: 'sb_mix_n2_h2o',
    title: 'Humid Air Mixture (N₂ + H₂O)',
    correctCategory: 'mix_element_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 25, y: 30 }, { id: 'a2', elementId: 'N', x: 37, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'O', x: 75, y: 30 }, { id: 'a4', elementId: 'H', x: 67, y: 22 }, { id: 'a5', elementId: 'H', x: 83, y: 22 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'single' }, { atom1Id: 'a3', atom2Id: 'a5', type: 'single' }] },
      { id: 'g3', atoms: [{ id: 'a6', elementId: 'N', x: 30, y: 75 }, { id: 'a7', elementId: 'N', x: 42, y: 75 }], bonds: [{ atom1Id: 'a6', atom2Id: 'a7', type: 'triple' }] },
      { id: 'g4', atoms: [{ id: 'a8', elementId: 'O', x: 75, y: 75 }, { id: 'a9', elementId: 'H', x: 67, y: 67 }, { id: 'a10', elementId: 'H', x: 83, y: 67 }], bonds: [{ atom1Id: 'a8', atom2Id: 'a9', type: 'single' }, { atom1Id: 'a8', atom2Id: 'a10', type: 'single' }] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Mixture of N₂ (Element molecule) and H₂O (Compound molecule).',
    particleCountBreakdown: '2 N₂ + 2 H₂O (Element + Compound Mixture)',
  },
  // 11
  {
    id: 'sb_cu',
    title: 'Solid Copper Metal (Cu)',
    correctCategory: 'pure_element',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'Cu', x: 30, y: 30 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'Cu', x: 50, y: 30 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a3', elementId: 'Cu', x: 70, y: 30 }], bonds: [] },
      { id: 'g4', atoms: [{ id: 'a4', elementId: 'Cu', x: 30, y: 60 }], bonds: [] },
      { id: 'g5', atoms: [{ id: 'a5', elementId: 'Cu', x: 50, y: 60 }], bonds: [] },
      { id: 'g6', atoms: [{ id: 'a6', elementId: 'Cu', x: 70, y: 60 }], bonds: [] },
    ],
    isAtom: true,
    isMolecule: false,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'solid',
    explanation: 'Repeated metallic lattice of pure Copper atoms. Pure element!',
    particleCountBreakdown: '6 Copper Atoms in Lattice',
  },
  // 12
  {
    id: 'sb_nh3',
    title: 'Pure Ammonia Gas (NH₃)',
    correctCategory: 'pure_compound',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'N', x: 35, y: 35 },
          { id: 'a2', elementId: 'H', x: 25, y: 28 },
          { id: 'a3', elementId: 'H', x: 45, y: 28 },
          { id: 'a4', elementId: 'H', x: 35, y: 47 },
        ],
        bonds: [
          { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a3', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a4', type: 'single' },
        ],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a5', elementId: 'N', x: 75, y: 70 },
          { id: 'a6', elementId: 'H', x: 65, y: 63 },
          { id: 'a7', elementId: 'H', x: 85, y: 63 },
          { id: 'a8', elementId: 'H', x: 75, y: 82 },
        ],
        bonds: [
          { atom1Id: 'a5', atom2Id: 'a6', type: 'single' },
          { atom1Id: 'a5', atom2Id: 'a7', type: 'single' },
          { atom1Id: 'a5', atom2Id: 'a8', type: 'single' },
        ],
      },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Pure sample of identical NH₃ compound molecules.',
    particleCountBreakdown: '2 NH₃ Compound Molecules',
  },
  // 13
  {
    id: 'sb_mix_cu_sn',
    title: 'Bronze Alloy (Cu + Sn)',
    correctCategory: 'mix_elements',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'Cu', x: 25, y: 30 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'Cu', x: 50, y: 30 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a3', elementId: 'Sn', x: 75, y: 30 }], bonds: [] },
      { id: 'g4', atoms: [{ id: 'a4', elementId: 'Cu', x: 25, y: 70 }], bonds: [] },
      { id: 'g5', atoms: [{ id: 'a5', elementId: 'Sn', x: 50, y: 70 }], bonds: [] },
      { id: 'g6', atoms: [{ id: 'a6', elementId: 'Cu', x: 75, y: 70 }], bonds: [] },
    ],
    isAtom: true,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'solid',
    explanation: 'Solid mixture of Copper and Tin metallic atoms (Bronze). Mixture of elements!',
    particleCountBreakdown: '4 Cu atoms + 2 Sn atoms',
  },
  // 14
  {
    id: 'sb_mix_o2_co2_ar',
    title: 'Volcanic Gas (O₂ + CO₂ + Ar)',
    correctCategory: 'mix_element_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 20, y: 30 }, { id: 'a2', elementId: 'O', x: 30, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'Ar', x: 75, y: 25 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a4', elementId: 'O', x: 45, y: 70 }, { id: 'a5', elementId: 'C', x: 57, y: 70 }, { id: 'a6', elementId: 'O', x: 69, y: 70 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'double' }, { atom1Id: 'a5', atom2Id: 'a6', type: 'double' }] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Contains O₂ (Element molecule), Ar (Element atom), and CO₂ (Compound molecule).',
    particleCountBreakdown: '1 O₂ + 1 Ar + 1 CO₂',
  },
  // 15
  {
    id: 'sb_o3',
    title: 'Ozone Layer Gas (O₃)',
    correctCategory: 'pure_element',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'O', x: 30, y: 35 },
          { id: 'a2', elementId: 'O', x: 20, y: 25 },
          { id: 'a3', elementId: 'O', x: 40, y: 25 },
        ],
        bonds: [
          { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a3', type: 'double' },
        ],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a4', elementId: 'O', x: 70, y: 65 },
          { id: 'a5', elementId: 'O', x: 60, y: 55 },
          { id: 'a6', elementId: 'O', x: 80, y: 55 },
        ],
        bonds: [
          { atom1Id: 'a4', atom2Id: 'a5', type: 'single' },
          { atom1Id: 'a4', atom2Id: 'a6', type: 'double' },
        ],
      },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Triatomic Oxygen molecules (O₃). Since it contains only 1 element type (Oxygen), it is a Pure Element!',
    particleCountBreakdown: '2 O₃ Triatomic Molecules',
  },
  // 16
  {
    id: 'sb_co',
    title: 'Carbon Monoxide (CO)',
    correctCategory: 'pure_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'C', x: 25, y: 30 }, { id: 'a2', elementId: 'O', x: 37, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'C', x: 65, y: 70 }, { id: 'a4', elementId: 'O', x: 77, y: 70 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'triple' }] },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Contains identical CO compound molecules (1 Carbon + 1 Oxygen).',
    particleCountBreakdown: '2 CO Molecules',
  },
  // 17
  {
    id: 'sb_mix_n2_o2',
    title: 'Dry Atmosphere (N₂ + O₂)',
    correctCategory: 'mix_elements',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 20, y: 30 }, { id: 'a2', elementId: 'N', x: 30, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'O', x: 70, y: 30 }, { id: 'a4', elementId: 'O', x: 80, y: 30 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }] },
      { id: 'g3', atoms: [{ id: 'a5', elementId: 'N', x: 25, y: 75 }, { id: 'a6', elementId: 'N', x: 35, y: 75 }], bonds: [{ atom1Id: 'a5', atom2Id: 'a6', type: 'triple' }] },
      { id: 'g4', atoms: [{ id: 'a7', elementId: 'O', x: 75, y: 75 }, { id: 'a8', elementId: 'O', x: 85, y: 75 }], bonds: [{ atom1Id: 'a7', atom2Id: 'a8', type: 'double' }] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Mixture of two element molecules: Nitrogen gas (N₂) and Oxygen gas (O₂).',
    particleCountBreakdown: '2 N₂ + 2 O₂ (Mixture of Elements)',
  },
  // 18
  {
    id: 'sb_mix_ar_h2o',
    title: 'Argon in Moist Gas (Ar + H₂O)',
    correctCategory: 'mix_element_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'Ar', x: 25, y: 30 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'O', x: 75, y: 30 }, { id: 'a3', elementId: 'H', x: 67, y: 22 }, { id: 'a4', elementId: 'H', x: 83, y: 22 }], bonds: [{ atom1Id: 'a2', atom2Id: 'a3', type: 'single' }, { atom1Id: 'a2', atom2Id: 'a4', type: 'single' }] },
      { id: 'g3', atoms: [{ id: 'a5', elementId: 'Ar', x: 30, y: 75 }], bonds: [] },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'gas',
    explanation: 'Contains Ar (Element atom) and H₂O (Compound molecule).',
    particleCountBreakdown: '2 Ar atoms + 1 H₂O molecule',
  },
  // 19
  {
    id: 'sb_hcl',
    title: 'Hydrogen Chloride Gas (HCl)',
    correctCategory: 'pure_compound',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'H', x: 25, y: 30 }, { id: 'a2', elementId: 'Cl', x: 37, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }] },
      { id: 'g2', atoms: [{ id: 'a3', elementId: 'H', x: 65, y: 70 }, { id: 'a4', elementId: 'Cl', x: 77, y: 70 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'single' }] },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Identical HCl compound molecules throughout.',
    particleCountBreakdown: '2 HCl Molecules',
  },
  // 20
  {
    id: 'sb_mix_fe_cu',
    title: 'Metal Filings (Fe + Cu)',
    correctCategory: 'mix_elements',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'Fe', x: 20, y: 30 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'Cu', x: 70, y: 30 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a3', elementId: 'Fe', x: 30, y: 70 }], bonds: [] },
      { id: 'g4', atoms: [{ id: 'a4', elementId: 'Cu', x: 80, y: 70 }], bonds: [] },
    ],
    isAtom: true,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    stateOfMatter: 'solid',
    explanation: 'Physical mixture of Iron (Fe) atoms and Copper (Cu) atoms.',
    particleCountBreakdown: '2 Fe atoms + 2 Cu atoms (Mixture of Elements)',
  },
  // 21
  {
    id: 'sb_h2o2',
    title: 'Hydrogen Peroxide Vapor (H₂O₂)',
    correctCategory: 'pure_compound',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'H', x: 20, y: 30 },
          { id: 'a2', elementId: 'O', x: 32, y: 30 },
          { id: 'a3', elementId: 'O', x: 44, y: 30 },
          { id: 'a4', elementId: 'H', x: 56, y: 30 },
        ],
        bonds: [
          { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
          { atom1Id: 'a2', atom2Id: 'a3', type: 'single' },
          { atom1Id: 'a3', atom2Id: 'a4', type: 'single' },
        ],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a5', elementId: 'H', x: 40, y: 70 },
          { id: 'a6', elementId: 'O', x: 52, y: 70 },
          { id: 'a7', elementId: 'O', x: 64, y: 70 },
          { id: 'a8', elementId: 'H', x: 76, y: 70 },
        ],
        bonds: [
          { atom1Id: 'a5', atom2Id: 'a6', type: 'single' },
          { atom1Id: 'a6', atom2Id: 'a7', type: 'single' },
          { atom1Id: 'a7', atom2Id: 'a8', type: 'single' },
        ],
      },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: false,
    isCompound: true,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Pure H₂O₂ compound molecules with H-O-O-H bonding structure.',
    particleCountBreakdown: '2 H₂O₂ Compound Molecules',
  },
];

// Stoichiometry Reaction Challenges
interface ReactionChallenge {
  id: string;
  equation: string;
  title: string;
  description: string;
  diagram: ParticleDiagram;
  reactantAtoms: Record<string, number>;
  productAtoms: Record<string, number>;
  correctAnswer: 'balanced' | 'violates_mass';
  explanation: string;
}

const REACTION_CHALLENGES: ReactionChallenge[] = [
  {
    id: 'rc_1',
    equation: '2 H₂ + O₂ → 2 H₂O',
    title: 'Synthesis of Water Vapor',
    description: 'Inspect the particle container showing the reactant mixture vs product mixture. Does it conserve mass?',
    diagram: {
      id: 'd_rc1',
      title: 'Water Synthesis Reaction',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 30, y: 30 }, { id: 'a2', elementId: 'H', x: 22, y: 22 }, { id: 'a3', elementId: 'H', x: 38, y: 22 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a3', type: 'single' }] },
        { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 70, y: 65 }, { id: 'a5', elementId: 'H', x: 62, y: 57 }, { id: 'a6', elementId: 'H', x: 78, y: 57 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
      ],
      reactantsGroups: [
        { id: 'r1', atoms: [{ id: 'ra1', elementId: 'H', x: 20, y: 25 }, { id: 'ra2', elementId: 'H', x: 30, y: 25 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' }] },
        { id: 'r2', atoms: [{ id: 'ra3', elementId: 'H', x: 20, y: 70 }, { id: 'ra4', elementId: 'H', x: 30, y: 70 }], bonds: [{ atom1Id: 'ra3', atom2Id: 'ra4', type: 'single' }] },
        { id: 'r3', atoms: [{ id: 'ra5', elementId: 'O', x: 70, y: 45 }, { id: 'ra6', elementId: 'O', x: 82, y: 45 }], bonds: [{ atom1Id: 'ra5', atom2Id: 'ra6', type: 'double' }] },
      ],
      productsGroups: [
        { id: 'p1', atoms: [{ id: 'pa1', elementId: 'O', x: 30, y: 30 }, { id: 'pa2', elementId: 'H', x: 22, y: 22 }, { id: 'pa3', elementId: 'H', x: 38, y: 22 }], bonds: [{ atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' }, { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' }] },
        { id: 'p2', atoms: [{ id: 'pa4', elementId: 'O', x: 70, y: 65 }, { id: 'pa5', elementId: 'H', x: 62, y: 57 }, { id: 'pa6', elementId: 'H', x: 78, y: 57 }], bonds: [{ atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' }, { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' }] },
      ],
      reactantsLabel: 'REACTANTS (2 H₂ + O₂)',
      productsLabel: 'PRODUCTS (2 H₂O)',
      isAtom: false,
      isMolecule: true,
      isElement: false,
      isCompound: true,
      isPureSubstance: true,
      isMixture: false,
      isChemicalChange: true,
      stateOfMatter: 'gas',
      explanation: '4 Hydrogen atoms + 2 Oxygen atoms = Exactly 2 H₂O molecules with 0 atoms lost or gained.',
      particleCountBreakdown: '2 H₂O molecules (4 H, 2 O atoms)',
    },
    reactantAtoms: { H: 4, O: 2 },
    productAtoms: { H: 4, O: 2 },
    correctAnswer: 'balanced',
    explanation: 'All 4 Hydrogen atoms and 2 Oxygen atoms are accounted for in the 2 H₂O product molecules. Mass is perfectly conserved!',
  },
  {
    id: 'rc_2',
    equation: 'N₂ + 3 H₂ → 2 NH₃',
    title: 'Haber Ammonia Synthesis Drawing',
    description: 'Inspect the proposed drawing after mixing N₂ and H₂ molecules.',
    diagram: {
      id: 'd_rc2',
      title: 'Haber Reaction Box',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 35, y: 35 }, { id: 'a2', elementId: 'H', x: 25, y: 28 }, { id: 'a3', elementId: 'H', x: 45, y: 28 }, { id: 'a4', elementId: 'H', x: 35, y: 45 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a3', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a4', type: 'single' }] },
      ],
      reactantsGroups: [
        { id: 'r1', atoms: [{ id: 'ra1', elementId: 'N', x: 20, y: 30 }, { id: 'ra2', elementId: 'N', x: 30, y: 30 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'triple' }] },
        { id: 'r2', atoms: [{ id: 'ra3', elementId: 'H', x: 70, y: 25 }, { id: 'ra4', elementId: 'H', x: 80, y: 25 }], bonds: [{ atom1Id: 'ra3', atom2Id: 'ra4', type: 'single' }] },
        { id: 'r3', atoms: [{ id: 'ra5', elementId: 'H', x: 70, y: 50 }, { id: 'ra6', elementId: 'H', x: 80, y: 50 }], bonds: [{ atom1Id: 'ra5', atom2Id: 'ra6', type: 'single' }] },
        { id: 'r4', atoms: [{ id: 'ra7', elementId: 'H', x: 70, y: 75 }, { id: 'ra8', elementId: 'H', x: 80, y: 75 }], bonds: [{ atom1Id: 'ra7', atom2Id: 'ra8', type: 'single' }] },
      ],
      productsGroups: [
        { id: 'p1', atoms: [{ id: 'pa1', elementId: 'N', x: 50, y: 50 }, { id: 'pa2', elementId: 'H', x: 40, y: 42 }, { id: 'pa3', elementId: 'H', x: 60, y: 42 }, { id: 'pa4', elementId: 'H', x: 50, y: 62 }], bonds: [{ atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' }, { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' }, { atom1Id: 'pa1', atom2Id: 'pa4', type: 'single' }] },
      ],
      reactantsLabel: 'REACTANTS (1 N₂ + 3 H₂)',
      productsLabel: 'PROPOSED PRODUCTS (1 NH₃)',
      isAtom: false,
      isMolecule: true,
      isElement: false,
      isCompound: false,
      isPureSubstance: false,
      isMixture: false,
      isChemicalChange: true,
      stateOfMatter: 'gas',
      explanation: 'Reactants had 2 N and 6 H. The products box only shows 1 NH₃ (1 N and 3 H).',
      particleCountBreakdown: '1 NH₃ (Missing 1 Nitrogen and 3 Hydrogen atoms!)',
    },
    reactantAtoms: { N: 2, H: 6 },
    productAtoms: { N: 1, H: 3 },
    correctAnswer: 'violates_mass',
    explanation: 'This diagram VIOLATES Conservation of Mass! 1 Nitrogen atom and 3 Hydrogen atoms disappeared. To be balanced, 2 NH₃ molecules must be produced from 1 N₂ and 3 H₂.',
  },
  {
    id: 'rc_3',
    equation: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O',
    title: 'Combustion of Methane Gas',
    description: 'Evaluate if atoms are created/destroyed in this proposed combustion diagram.',
    diagram: {
      id: 'd_rc3',
      title: 'Flawed Combustion Drawing',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 25, y: 30 }, { id: 'a2', elementId: 'C', x: 37, y: 30 }, { id: 'a3', elementId: 'O', x: 49, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }, { atom1Id: 'a2', atom2Id: 'a3', type: 'double' }] },
        { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 75, y: 65 }, { id: 'a5', elementId: 'H', x: 67, y: 57 }, { id: 'a6', elementId: 'H', x: 83, y: 57 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
      ],
      reactantsGroups: [
        { id: 'r1', atoms: [{ id: 'ra1', elementId: 'C', x: 25, y: 30 }, { id: 'ra2', elementId: 'H', x: 15, y: 30 }, { id: 'ra3', elementId: 'H', x: 35, y: 30 }, { id: 'ra4', elementId: 'H', x: 25, y: 18 }, { id: 'ra5', elementId: 'H', x: 25, y: 42 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' }, { atom1Id: 'ra1', atom2Id: 'ra3', type: 'single' }, { atom1Id: 'ra1', atom2Id: 'ra4', type: 'single' }, { atom1Id: 'ra1', atom2Id: 'ra5', type: 'single' }] },
        { id: 'r2', atoms: [{ id: 'ra6', elementId: 'O', x: 70, y: 25 }, { id: 'ra7', elementId: 'O', x: 82, y: 25 }], bonds: [{ atom1Id: 'ra6', atom2Id: 'ra7', type: 'double' }] },
        { id: 'r3', atoms: [{ id: 'ra8', elementId: 'O', x: 70, y: 70 }, { id: 'ra9', elementId: 'O', x: 82, y: 70 }], bonds: [{ atom1Id: 'ra8', atom2Id: 'ra9', type: 'double' }] },
      ],
      productsGroups: [
        { id: 'p1', atoms: [{ id: 'pa1', elementId: 'O', x: 25, y: 30 }, { id: 'pa2', elementId: 'C', x: 37, y: 30 }, { id: 'pa3', elementId: 'O', x: 49, y: 30 }], bonds: [{ atom1Id: 'pa1', atom2Id: 'pa2', type: 'double' }, { atom1Id: 'pa2', atom2Id: 'pa3', type: 'double' }] },
        { id: 'p2', atoms: [{ id: 'pa4', elementId: 'O', x: 75, y: 65 }, { id: 'pa5', elementId: 'H', x: 67, y: 57 }, { id: 'pa6', elementId: 'H', x: 83, y: 57 }], bonds: [{ atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' }, { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' }] },
      ],
      reactantsLabel: 'REACTANTS (CH₄ + 2 O₂)',
      productsLabel: 'PROPOSED PRODUCTS (1 CO₂ + 1 H₂O)',
      isAtom: false,
      isMolecule: true,
      isElement: false,
      isCompound: true,
      isPureSubstance: false,
      isMixture: true,
      isChemicalChange: true,
      stateOfMatter: 'gas',
      explanation: 'Shows 1 CO₂ + 1 H₂O (Total: 1 C, 3 O, 2 H atoms). Reactants had 1 C, 4 O, 4 H atoms!',
      particleCountBreakdown: '1 CO₂ + 1 H₂O (Missing 2 H and 1 O atom!)',
    },
    reactantAtoms: { C: 1, H: 4, O: 4 },
    productAtoms: { C: 1, H: 2, O: 3 },
    correctAnswer: 'violates_mass',
    explanation: 'This diagram VIOLATES the Law of Conservation of Mass! 2 Hydrogen atoms and 1 Oxygen atom disappeared into nowhere! A second H₂O molecule must be drawn.',
  },
  {
    id: 'rc_4',
    equation: '2 H₂O₂ → 2 H₂O + O₂',
    title: 'Decomposition of Hydrogen Peroxide',
    description: 'Decomposition of 2 H₂O₂ molecules into water and oxygen gas.',
    diagram: {
      id: 'd_rc4',
      title: 'Hydrogen Peroxide Decomposition',
      groups: [],
      reactantsGroups: [
        { id: 'r1', atoms: [{ id: 'ra1', elementId: 'H', x: 15, y: 30 }, { id: 'ra2', elementId: 'O', x: 27, y: 30 }, { id: 'ra3', elementId: 'O', x: 39, y: 30 }, { id: 'ra4', elementId: 'H', x: 51, y: 30 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' }, { atom1Id: 'ra2', atom2Id: 'ra3', type: 'single' }, { atom1Id: 'ra3', atom2Id: 'ra4', type: 'single' }] },
        { id: 'r2', atoms: [{ id: 'ra5', elementId: 'H', x: 40, y: 70 }, { id: 'ra6', elementId: 'O', x: 52, y: 70 }, { id: 'ra7', elementId: 'O', x: 64, y: 70 }, { id: 'ra8', elementId: 'H', x: 76, y: 70 }], bonds: [{ atom1Id: 'ra5', atom2Id: 'ra6', type: 'single' }, { atom1Id: 'ra6', atom2Id: 'ra7', type: 'single' }, { atom1Id: 'ra7', atom2Id: 'ra8', type: 'single' }] },
      ],
      productsGroups: [
        { id: 'p1', atoms: [{ id: 'pa1', elementId: 'O', x: 25, y: 25 }, { id: 'pa2', elementId: 'H', x: 17, y: 17 }, { id: 'pa3', elementId: 'H', x: 33, y: 17 }], bonds: [{ atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' }, { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' }] },
        { id: 'p2', atoms: [{ id: 'pa4', elementId: 'O', x: 75, y: 30 }, { id: 'pa5', elementId: 'H', x: 67, y: 22 }, { id: 'pa6', elementId: 'H', x: 83, y: 22 }], bonds: [{ atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' }, { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' }] },
        { id: 'p3', atoms: [{ id: 'pa7', elementId: 'O', x: 50, y: 75 }, { id: 'pa8', elementId: 'O', x: 62, y: 75 }], bonds: [{ atom1Id: 'pa7', atom2Id: 'pa8', type: 'double' }] },
      ],
      reactantsLabel: 'REACTANTS (2 H₂O₂)',
      productsLabel: 'PRODUCTS (2 H₂O + O₂)',
      isAtom: false,
      isMolecule: true,
      isElement: false,
      isCompound: false,
      isPureSubstance: false,
      isMixture: true,
      isChemicalChange: true,
      stateOfMatter: 'gas',
      explanation: '2 H₂O₂ (4 H, 4 O) produces 2 H₂O (4 H, 2 O) + 1 O₂ (2 O). Total: 4 H and 4 O on both sides.',
      particleCountBreakdown: '2 H₂O + 1 O₂ (4 H, 4 O total)',
    },
    reactantAtoms: { H: 4, O: 4 },
    productAtoms: { H: 4, O: 4 },
    correctAnswer: 'balanced',
    explanation: 'Every atom is accounted for! 4 Hydrogen atoms and 4 Oxygen atoms exist in both reactants and products. Mass is conserved.',
  },
];

// Misconception Buster Scenarios
interface MisconceptionItem {
  id: string;
  claimTitle: string;
  studentClaim: string;
  diagram: ParticleDiagram;
  options: { id: string; text: string; isCorrect: boolean }[];
  scientificExplanation: string;
}

const MISCONCEPTION_POOL: MisconceptionItem[] = [
  {
    id: 'm1',
    claimTitle: '1. Diatomic Gas Confusion',
    studentClaim: 'A student claims that Oxygen gas (O₂) is a COMPOUND because it contains two atoms.',
    diagram: {
      id: 'd_m1',
      title: 'Oxygen Gas (O₂) Sample',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 30, y: 30 }, { id: 'a2', elementId: 'O', x: 42, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }] },
        { id: 'g2', atoms: [{ id: 'a3', elementId: 'O', x: 70, y: 65 }, { id: 'a4', elementId: 'O', x: 82, y: 65 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }] },
      ],
      isAtom: false,
      isMolecule: true,
      isElement: true,
      isCompound: false,
      isPureSubstance: true,
      isMixture: false,
      stateOfMatter: 'gas',
      explanation: 'Contains diatomic molecules of the SAME element (Oxygen).',
      particleCountBreakdown: '2 O₂ molecules',
    },
    options: [
      { id: 'opt_1', text: 'The student is correct because compounds contain 2 or more atoms.', isCorrect: false },
      { id: 'opt_2', text: 'The student is wrong because compounds require TWO DIFFERENT element types chemically bonded, whereas O₂ contains only ONE element type.', isCorrect: true },
      { id: 'opt_3', text: 'The student is wrong because Oxygen gas is an unbonded single atom.', isCorrect: false },
    ],
    scientificExplanation: 'A molecule is any group of 2+ bonded atoms. However, a COMPOUND specifically requires atoms of DIFFERENT elements (e.g. H₂O). Since O₂ consists of two atoms of the SAME element (Oxygen), it is a Diatomic Element Molecule, NOT a compound!',
  },
  {
    id: 'm2',
    claimTitle: '2. Phase Change vs Chemical Decomposition',
    studentClaim: 'A student claims that boiling liquid water into steam converts H₂O into a mixture of Hydrogen gas (H₂) and Oxygen gas (O₂).',
    diagram: {
      id: 'd_m2',
      title: 'Liquid Water Boiling to Water Vapor',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 25, y: 25 }, { id: 'a2', elementId: 'H', x: 18, y: 18 }, { id: 'a3', elementId: 'H', x: 32, y: 18 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a3', type: 'single' }] },
        { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 75, y: 70 }, { id: 'a5', elementId: 'H', x: 68, y: 63 }, { id: 'a6', elementId: 'H', x: 82, y: 63 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
      ],
      isAtom: false,
      isMolecule: true,
      isElement: false,
      isCompound: true,
      isPureSubstance: true,
      isMixture: false,
      stateOfMatter: 'gas',
      explanation: 'Intact H₂O molecules in gaseous state.',
      particleCountBreakdown: '2 gaseous H₂O molecules',
    },
    options: [
      { id: 'opt_1', text: 'The student is wrong because boiling is a physical change: intermolecular forces break, but intramolecular H-O covalent bonds remain completely intact as H₂O gas molecules.', isCorrect: true },
      { id: 'opt_2', text: 'The student is correct because thermal heat breaks chemical bonds into H₂ and O₂.', isCorrect: false },
      { id: 'opt_3', text: 'The student is wrong because water vapor turns into Hydrogen atoms.', isCorrect: false },
    ],
    scientificExplanation: 'Physical phase changes (boiling, melting) only overcome weak intermolecular attractions between molecules. The covalent bonds holding H and O together inside each H₂O molecule remain 100% intact!',
  },
  {
    id: 'm3',
    claimTitle: '3. Conservation of Mass in Open Fires',
    studentClaim: 'A student burns a 500g log of wood and notices the resulting ash weighs only 20g. They conclude that mass was destroyed during the reaction.',
    diagram: {
      id: 'd_m3',
      title: 'Wood Combustion Gas Escape',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 20, y: 30 }, { id: 'a2', elementId: 'C', x: 32, y: 30 }, { id: 'a3', elementId: 'O', x: 44, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }, { atom1Id: 'a2', atom2Id: 'a3', type: 'double' }] },
        { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 75, y: 25 }, { id: 'a5', elementId: 'H', x: 67, y: 17 }, { id: 'a6', elementId: 'H', x: 83, y: 17 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
      ],
      isAtom: false,
      isMolecule: true,
      isElement: false,
      isCompound: true,
      isPureSubstance: false,
      isMixture: true,
      stateOfMatter: 'gas',
      explanation: 'Gaseous products (CO₂ and H₂O vapor) escaping into ambient air.',
      particleCountBreakdown: 'Escaping CO₂ + H₂O vapor',
    },
    options: [
      { id: 'opt_1', text: 'The student is correct because chemical energy conversion destroys matter.', isCorrect: false },
      { id: 'opt_2', text: 'The student is wrong because gaseous products (CO₂ & H₂O vapor) escaped into the surrounding air in an open system. If trapped in a sealed vessel, total mass is conserved.', isCorrect: true },
      { id: 'opt_3', text: 'The student is wrong because wood contains no carbon atoms.', isCorrect: false },
    ],
    scientificExplanation: 'Mass is NEVER destroyed in chemical reactions! In an open container, invisible gas products (carbon dioxide and water vapor) float up into the atmosphere. Collecting all smoke, ash, and gases proves mass before = mass after.',
  },
  {
    id: 'm4',
    claimTitle: '4. Thermal Expansion of Matter',
    studentClaim: 'A student claims that when a solid metal ball expands upon heating, each individual metal atom grows physically larger.',
    diagram: {
      id: 'd_m4',
      title: 'Heated Metal Lattice Spacing',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'Fe', x: 20, y: 20 }], bonds: [] },
        { id: 'g2', atoms: [{ id: 'a2', elementId: 'Fe', x: 50, y: 20 }], bonds: [] },
        { id: 'g3', atoms: [{ id: 'a3', elementId: 'Fe', x: 80, y: 20 }], bonds: [] },
        { id: 'g4', atoms: [{ id: 'a4', elementId: 'Fe', x: 20, y: 80 }], bonds: [] },
        { id: 'g5', atoms: [{ id: 'a5', elementId: 'Fe', x: 50, y: 80 }], bonds: [] },
        { id: 'g6', atoms: [{ id: 'a6', elementId: 'Fe', x: 80, y: 80 }], bonds: [] },
      ],
      isAtom: true,
      isMolecule: false,
      isElement: true,
      isCompound: false,
      isPureSubstance: true,
      isMixture: false,
      stateOfMatter: 'solid',
      explanation: 'Atoms maintain identical radius, but kinetic energy pushes them further apart.',
      particleCountBreakdown: 'Iron lattice with increased interatomic spacing',
    },
    options: [
      { id: 'opt_1', text: 'The student is correct because heat expands atomic electron clouds.', isCorrect: false },
      { id: 'opt_2', text: 'The student is wrong because individual atom sizes stay identical; increased kinetic heat energy causes atoms to vibrate faster and push further apart.', isCorrect: true },
      { id: 'opt_3', text: 'The student is wrong because heated metals shrink instead of expanding.', isCorrect: false },
    ],
    scientificExplanation: 'Atoms do NOT swell or expand in size when heated! Heat increases the kinetic energy (vibrations) of particles, forcing neighboring atoms to push further apart, expanding the overall volume of the bulk material.',
  },
  {
    id: 'm5',
    claimTitle: '5. Dissolving vs Disappearing',
    studentClaim: 'A student stirs table salt (NaCl) into water until it disappears, and claims the salt atoms were destroyed.',
    diagram: {
      id: 'd_m5',
      title: 'Dissolved Sodium and Chloride Ions in Water',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'Na', x: 25, y: 30 }], bonds: [] },
        { id: 'g2', atoms: [{ id: 'a2', elementId: 'Cl', x: 75, y: 30 }], bonds: [] },
        { id: 'g3', atoms: [{ id: 'a3', elementId: 'O', x: 50, y: 70 }, { id: 'a4', elementId: 'H', x: 42, y: 62 }, { id: 'a5', elementId: 'H', x: 58, y: 62 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'single' }, { atom1Id: 'a3', atom2Id: 'a5', type: 'single' }] },
      ],
      isAtom: false,
      isMolecule: false,
      isElement: false,
      isCompound: false,
      isPureSubstance: false,
      isMixture: true,
      stateOfMatter: 'liquid',
      explanation: 'Separated Na and Cl ions surrounded by water molecules in solution.',
      particleCountBreakdown: 'Aqueous mixture of Na+ & Cl- ions with water',
    },
    options: [
      { id: 'opt_1', text: 'The student is correct because transparent liquid means salt atoms vanished.', isCorrect: false },
      { id: 'opt_2', text: 'The student is wrong because dissolving is a physical mixture: salt crystal lattice separates into hydrated Na and Cl ions uniformly spread throughout the solvent.', isCorrect: true },
      { id: 'opt_3', text: 'The student is wrong because salt turns into water molecules.', isCorrect: false },
    ],
    scientificExplanation: 'Dissolving does NOT destroy atoms or matter! Salt crystals dissociate into individual Na⁺ and Cl⁻ ions surrounded by water molecules. Evaporating the water recovers 100% of the original solid salt.',
  },
  {
    id: 'm6',
    claimTitle: '6. Weight Change During Rusting',
    studentClaim: 'A student claims an iron nail loses weight when it rusts because rust crumbles away.',
    diagram: {
      id: 'd_m6',
      title: 'Iron Oxide (Fe₂O₃) Rust Lattice',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'Fe', x: 20, y: 40 }], bonds: [] },
        { id: 'g2', atoms: [{ id: 'a2', elementId: 'O', x: 35, y: 40 }], bonds: [] },
        { id: 'g3', atoms: [{ id: 'a3', elementId: 'Fe', x: 50, y: 40 }], bonds: [] },
        { id: 'g4', atoms: [{ id: 'a4', elementId: 'O', x: 65, y: 40 }], bonds: [] },
        { id: 'g5', atoms: [{ id: 'a5', elementId: 'O', x: 80, y: 40 }], bonds: [] },
      ],
      isAtom: false,
      isMolecule: false,
      isElement: false,
      isCompound: true,
      isPureSubstance: true,
      isMixture: false,
      stateOfMatter: 'solid',
      explanation: 'Oxygen atoms from ambient air chemically bond onto Iron metal atoms.',
      particleCountBreakdown: 'Iron Oxide compound (Fe + bonded atmospheric Oxygen)',
    },
    options: [
      { id: 'opt_1', text: 'The student is correct because rusted iron breaks easily.', isCorrect: false },
      { id: 'opt_2', text: 'The student is wrong because iron GAINS weight when rusting: atmospheric Oxygen atoms chemically bond to the iron atoms (Fe₂O₃), adding extra mass.', isCorrect: true },
      { id: 'opt_3', text: 'The student is wrong because rust contains no oxygen.', isCorrect: false },
    ],
    scientificExplanation: 'Rusting is a synthesis reaction (4 Fe + 3 O₂ → 2 Fe₂O₃)! Atmospheric oxygen gas chemically binds to the iron metal. The resulting iron oxide (rust) actually weighs MORE than the original shiny iron nail!',
  },
  {
    id: 'm7',
    claimTitle: '7. Microscopic vs Macroscopic Properties',
    studentClaim: 'A student claims that a single Copper atom is shiny reddish-brown and conducts electricity on its own.',
    diagram: {
      id: 'd_m7',
      title: 'Single Isolated Copper Atom',
      groups: [
        { id: 'g1', atoms: [{ id: 'a1', elementId: 'Cu', x: 50, y: 50 }], bonds: [] },
      ],
      isAtom: true,
      isMolecule: false,
      isElement: true,
      isCompound: false,
      isPureSubstance: true,
      isMixture: false,
      stateOfMatter: 'solid',
      explanation: 'A single isolated Cu atom does not possess bulk macroscopic properties.',
      particleCountBreakdown: '1 isolated Cu atom',
    },
    options: [
      { id: 'opt_1', text: 'The student is correct because atoms have identical properties to bulk metal.', isCorrect: false },
      { id: 'opt_2', text: 'The student is wrong because color, conductivity, and state of matter are BULK MACROSCOPIC properties resulting from billions of interacting atoms together.', isCorrect: true },
      { id: 'opt_3', text: 'The student is wrong because Copper atoms are blue.', isCorrect: false },
    ],
    scientificExplanation: 'Properties like color, electrical conductivity, state of matter, and shine are BULK properties that emerge only when trillions of atoms interact in a metal lattice! A single copper atom does not have a "shiny color" or state.',
  },
];

export const AdvancedChallengeLab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'blitz' | 'stoichiometry' | 'misconception'>('blitz');

  // Blitz State
  const [blitzActive, setBlitzActive] = useState<boolean>(false);
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(60);
  const [blitzIndex, setBlitzIndex] = useState<number>(0);
  const [blitzScore, setBlitzScore] = useState<number>(0);
  const [blitzStreak, setBlitzStreak] = useState<number>(0);
  const [blitzBestStreak, setBlitzBestStreak] = useState<number>(0);
  const [blitzCorrectCount, setBlitzCorrectCount] = useState<number>(0);
  const [blitzTotalAttempted, setBlitzTotalAttempted] = useState<number>(0);
  const [blitzFinished, setBlitzFinished] = useState<boolean>(false);
  const [blitzFeedback, setBlitzFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Stoichiometry State
  const [selectedStoichId, setSelectedStoichId] = useState<string>(REACTION_CHALLENGES[0].id);
  const [stoichUserChoice, setStoichUserChoice] = useState<string | null>(null);
  const [stoichSubmitted, setStoichSubmitted] = useState<boolean>(false);

  // Misconception State
  const [miscIndex, setMiscIndex] = useState<number>(0);
  const [miscUserAnswer, setMiscUserAnswer] = useState<string | null>(null);
  const [miscSubmitted, setMiscSubmitted] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Blitz Timer Logic
  useEffect(() => {
    if (blitzActive && blitzTimeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setBlitzTimeLeft((t) => t - 1);
      }, 1000);
    } else if (blitzActive && blitzTimeLeft === 0) {
      setBlitzActive(false);
      setBlitzFinished(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [blitzActive, blitzTimeLeft]);

  const startBlitz = () => {
    setBlitzActive(true);
    setBlitzTimeLeft(60);
    setBlitzIndex(0);
    setBlitzScore(0);
    setBlitzStreak(0);
    setBlitzBestStreak(0);
    setBlitzCorrectCount(0);
    setBlitzTotalAttempted(0);
    setBlitzFinished(false);
    setBlitzFeedback(null);
  };

  const currentBlitzItem = SPEED_BLITZ_POOL[blitzIndex % SPEED_BLITZ_POOL.length];

  const handleBlitzAnswer = (category: string) => {
    if (!blitzActive || blitzFinished) return;

    const isRight = category === currentBlitzItem.correctCategory;
    setBlitzTotalAttempted((prev) => prev + 1);

    if (isRight) {
      const newStreak = blitzStreak + 1;
      setBlitzStreak(newStreak);
      if (newStreak > blitzBestStreak) setBlitzBestStreak(newStreak);
      setBlitzCorrectCount((prev) => prev + 1);

      // Score multiplier based on streak
      const multiplier = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      const pointsEarned = 150 * multiplier;
      setBlitzScore((s) => s + pointsEarned);

      setBlitzFeedback('correct');
    } else {
      setBlitzStreak(0);
      setBlitzFeedback('incorrect');
    }

    setTimeout(() => {
      setBlitzFeedback(null);
      setBlitzIndex((i) => (i + 1) % SPEED_BLITZ_POOL.length);
    }, 400);
  };

  const activeStoichChallenge = REACTION_CHALLENGES.find((c) => c.id === selectedStoichId) || REACTION_CHALLENGES[0];
  const activeMiscItem = MISCONCEPTION_POOL[miscIndex % MISCONCEPTION_POOL.length];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border border-amber-800/50 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Advanced Chemistry Arena
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
              Master Level
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Particle Master Challenges
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Designed for students who already master atomic concepts! Test your rapid classification speed, evaluate law of conservation of mass in reaction diagrams, and bust common chemistry misconceptions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 bg-slate-900/90 rounded-xl border border-amber-500/30 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Blitz Score</span>
            <span className="text-xl font-extrabold text-amber-400">{blitzScore} XP</span>
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('blitz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'blitz'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>⚡ 60s Speed Blitz</span>
        </button>

        <button
          onClick={() => setActiveSubTab('stoichiometry')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'stoichiometry'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>🧪 Reaction Mass Inspector</span>
        </button>

        <button
          onClick={() => setActiveSubTab('misconception')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'misconception'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>🔍 Misconception Buster</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SPEED BLITZ */}
      {/* ========================================================================= */}
      {activeSubTab === 'blitz' && (
        <div className="flex flex-col gap-6">
          {!blitzActive && !blitzFinished && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-5 shadow-xl">
              <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Zap className="w-12 h-12 animate-pulse" />
              </div>
              <div className="max-w-md">
                <h3 className="text-2xl font-bold text-white mb-2">60-Second Speed Blitz</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Test your split-second chemistry recall! Classify as many complex particle diagrams as possible before time runs out. Maintain consecutive streaks for 2x and 3x multiplier bonuses!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-md my-2">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Time</span>
                  <span className="font-bold text-white text-sm">60 Seconds</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Combo Bonus</span>
                  <span className="font-bold text-white text-sm">Up to 3x XP</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-400 block">Target</span>
                  <span className="font-bold text-white text-sm">1000+ Points</span>
                </div>
              </div>

              <button
                onClick={startBlitz}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/20 cursor-pointer transition-all hover:scale-105"
              >
                Start Speed Blitz Challenge!
              </button>
            </div>
          )}

          {blitzActive && (
            <div className="flex flex-col gap-6">
              {/* Top Stats Bar */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase">Time Remaining:</span>
                  <span
                    className={`font-mono font-bold text-lg px-2.5 py-0.5 rounded-lg ${
                      blitzTimeLeft <= 10 ? 'bg-rose-950 text-rose-400 animate-bounce' : 'bg-slate-800 text-amber-400'
                    }`}
                  >
                    {blitzTimeLeft}s
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Streak Combo Indicator */}
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-400 text-xs font-bold">
                    <Flame className="w-4 h-4 fill-amber-400" />
                    <span>{blitzStreak}x Streak</span>
                    {blitzStreak >= 3 && (
                      <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-extrabold ml-1">
                        {blitzStreak >= 5 ? '3x BONUS' : '2x BONUS'}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Score</span>
                    <span className="font-bold text-white text-base">{blitzScore} XP</span>
                  </div>
                </div>
              </div>

              {/* Active Diagram Arena */}
              <div
                className={`relative bg-slate-900 border-2 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center gap-4 transition-colors ${
                  blitzFeedback === 'correct'
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : blitzFeedback === 'incorrect'
                    ? 'border-rose-500 bg-rose-950/20'
                    : 'border-slate-800'
                }`}
              >
                <div className="text-center">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Question #{blitzTotalAttempted + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white">{currentBlitzItem.title}</h3>
                </div>

                <div className="my-2 flex justify-center">
                  <ParticleDiagramCanvas diagram={currentBlitzItem} width={300} height={200} showLegend={true} />
                </div>

                <p className="text-xs text-slate-400 max-w-md text-center">{currentBlitzItem.description}</p>

                {/* 4 Classification Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-xl mt-2">
                  <button
                    onClick={() => handleBlitzAnswer('pure_element')}
                    className="p-3.5 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800 text-cyan-200 font-bold text-sm rounded-xl transition-all cursor-pointer text-center hover:scale-102 flex items-center justify-center gap-2"
                  >
                    <Atom className="w-4 h-4 text-cyan-400" />
                    <span>Pure Element</span>
                  </button>

                  <button
                    onClick={() => handleBlitzAnswer('pure_compound')}
                    className="p-3.5 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800 text-amber-200 font-bold text-sm rounded-xl transition-all cursor-pointer text-center hover:scale-102 flex items-center justify-center gap-2"
                  >
                    <FlaskConical className="w-4 h-4 text-amber-400" />
                    <span>Pure Compound</span>
                  </button>

                  <button
                    onClick={() => handleBlitzAnswer('mix_elements')}
                    className="p-3.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 text-emerald-200 font-bold text-sm rounded-xl transition-all cursor-pointer text-center hover:scale-102 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Mixture of Elements</span>
                  </button>

                  <button
                    onClick={() => handleBlitzAnswer('mix_element_compound')}
                    className="p-3.5 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-800 text-purple-200 font-bold text-sm rounded-xl transition-all cursor-pointer text-center hover:scale-102 flex items-center justify-center gap-2"
                  >
                    <BrainCircuit className="w-4 h-4 text-purple-400" />
                    <span>Mixture of Element & Compound</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {blitzFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center text-center gap-6"
            >
              <div className="p-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Trophy className="w-12 h-12" />
              </div>

              <div>
                <h3 className="text-3xl font-extrabold text-white">Speed Blitz Complete!</h3>
                <p className="text-sm text-slate-400 mt-1">Here is your performance summary:</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Final Score</span>
                  <span className="text-2xl font-extrabold text-amber-400">{blitzScore} XP</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Accuracy</span>
                  <span className="text-2xl font-extrabold text-emerald-400">
                    {blitzTotalAttempted > 0 ? Math.round((blitzCorrectCount / blitzTotalAttempted) * 100) : 0}%
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Best Streak</span>
                  <span className="text-2xl font-extrabold text-orange-400">{blitzBestStreak}x</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">Classified</span>
                  <span className="text-2xl font-extrabold text-cyan-400">{blitzCorrectCount} / {blitzTotalAttempted}</span>
                </div>
              </div>

              <button
                onClick={startBlitz}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: STOICHIOMETRY & ATOM COUNTING */}
      {/* ========================================================================= */}
      {activeSubTab === 'stoichiometry' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reaction Select List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>Select Reaction Case</span>
            </h3>

            {REACTION_CHALLENGES.map((challenge) => {
              const isSelected = challenge.id === selectedStoichId;
              return (
                <button
                  key={challenge.id}
                  onClick={() => {
                    setSelectedStoichId(challenge.id);
                    setStoichUserChoice(null);
                    setStoichSubmitted(false);
                  }}
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="font-mono text-xs text-cyan-400 font-bold">{challenge.equation}</span>
                  <span className="font-bold text-sm text-slate-100">{challenge.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Reaction Inspector Arena */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Chemical Reaction Inspector
              </span>
              <h3 className="text-xl font-extrabold text-white">{activeStoichChallenge.title}</h3>
              <div className="inline-block mt-2 px-3 py-1 rounded-lg bg-slate-950 border border-cyan-800/60 font-mono text-sm text-cyan-300 font-bold">
                {activeStoichChallenge.equation}
              </div>
              <p className="text-xs text-slate-400 mt-2">{activeStoichChallenge.description}</p>
            </div>

            <div className="flex flex-col items-center justify-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <ParticleDiagramCanvas diagram={activeStoichChallenge.diagram} width={320} height={210} showLegend={true} />
            </div>

            {/* User Inspection Choice */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Analyze Mass & Atom Conservation:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setStoichUserChoice('balanced')}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    stoichUserChoice === 'balanced'
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Conserves Mass (Balanced)</span>
                </button>

                <button
                  onClick={() => setStoichUserChoice('violates_mass')}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    stoichUserChoice === 'violates_mass'
                      ? 'bg-rose-950 border-rose-500 text-rose-200 shadow-md'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>Violates Conservation of Mass</span>
                </button>
              </div>

              {!stoichSubmitted ? (
                <button
                  disabled={!stoichUserChoice}
                  onClick={() => setStoichSubmitted(true)}
                  className={`mt-2 py-2.5 px-5 rounded-xl font-bold text-xs transition-all cursor-pointer self-end ${
                    stoichUserChoice
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Verify Analysis
                </button>
              ) : (
                <div
                  className={`mt-3 p-4 rounded-xl border text-xs flex items-start gap-3 ${
                    stoichUserChoice === activeStoichChallenge.correctAnswer
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800 text-rose-200'
                  }`}
                >
                  {stoichUserChoice === activeStoichChallenge.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block text-sm mb-1">
                      {stoichUserChoice === activeStoichChallenge.correctAnswer ? 'Spot On!' : 'Incorrect Analysis'}
                    </span>
                    <p>{activeStoichChallenge.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: MISCONCEPTION BUSTER */}
      {/* ========================================================================= */}
      {activeSubTab === 'misconception' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6 max-w-3xl mx-auto">
          {/* Header & Scenario Navigation Pills */}
          <div className="flex flex-col gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-lg">Misconception Inspector</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Scenario {miscIndex + 1} of {MISCONCEPTION_POOL.length}
              </span>
            </div>

            {/* Quick jump scenario buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {MISCONCEPTION_POOL.map((item, idx) => {
                const isActive = idx === miscIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMiscIndex(idx);
                      setMiscUserAnswer(null);
                      setMiscSubmitted(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    Scenario {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-emerald-400 mb-1">{activeMiscItem.claimTitle}</h4>
            <p className="text-sm text-slate-200 bg-slate-950 p-3.5 rounded-xl border border-slate-800 italic">
              "{activeMiscItem.studentClaim}"
            </p>
          </div>

          <div className="flex justify-center my-1">
            <ParticleDiagramCanvas diagram={activeMiscItem.diagram} width={280} height={180} showLegend={true} />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Select the correct scientific response:
            </span>

            {activeMiscItem.options.map((opt) => {
              const isSelected = miscUserAnswer === opt.id;
              return (
                <button
                  key={opt.id}
                  disabled={miscSubmitted}
                  onClick={() => setMiscUserAnswer(opt.id)}
                  className={`p-3.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-100 font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {opt.text}
                </button>
              );
            })}

            {!miscSubmitted ? (
              <button
                disabled={!miscUserAnswer}
                onClick={() => setMiscSubmitted(true)}
                className={`mt-2 py-2.5 px-5 rounded-xl font-bold text-xs transition-all cursor-pointer self-end ${
                  miscUserAnswer
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <div className="flex flex-col gap-4 mt-3">
                {(() => {
                  const selectedOpt = activeMiscItem.options.find((o) => o.id === miscUserAnswer);
                  const isCorrect = selectedOpt?.isCorrect ?? false;
                  return (
                    <div
                      className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                          : 'bg-amber-950/40 border-amber-800 text-amber-200'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold block text-sm mb-1">
                          {isCorrect ? 'Correct Analysis!' : 'Scientific Revision Needed'}
                        </span>
                        <p>{activeMiscItem.scientificExplanation}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* Next Scenario Button */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setMiscIndex((prev) => (prev - 1 + MISCONCEPTION_POOL.length) % MISCONCEPTION_POOL.length);
                      setMiscUserAnswer(null);
                      setMiscSubmitted(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Scenario</span>
                  </button>

                  <button
                    onClick={() => {
                      setMiscIndex((prev) => (prev + 1) % MISCONCEPTION_POOL.length);
                      setMiscUserAnswer(null);
                      setMiscSubmitted(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <span>Next Scenario</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
