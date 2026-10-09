import { GameLevel, ParticleDiagram } from '../types';

// Helper generators for particle diagrams
export const SAMPLE_DIAGRAMS: Record<string, ParticleDiagram> = {
  // ATOMS
  single_helium_atom: {
    id: 'd_he_atom',
    title: 'Helium Gas Sample (He)',
    description: 'Single isolated cyan spheres moving independently.',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'He', x: 25, y: 30 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'He', x: 70, y: 25 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a3', elementId: 'He', x: 40, y: 70 }], bonds: [] },
      { id: 'g4', atoms: [{ id: 'a4', elementId: 'He', x: 80, y: 75 }], bonds: [] },
    ],
    isAtom: true,
    isMolecule: false,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Every particle is a single, unbonded Helium atom (He). Since all atoms are identical and unbonded, this is a pure element made of individual atoms.',
    particleCountBreakdown: '4 Single Atoms (He)',
  },

  single_argon_atom: {
    id: 'd_ar_atom',
    title: 'Argon Gas Sample (Ar)',
    description: 'Single isolated pink spheres.',
    groups: [
      { id: 'g1', atoms: [{ id: 'a1', elementId: 'Ar', x: 30, y: 35 }], bonds: [] },
      { id: 'g2', atoms: [{ id: 'a2', elementId: 'Ar', x: 65, y: 60 }], bonds: [] },
      { id: 'g3', atoms: [{ id: 'a3', elementId: 'Ar', x: 80, y: 20 }], bonds: [] },
    ],
    isAtom: true,
    isMolecule: false,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Contains individual Argon atoms (Ar). Individual unbonded spheres represent atoms.',
    particleCountBreakdown: '3 Single Atoms (Ar)',
  },

  // MOLECULES - ELEMENTS
  oxygen_diatomic: {
    id: 'd_o2_molecule',
    title: 'Oxygen Gas (O₂)',
    description: 'Pairs of bonded red spheres.',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'O', x: 25, y: 30 },
          { id: 'a2', elementId: 'O', x: 35, y: 30 },
        ],
        bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a3', elementId: 'O', x: 65, y: 70 },
          { id: 'a4', elementId: 'O', x: 75, y: 70 },
        ],
        bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }],
      },
      {
        id: 'g3',
        atoms: [
          { id: 'a5', elementId: 'O', x: 70, y: 25 },
          { id: 'a6', elementId: 'O', x: 80, y: 25 },
        ],
        bonds: [{ atom1Id: 'a5', atom2Id: 'a6', type: 'double' }],
      },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Each particle is a pair of bonded Oxygen atoms (O₂). Because 2+ atoms are chemically joined, it is a MOLECULE. Because both atoms are the SAME element (Oxygen), it is an ELEMENT.',
    particleCountBreakdown: '3 Diatomic Molecules (O₂)',
  },

  nitrogen_diatomic: {
    id: 'd_n2_molecule',
    title: 'Nitrogen Gas (N₂)',
    description: 'Pairs of bonded blue spheres.',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'N', x: 20, y: 50 },
          { id: 'a2', elementId: 'N', x: 30, y: 50 },
        ],
        bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a3', elementId: 'N', x: 60, y: 30 },
          { id: 'a4', elementId: 'N', x: 70, y: 30 },
        ],
        bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'triple' }],
      },
    ],
    isAtom: false,
    isMolecule: true,
    isElement: true,
    isCompound: false,
    isPureSubstance: true,
    isMixture: false,
    stateOfMatter: 'gas',
    explanation: 'Bonded pairs of Nitrogen atoms (N₂). Two of the same atom bonded together = Diatomic Element Molecule.',
    particleCountBreakdown: '2 Diatomic Molecules (N₂)',
  },

  // MOLECULES - COMPOUNDS
  water_vapor: {
    id: 'd_h2o_compound',
    title: 'Water Vapor (H₂O)',
    description: 'Bent molecules with 1 central red Oxygen atom bonded to 2 white Hydrogen atoms.',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'O', x: 30, y: 30 },
          { id: 'a2', elementId: 'H', x: 22, y: 22 },
          { id: 'a3', elementId: 'H', x: 38, y: 22 },
        ],
        bonds: [
          { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
          { atom1Id: 'a1', atom2Id: 'a3', type: 'single' },
        ],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a4', elementId: 'O', x: 70, y: 65 },
          { id: 'a5', elementId: 'H', x: 62, y: 57 },
          { id: 'a6', elementId: 'H', x: 78, y: 57 },
        ],
        bonds: [
          { atom1Id: 'a4', atom2Id: 'a5', type: 'single' },
          { atom1Id: 'a4', atom2Id: 'a6', type: 'single' },
        ],
      },
      {
        id: 'g3',
        atoms: [
          { id: 'a7', elementId: 'O', x: 75, y: 25 },
          { id: 'a8', elementId: 'H', x: 67, y: 17 },
          { id: 'a9', elementId: 'H', x: 83, y: 17 },
        ],
        bonds: [
          { atom1Id: 'a7', atom2Id: 'a8', type: 'single' },
          { atom1Id: 'a7', atom2Id: 'a9', type: 'single' },
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
    explanation: 'Each particle is a molecule made of DIFFERENT elements (Hydrogen + Oxygen). Molecules containing 2+ different elements chemically bonded are COMPOUNDS.',
    particleCountBreakdown: '3 Compound Molecules (H₂O)',
  },

  carbon_dioxide: {
    id: 'd_co2_compound',
    title: 'Carbon Dioxide (CO₂)',
    description: 'Linear molecule with central dark Carbon bonded to two red Oxygen atoms.',
    groups: [
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'O', x: 20, y: 40 },
          { id: 'a2', elementId: 'C', x: 32, y: 40 },
          { id: 'a3', elementId: 'O', x: 44, y: 40 },
        ],
        bonds: [
          { atom1Id: 'a1', atom2Id: 'a2', type: 'double' },
          { atom1Id: 'a2', atom2Id: 'a3', type: 'double' },
        ],
      },
      {
        id: 'g2',
        atoms: [
          { id: 'a4', elementId: 'O', x: 55, y: 70 },
          { id: 'a5', elementId: 'C', x: 67, y: 70 },
          { id: 'a6', elementId: 'O', x: 79, y: 70 },
        ],
        bonds: [
          { atom1Id: 'a4', atom2Id: 'a5', type: 'double' },
          { atom1Id: 'a5', atom2Id: 'a6', type: 'double' },
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
    explanation: 'Contains chemically bonded Carbon and Oxygen. Since all molecules in this container are identical CO₂, it is a PURE COMPOUND.',
    particleCountBreakdown: '2 Compound Molecules (CO₂)',
  },

  // MIXTURES
  air_mixture: {
    id: 'd_air_mixture',
    title: 'Air Sample (O₂ + N₂ + Ar)',
    description: 'A mixture containing Nitrogen (N₂), Oxygen (O₂), and Argon (Ar) atoms.',
    groups: [
      // N2 molecule
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'N', x: 20, y: 30 },
          { id: 'a2', elementId: 'N', x: 30, y: 30 },
        ],
        bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }],
      },
      // O2 molecule
      {
        id: 'g2',
        atoms: [
          { id: 'a3', elementId: 'O', x: 60, y: 30 },
          { id: 'a4', elementId: 'O', x: 70, y: 30 },
        ],
        bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }],
      },
      // Ar atom
      { id: 'g3', atoms: [{ id: 'a5', elementId: 'Ar', x: 35, y: 75 }], bonds: [] },
      // Another N2
      {
        id: 'g4',
        atoms: [
          { id: 'a6', elementId: 'N', x: 75, y: 70 },
          { id: 'a7', elementId: 'N', x: 85, y: 70 },
        ],
        bonds: [{ atom1Id: 'a6', atom2Id: 'a7', type: 'triple' }],
      },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    mixtureType: 'homogeneous',
    stateOfMatter: 'gas',
    explanation: 'Contains DIFFERENT types of particles (N₂ molecules, O₂ molecules, and Ar atoms) physically mixed in the same space. Therefore, this is a MIXTURE OF ELEMENTS.',
    particleCountBreakdown: '2 N₂ molecules + 1 O₂ molecule + 1 Ar atom',
  },

  element_and_compound_mixture: {
    id: 'd_el_comp_mix',
    title: 'Humid Air (O₂ + H₂O)',
    description: 'A mixture of Oxygen molecules (O₂) and Water vapor molecules (H₂O).',
    groups: [
      // O2
      {
        id: 'g1',
        atoms: [
          { id: 'a1', elementId: 'O', x: 25, y: 25 },
          { id: 'a2', elementId: 'O', x: 35, y: 25 },
        ],
        bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }],
      },
      // H2O
      {
        id: 'g2',
        atoms: [
          { id: 'a3', elementId: 'O', x: 70, y: 35 },
          { id: 'a4', elementId: 'H', x: 62, y: 27 },
          { id: 'a5', elementId: 'H', x: 78, y: 27 },
        ],
        bonds: [
          { atom1Id: 'a3', atom2Id: 'a4', type: 'single' },
          { atom1Id: 'a3', atom2Id: 'a5', type: 'single' },
        ],
      },
      // H2O
      {
        id: 'g3',
        atoms: [
          { id: 'a6', elementId: 'O', x: 35, y: 75 },
          { id: 'a7', elementId: 'H', x: 27, y: 67 },
          { id: 'a8', elementId: 'H', x: 43, y: 67 },
        ],
        bonds: [
          { atom1Id: 'a6', atom2Id: 'a7', type: 'single' },
          { atom1Id: 'a6', atom2Id: 'a8', type: 'single' },
        ],
      },
    ],
    isAtom: false,
    isMolecule: false,
    isElement: false,
    isCompound: false,
    isPureSubstance: false,
    isMixture: true,
    mixtureType: 'homogeneous',
    stateOfMatter: 'gas',
    explanation: 'This container holds an Element (O₂) AND a Compound (H₂O). Because there are two distinct chemical formulas, it is a MIXTURE of an Element and a Compound.',
    particleCountBreakdown: '1 O₂ Element Molecule + 2 H₂O Compound Molecules',
  },

  // STATES OF MATTER DIAGRAMS
  solid_ice_crystal: getSubstancePhaseDiagram('water', 'solid'),
  liquid_water_state: getSubstancePhaseDiagram('water', 'liquid'),
  gas_state_sample: getSubstancePhaseDiagram('water', 'gas'),
};

export type SubstanceType = 'water' | 'argon' | 'oxygen' | 'iron';
export type PhaseType = 'solid' | 'liquid' | 'gas';

export function getSubstancePhaseDiagram(
  substance: SubstanceType,
  phase: PhaseType
): ParticleDiagram {
  if (substance === 'water') {
    if (phase === 'solid') {
      const groups = [];
      const cols = [26, 42, 58, 74];
      const rows = [32, 50, 68];
      let idCount = 1;
      for (const r of rows) {
        for (const c of cols) {
          const gid = `w_s_${idCount++}`;
          groups.push({
            id: gid,
            atoms: [
              { id: `${gid}_a1`, elementId: 'O', x: c, y: r },
              { id: `${gid}_a2`, elementId: 'H', x: c - 5, y: r - 5 },
              { id: `${gid}_a3`, elementId: 'H', x: c + 5, y: r - 5 },
            ],
            bonds: [
              { atom1Id: `${gid}_a1`, atom2Id: `${gid}_a2`, type: 'single' as const },
              { atom1Id: `${gid}_a1`, atom2Id: `${gid}_a3`, type: 'single' as const },
            ],
          });
        }
      }
      return {
        id: 'd_water_solid',
        title: 'Solid Water (Ice Crystal Grid)',
        description: 'Fixed crystalline lattice of H₂O compound molecules.',
        groups,
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'solid',
        explanation: 'Water (H₂O) molecules in a solid state form a rigid crystal structure vibrating in place.',
        particleCountBreakdown: '12 Water (H₂O) molecules in Ice lattice',
      };
    } else if (phase === 'liquid') {
      const row1 = [{ x: 20, y: 84 }, { x: 32, y: 84 }, { x: 44, y: 84 }, { x: 56, y: 84 }, { x: 68, y: 84 }, { x: 80, y: 84 }];
      const row2 = [{ x: 26, y: 70 }, { x: 38, y: 70 }, { x: 50, y: 70 }, { x: 62, y: 70 }, { x: 74, y: 70 }];
      const row3 = [{ x: 50, y: 56 }];
      const positions = [...row1, ...row2, ...row3];
      const groups = positions.map((pos, idx) => {
        const gid = `w_l_${idx + 1}`;
        return {
          id: gid,
          atoms: [
            { id: `${gid}_a1`, elementId: 'O', x: pos.x, y: pos.y },
            { id: `${gid}_a2`, elementId: 'H', x: pos.x - 5, y: pos.y - 5 },
            { id: `${gid}_a3`, elementId: 'H', x: pos.x + 5, y: pos.y - 5 },
          ],
          bonds: [
            { atom1Id: `${gid}_a1`, atom2Id: `${gid}_a2`, type: 'single' as const },
            { atom1Id: `${gid}_a1`, atom2Id: `${gid}_a3`, type: 'single' as const },
          ],
        };
      });
      return {
        id: 'd_water_liquid',
        title: 'Liquid Water (Flowing H₂O)',
        description: 'H₂O compound molecules packed closely near the bottom, sliding over one another.',
        groups,
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'liquid',
        explanation: 'In liquid water, intact H₂O molecules slide freely past each other.',
        particleCountBreakdown: '12 Water (H₂O) molecules in Liquid state',
      };
    } else {
      const positions = [{ x: 25, y: 25 }, { x: 70, y: 30 }, { x: 45, y: 50 }, { x: 80, y: 65 }, { x: 25, y: 75 }, { x: 60, y: 80 }];
      const groups = positions.map((pos, idx) => {
        const gid = `w_g_${idx + 1}`;
        return {
          id: gid,
          atoms: [
            { id: `${gid}_a1`, elementId: 'O', x: pos.x, y: pos.y },
            { id: `${gid}_a2`, elementId: 'H', x: pos.x - 5, y: pos.y - 5 },
            { id: `${gid}_a3`, elementId: 'H', x: pos.x + 5, y: pos.y - 5 },
          ],
          bonds: [
            { atom1Id: `${gid}_a1`, atom2Id: `${gid}_a2`, type: 'single' as const },
            { atom1Id: `${gid}_a1`, atom2Id: `${gid}_a3`, type: 'single' as const },
          ],
        };
      });
      return {
        id: 'd_water_gas',
        title: 'Gas Phase (Steam / Water Vapor)',
        description: 'Independent H₂O compound molecules rapidly bouncing throughout space.',
        groups,
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'gas',
        explanation: 'Steam consists of free, fast-moving H₂O molecules filling the container.',
        particleCountBreakdown: '6 Water (H₂O) molecules in Gas state',
      };
    }
  } else if (substance === 'argon') {
    if (phase === 'solid') {
      const groups = [];
      const cols = [28, 42, 56, 70];
      const rows = [30, 44, 58, 72];
      let idCount = 1;
      for (const r of rows) {
        for (const c of cols) {
          const gid = `ar_s_${idCount++}`;
          groups.push({
            id: gid,
            atoms: [{ id: `${gid}_a1`, elementId: 'Ar', x: c, y: r }],
            bonds: [],
          });
        }
      }
      return {
        id: 'd_argon_solid',
        title: 'Solid Argon (Ar Lattice)',
        description: 'Rigid solid lattice of noble Argon atoms.',
        groups,
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'solid',
        explanation: 'Solid Argon is composed of individual Ar atoms in a fixed crystal grid.',
        particleCountBreakdown: '16 Argon (Ar) atoms in Solid lattice',
      };
    } else if (phase === 'liquid') {
      const row1 = [{ x: 20, y: 86 }, { x: 32, y: 86 }, { x: 44, y: 86 }, { x: 56, y: 86 }, { x: 68, y: 86 }, { x: 80, y: 86 }];
      const row2 = [{ x: 26, y: 74 }, { x: 38, y: 74 }, { x: 50, y: 74 }, { x: 62, y: 74 }, { x: 74, y: 74 }];
      const row3 = [{ x: 32, y: 62 }, { x: 44, y: 62 }, { x: 56, y: 62 }, { x: 68, y: 62 }];
      const row4 = [{ x: 50, y: 50 }];
      const positions = [...row1, ...row2, ...row3, ...row4];
      const groups = positions.map((pos, idx) => {
        const gid = `ar_l_${idx + 1}`;
        return {
          id: gid,
          atoms: [{ id: `${gid}_a1`, elementId: 'Ar', x: pos.x, y: pos.y }],
          bonds: [],
        };
      });
      return {
        id: 'd_argon_liquid',
        title: 'Liquid Argon',
        description: 'Argon atoms closely packed near bottom, sliding over each other.',
        groups,
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'liquid',
        explanation: 'Liquid Argon consists of flowing, unbonded Ar noble gas atoms.',
        particleCountBreakdown: '16 Argon (Ar) atoms in Liquid state',
      };
    } else {
      const positions = [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 45, y: 45 }, { x: 20, y: 60 }, { x: 80, y: 60 }, { x: 50, y: 75 }, { x: 30, y: 85 }, { x: 70, y: 85 }];
      const groups = positions.map((pos, idx) => {
        const gid = `ar_g_${idx + 1}`;
        return {
          id: gid,
          atoms: [{ id: `${gid}_a1`, elementId: 'Ar', x: pos.x, y: pos.y }],
          bonds: [],
        };
      });
      return {
        id: 'd_argon_gas',
        title: 'Argon Gas',
        description: 'Independent noble Argon atoms rapidly bouncing throughout space.',
        groups,
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'gas',
        explanation: 'Argon gas consists of single, unbonded Ar atoms flying freely.',
        particleCountBreakdown: '8 Argon (Ar) atoms in Gas state',
      };
    }
  } else if (substance === 'oxygen') {
    if (phase === 'solid') {
      const groups = [];
      const cols = [28, 44, 60, 76];
      const rows = [35, 53, 71];
      let idCount = 1;
      for (const r of rows) {
        for (const c of cols) {
          const gid = `o2_s_${idCount++}`;
          groups.push({
            id: gid,
            atoms: [
              { id: `${gid}_a1`, elementId: 'O', x: c - 4, y: r },
              { id: `${gid}_a2`, elementId: 'O', x: c + 4, y: r },
            ],
            bonds: [{ atom1Id: `${gid}_a1`, atom2Id: `${gid}_a2`, type: 'double' as const }],
          });
        }
      }
      return {
        id: 'd_oxygen_solid',
        title: 'Solid Oxygen (O₂ Crystal Lattice)',
        description: 'Diatomic O₂ element molecules locked in a solid molecular crystal grid.',
        groups,
        isAtom: false,
        isMolecule: true,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'solid',
        explanation: 'Solid Oxygen is composed of diatomic O₂ molecules vibrating in place.',
        particleCountBreakdown: '12 Oxygen (O₂) molecules in Solid lattice',
      };
    } else if (phase === 'liquid') {
      const row1 = [{ x: 22, y: 84 }, { x: 36, y: 84 }, { x: 50, y: 84 }, { x: 64, y: 84 }, { x: 78, y: 84 }];
      const row2 = [{ x: 28, y: 70 }, { x: 42, y: 70 }, { x: 56, y: 70 }, { x: 70, y: 70 }];
      const row3 = [{ x: 35, y: 56 }, { x: 49, y: 56 }, { x: 63, y: 56 }];
      const positions = [...row1, ...row2, ...row3];
      const groups = positions.map((pos, idx) => {
        const gid = `o2_l_${idx + 1}`;
        return {
          id: gid,
          atoms: [
            { id: `${gid}_a1`, elementId: 'O', x: pos.x - 4, y: pos.y },
            { id: `${gid}_a2`, elementId: 'O', x: pos.x + 4, y: pos.y },
          ],
          bonds: [{ atom1Id: `${gid}_a1`, atom2Id: `${gid}_a2`, type: 'double' as const }],
        };
      });
      return {
        id: 'd_oxygen_liquid',
        title: 'Liquid Oxygen (O₂)',
        description: 'Pale blue liquid consisting of packed diatomic O₂ molecules.',
        groups,
        isAtom: false,
        isMolecule: true,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'liquid',
        explanation: 'Liquid oxygen consists of flowing O₂ diatomic element molecules.',
        particleCountBreakdown: '12 Oxygen (O₂) molecules in Liquid state',
      };
    } else {
      const positions = [{ x: 25, y: 25 }, { x: 75, y: 30 }, { x: 45, y: 50 }, { x: 25, y: 70 }, { x: 80, y: 70 }, { x: 55, y: 82 }];
      const groups = positions.map((pos, idx) => {
        const gid = `o2_g_${idx + 1}`;
        return {
          id: gid,
          atoms: [
            { id: `${gid}_a1`, elementId: 'O', x: pos.x - 4, y: pos.y },
            { id: `${gid}_a2`, elementId: 'O', x: pos.x + 4, y: pos.y },
          ],
          bonds: [{ atom1Id: `${gid}_a1`, atom2Id: `${gid}_a2`, type: 'double' as const }],
        };
      });
      return {
        id: 'd_oxygen_gas',
        title: 'Oxygen Gas (O₂)',
        description: 'Diatomic O₂ element molecules rapidly bouncing throughout container.',
        groups,
        isAtom: false,
        isMolecule: true,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'gas',
        explanation: 'Oxygen gas consists of free-flying diatomic O₂ molecules.',
        particleCountBreakdown: '6 Oxygen (O₂) molecules in Gas state',
      };
    }
  } else {
    if (phase === 'solid') {
      const groups = [];
      const cols = [28, 42, 56, 70];
      const rows = [30, 44, 58, 72];
      let idCount = 1;
      for (const r of rows) {
        for (const c of cols) {
          const gid = `fe_s_${idCount++}`;
          groups.push({
            id: gid,
            atoms: [{ id: `${gid}_a1`, elementId: 'Fe', x: c, y: r }],
            bonds: [],
          });
        }
      }
      return {
        id: 'd_iron_solid',
        title: 'Solid Iron (Fe Metal Lattice)',
        description: 'Dense metallic crystal lattice of Iron atoms.',
        groups,
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'solid',
        explanation: 'Solid iron metal is composed of Fe atoms locked in a metallic crystal lattice.',
        particleCountBreakdown: '16 Iron (Fe) atoms in Solid lattice',
      };
    } else if (phase === 'liquid') {
      const row1 = [{ x: 20, y: 86 }, { x: 32, y: 86 }, { x: 44, y: 86 }, { x: 56, y: 86 }, { x: 68, y: 86 }, { x: 80, y: 86 }];
      const row2 = [{ x: 26, y: 74 }, { x: 38, y: 74 }, { x: 50, y: 74 }, { x: 62, y: 74 }, { x: 74, y: 74 }];
      const row3 = [{ x: 32, y: 62 }, { x: 44, y: 62 }, { x: 56, y: 62 }, { x: 68, y: 62 }];
      const row4 = [{ x: 50, y: 50 }];
      const positions = [...row1, ...row2, ...row3, ...row4];
      const groups = positions.map((pos, idx) => {
        const gid = `fe_l_${idx + 1}`;
        return {
          id: gid,
          atoms: [{ id: `${gid}_a1`, elementId: 'Fe', x: pos.x, y: pos.y }],
          bonds: [],
        };
      });
      return {
        id: 'd_iron_liquid',
        title: 'Molten Liquid Iron',
        description: 'Extreme heat allows Fe metal atoms to break lattice bonds and flow fluidly.',
        groups,
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'liquid',
        explanation: 'Molten liquid iron consists of flowing Fe atoms.',
        particleCountBreakdown: '16 Iron (Fe) atoms in Liquid state',
      };
    } else {
      const positions = [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 45, y: 45 }, { x: 20, y: 60 }, { x: 80, y: 60 }, { x: 50, y: 75 }, { x: 30, y: 85 }, { x: 70, y: 85 }];
      const groups = positions.map((pos, idx) => {
        const gid = `fe_g_${idx + 1}`;
        return {
          id: gid,
          atoms: [{ id: `${gid}_a1`, elementId: 'Fe', x: pos.x, y: pos.y }],
          bonds: [],
        };
      });
      return {
        id: 'd_iron_gas',
        title: 'Iron Vapor Gas',
        description: 'High-energy gaseous iron atoms flying freely.',
        groups,
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'gas',
        explanation: 'Gaseous iron consists of individual Fe atoms in gas phase.',
        particleCountBreakdown: '8 Iron (Fe) atoms in Gas state',
      };
    }
  }
}

export const GAME_LEVELS: GameLevel[] = [
  // LEVEL 1
  {
    id: 1,
    title: 'Atom vs. Molecule',
    category: 'Atom vs Molecule',
    difficulty: 'Beginner',
    instruction: 'Classify each particle diagram into ATOM (single unbonded sphere) or MOLECULE (2+ chemically bonded atoms).',
    unlockedByDefault: true,
    badgeRewardId: 'atom_apprentice',
    hint: 'An ATOM is a single isolated circle. A MOLECULE consists of two or more atoms chemically joined together by a line/bond!',
    dropZones: [
      {
        id: 'zone_atom',
        label: 'Single ATOM',
        subLabel: 'Isolated single spheres',
        acceptTypes: ['atom'],
        iconName: 'Circle',
        colorTheme: 'border-cyan-500 bg-cyan-950/20 text-cyan-400',
      },
      {
        id: 'zone_molecule',
        label: 'MOLECULE',
        subLabel: '2+ bonded atoms joined together',
        acceptTypes: ['molecule'],
        iconName: 'Link',
        colorTheme: 'border-purple-500 bg-purple-950/20 text-purple-400',
      },
    ],
    diagrams: [
      SAMPLE_DIAGRAMS.single_helium_atom,
      SAMPLE_DIAGRAMS.oxygen_diatomic,
      SAMPLE_DIAGRAMS.single_argon_atom,
      SAMPLE_DIAGRAMS.water_vapor,
      SAMPLE_DIAGRAMS.nitrogen_diatomic,
      {
        id: 'd_fe_atom_l1',
        title: 'Iron Metal Sample (Fe)',
        description: 'Single unbonded iron metal atoms.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'Fe', x: 25, y: 30 }], bonds: [] },
          { id: 'g2', atoms: [{ id: 'a2', elementId: 'Fe', x: 75, y: 30 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a3', elementId: 'Fe', x: 30, y: 70 }], bonds: [] },
          { id: 'g4', atoms: [{ id: 'a4', elementId: 'Fe', x: 70, y: 75 }], bonds: [] },
        ],
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'solid',
        explanation: 'Individual Iron (Fe) atoms without chemical bonds are ATOMS.',
        particleCountBreakdown: '4 Single Iron (Fe) Atoms',
      },
      SAMPLE_DIAGRAMS.carbon_dioxide,
      {
        id: 'd_ne_atom_l1',
        title: 'Neon Noble Gas Sample (Ne)',
        description: 'Single isolated orange spheres moving freely.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'Ne', x: 20, y: 35 }], bonds: [] },
          { id: 'g2', atoms: [{ id: 'a2', elementId: 'Ne', x: 80, y: 25 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a3', elementId: 'Ne', x: 45, y: 65 }], bonds: [] },
          { id: 'g4', atoms: [{ id: 'a4', elementId: 'Ne', x: 75, y: 75 }], bonds: [] },
        ],
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'gas',
        explanation: 'Neon is a monoatomic noble gas consisting of single unbonded ATOMS.',
        particleCountBreakdown: '4 Single Neon (Ne) Atoms',
      },
    ],
  },

  // LEVEL 2
  {
    id: 2,
    title: 'Element vs. Compound',
    category: 'Element vs Compound',
    difficulty: 'Beginner',
    instruction: 'Determine if each pure diagram represents an ELEMENT (only 1 color/type of atom) or a COMPOUND (2+ different colors/types of atoms bonded).',
    unlockedByDefault: false,
    badgeRewardId: 'elemental_explorer',
    hint: 'Look at the atom colors/symbols! An ELEMENT contains only ONE color/type of atom throughout. A COMPOUND contains TWO OR MORE different atom types chemically bonded!',
    dropZones: [
      {
        id: 'zone_element',
        label: 'ELEMENT',
        subLabel: 'Only ONE type of atom present',
        acceptTypes: ['element'],
        iconName: 'Sparkles',
        colorTheme: 'border-emerald-500 bg-emerald-950/20 text-emerald-400',
      },
      {
        id: 'zone_compound',
        label: 'COMPOUND',
        subLabel: '2+ DIFFERENT types of atoms chemically bonded',
        acceptTypes: ['compound'],
        iconName: 'FlaskConical',
        colorTheme: 'border-amber-500 bg-amber-950/20 text-amber-400',
      },
    ],
    diagrams: [
      SAMPLE_DIAGRAMS.oxygen_diatomic,
      SAMPLE_DIAGRAMS.water_vapor,
      SAMPLE_DIAGRAMS.nitrogen_diatomic,
      SAMPLE_DIAGRAMS.carbon_dioxide,
      SAMPLE_DIAGRAMS.single_helium_atom,
      {
        id: 'd_ch4_compound_l2',
        title: 'Methane Gas (CH₄)',
        description: 'Molecules consisting of 1 central Carbon atom bonded to 4 Hydrogen atoms.',
        groups: [
          {
            id: 'g1',
            atoms: [
              { id: 'a1', elementId: 'C', x: 30, y: 35 },
              { id: 'a2', elementId: 'H', x: 20, y: 35 },
              { id: 'a3', elementId: 'H', x: 40, y: 35 },
              { id: 'a4', elementId: 'H', x: 30, y: 23 },
              { id: 'a5', elementId: 'H', x: 30, y: 47 },
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
              { id: 'a6', elementId: 'C', x: 70, y: 65 },
              { id: 'a7', elementId: 'H', x: 60, y: 65 },
              { id: 'a8', elementId: 'H', x: 80, y: 65 },
              { id: 'a9', elementId: 'H', x: 70, y: 53 },
              { id: 'a10', elementId: 'H', x: 70, y: 77 },
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
        explanation: 'Each molecule contains Carbon AND Hydrogen chemically bonded together. Containing two different elements makes this a COMPOUND.',
        particleCountBreakdown: '2 Methane (CH₄) Compound Molecules',
      },
      SAMPLE_DIAGRAMS.single_argon_atom,
      {
        id: 'd_nh3_compound_l2',
        title: 'Ammonia Gas (NH₃)',
        description: 'Molecules with 1 central Nitrogen atom bonded to 3 Hydrogen atoms.',
        groups: [
          {
            id: 'g1',
            atoms: [
              { id: 'a1', elementId: 'N', x: 30, y: 35 },
              { id: 'a2', elementId: 'H', x: 20, y: 28 },
              { id: 'a3', elementId: 'H', x: 40, y: 28 },
              { id: 'a4', elementId: 'H', x: 30, y: 47 },
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
              { id: 'a5', elementId: 'N', x: 70, y: 65 },
              { id: 'a6', elementId: 'H', x: 60, y: 58 },
              { id: 'a7', elementId: 'H', x: 80, y: 58 },
              { id: 'a8', elementId: 'H', x: 70, y: 77 },
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
        explanation: 'Ammonia consists of Nitrogen and Hydrogen chemically bonded. Because it contains multiple different element types, it is a COMPOUND.',
        particleCountBreakdown: '2 Ammonia (NH₃) Compound Molecules',
      },
    ],
  },

  // LEVEL 3
  {
    id: 3,
    title: 'Pure Substance vs. Mixture',
    category: 'Pure vs Mixture',
    difficulty: 'Intermediate',
    instruction: 'Sort diagrams into PURE SUBSTANCE (every particle group in the container is identical) vs MIXTURE (different particle species mixed together).',
    unlockedByDefault: false,
    badgeRewardId: 'purity_inspector',
    hint: 'Compare every particle group in the container! If ALL particles are identical formulas, it is PURE. If you see two different formulas or unbonded species mixed, it is a MIXTURE.',
    dropZones: [
      {
        id: 'zone_pure',
        label: 'PURE SUBSTANCE',
        subLabel: 'All particles in the sample are 100% identical',
        acceptTypes: ['pure'],
        iconName: 'ShieldCheck',
        colorTheme: 'border-blue-500 bg-blue-950/20 text-blue-400',
      },
      {
        id: 'zone_mixture',
        label: 'MIXTURE',
        subLabel: 'Contains 2 or more different particle species mixed',
        acceptTypes: ['mixture'],
        iconName: 'Layers',
        colorTheme: 'border-rose-500 bg-rose-950/20 text-rose-400',
      },
    ],
    diagrams: [
      SAMPLE_DIAGRAMS.carbon_dioxide,
      SAMPLE_DIAGRAMS.air_mixture,
      SAMPLE_DIAGRAMS.oxygen_diatomic,
      SAMPLE_DIAGRAMS.element_and_compound_mixture,
      {
        id: 'd_pure_argon_l3',
        title: 'Pure Argon Gas (Ar)',
        description: 'Sample containing only Argon noble gas atoms.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'Ar', x: 25, y: 30 }], bonds: [] },
          { id: 'g2', atoms: [{ id: 'a2', elementId: 'Ar', x: 75, y: 30 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a3', elementId: 'Ar', x: 30, y: 70 }], bonds: [] },
          { id: 'g4', atoms: [{ id: 'a4', elementId: 'Ar', x: 80, y: 70 }], bonds: [] },
        ],
        isAtom: true,
        isMolecule: false,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        stateOfMatter: 'gas',
        explanation: 'Every particle in the container is an Argon (Ar) atom. Because all particles are 100% identical, this is a PURE SUBSTANCE.',
        particleCountBreakdown: '4 Identical Argon (Ar) Atoms',
      },
      {
        id: 'd_saline_mixture_l3',
        title: 'Saline Solution (Water + Sodium + Chlorine Ions)',
        description: 'Water molecules mixed with dissolved Sodium (Na) and Chlorine (Cl) ions.',
        groups: [
          {
            id: 'g1',
            atoms: [
              { id: 'a1', elementId: 'O', x: 25, y: 30 },
              { id: 'a2', elementId: 'H', x: 18, y: 22 },
              { id: 'a3', elementId: 'H', x: 32, y: 22 },
            ],
            bonds: [
              { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
              { atom1Id: 'a1', atom2Id: 'a3', type: 'single' },
            ],
          },
          { id: 'g2', atoms: [{ id: 'a4', elementId: 'Na', x: 70, y: 25 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a5', elementId: 'Cl', x: 35, y: 75 }], bonds: [] },
          {
            id: 'g4',
            atoms: [
              { id: 'a6', elementId: 'O', x: 75, y: 70 },
              { id: 'a7', elementId: 'H', x: 68, y: 62 },
              { id: 'a8', elementId: 'H', x: 82, y: 62 },
            ],
            bonds: [
              { atom1Id: 'a6', atom2Id: 'a7', type: 'single' },
              { atom1Id: 'a6', atom2Id: 'a8', type: 'single' },
            ],
          },
        ],
        isAtom: false,
        isMolecule: false,
        isElement: false,
        isCompound: false,
        isPureSubstance: false,
        isMixture: true,
        stateOfMatter: 'liquid',
        explanation: 'Contains different chemical species (H₂O molecules, Na⁺ ions, and Cl⁻ ions) physically mixed. Thus, it is a MIXTURE.',
        particleCountBreakdown: '2 H₂O molecules + 1 Na⁺ ion + 1 Cl⁻ ion (Saline Solution)',
      },
      SAMPLE_DIAGRAMS.water_vapor,
      {
        id: 'd_he_ne_mixture_l3',
        title: 'Noble Gas Mixture (Helium + Neon)',
        description: 'Unbonded Helium (He) atoms and Neon (Ne) atoms mixed in a container.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'He', x: 20, y: 30 }], bonds: [] },
          { id: 'g2', atoms: [{ id: 'a2', elementId: 'Ne', x: 75, y: 25 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a3', elementId: 'He', x: 35, y: 75 }], bonds: [] },
          { id: 'g4', atoms: [{ id: 'a4', elementId: 'Ne', x: 80, y: 75 }], bonds: [] },
        ],
        isAtom: true,
        isMolecule: false,
        isElement: false,
        isCompound: false,
        isPureSubstance: false,
        isMixture: true,
        stateOfMatter: 'gas',
        explanation: 'Contains two distinct unbonded element species (Helium and Neon) in the same container, making it a MIXTURE.',
        particleCountBreakdown: '2 Helium (He) atoms + 2 Neon (Ne) atoms',
      },
    ],
  },

  // LEVEL 4
  {
    id: 4,
    title: 'The Master Matter Matrix',
    category: 'Matter Matrix',
    difficulty: 'Intermediate',
    instruction: 'Categorize each particle diagram into its specific quad-classification: Pure Element, Pure Compound, Mixture of Elements, or Mixture of Element & Compound.',
    unlockedByDefault: false,
    badgeRewardId: 'matter_matrix_master',
    hint: 'Check purity first (one particle species vs multiple), then examine atom diversity inside the particles (one atom type = Element, multiple atom types = Compound).',
    dropZones: [
      {
        id: 'zone_pure_element',
        label: 'Pure Element',
        subLabel: 'Only 1 element type, pure sample',
        acceptTypes: ['pure_element'],
        iconName: 'Atom',
        colorTheme: 'border-cyan-500 bg-cyan-950/20 text-cyan-400',
      },
      {
        id: 'zone_pure_compound',
        label: 'Pure Compound',
        subLabel: '1 compound formula, pure sample',
        acceptTypes: ['pure_compound'],
        iconName: 'FlaskConical',
        colorTheme: 'border-amber-500 bg-amber-950/20 text-amber-400',
      },
      {
        id: 'zone_mix_elements',
        label: 'Mixture of Elements',
        subLabel: 'Multiple element species mixed',
        acceptTypes: ['mix_elements'],
        iconName: 'Sparkles',
        colorTheme: 'border-emerald-500 bg-emerald-950/20 text-emerald-400',
      },
      {
        id: 'zone_mix_element_compound',
        label: 'Mixture of Element & Compound',
        subLabel: 'Elements and Compounds mixed together',
        acceptTypes: ['mix_element_compound'],
        iconName: 'Layers',
        colorTheme: 'border-purple-500 bg-purple-950/20 text-purple-400',
      },
    ],
    diagrams: [
      {
        ...SAMPLE_DIAGRAMS.oxygen_diatomic,
        id: 'matrix_pure_el',
      },
      {
        ...SAMPLE_DIAGRAMS.water_vapor,
        id: 'matrix_pure_comp',
      },
      {
        ...SAMPLE_DIAGRAMS.air_mixture,
        id: 'matrix_mix_el',
      },
      {
        ...SAMPLE_DIAGRAMS.element_and_compound_mixture,
        id: 'matrix_mix_el_comp',
      },
      {
        ...SAMPLE_DIAGRAMS.single_argon_atom,
        id: 'd_matrix_pure_ar',
      },
      {
        ...SAMPLE_DIAGRAMS.carbon_dioxide,
        id: 'd_matrix_pure_co2',
      },
      {
        id: 'd_matrix_mix_he_ne',
        title: 'Noble Gas Mixture (He + Ne)',
        description: 'Mixture of single Helium atoms and single Neon atoms.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'He', x: 25, y: 30 }], bonds: [] },
          { id: 'g2', atoms: [{ id: 'a2', elementId: 'Ne', x: 75, y: 30 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a3', elementId: 'He', x: 30, y: 70 }], bonds: [] },
          { id: 'g4', atoms: [{ id: 'a4', elementId: 'Ne', x: 80, y: 70 }], bonds: [] },
        ],
        isAtom: true,
        isMolecule: false,
        isElement: false,
        isCompound: false,
        isPureSubstance: false,
        isMixture: true,
        stateOfMatter: 'gas',
        explanation: 'Contains two unbonded elemental gas species (Helium & Neon), making it a MIXTURE OF ELEMENTS.',
        particleCountBreakdown: '2 Helium atoms + 2 Neon atoms (Mixture of Elements)',
      },
      {
        id: 'd_matrix_mix_n2_co2',
        title: 'Industrial Exhaust (N₂ + CO₂)',
        description: 'Mixture of Nitrogen element molecules (N₂) and Carbon Dioxide compound molecules (CO₂).',
        groups: [
          {
            id: 'g1',
            atoms: [
              { id: 'a1', elementId: 'N', x: 25, y: 30 },
              { id: 'a2', elementId: 'N', x: 35, y: 30 },
            ],
            bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'triple' }],
          },
          {
            id: 'g2',
            atoms: [
              { id: 'a3', elementId: 'O', x: 55, y: 70 },
              { id: 'a4', elementId: 'C', x: 67, y: 70 },
              { id: 'a5', elementId: 'O', x: 79, y: 70 },
            ],
            bonds: [
              { atom1Id: 'a3', atom2Id: 'a4', type: 'double' },
              { atom1Id: 'a4', atom2Id: 'a5', type: 'double' },
            ],
          },
        ],
        isAtom: false,
        isMolecule: false,
        isElement: false,
        isCompound: false,
        isPureSubstance: false,
        isMixture: true,
        stateOfMatter: 'gas',
        explanation: 'Contains Nitrogen (N₂, an Element) and Carbon Dioxide (CO₂, a Compound) mixed together.',
        particleCountBreakdown: '1 N₂ Element Molecule + 1 CO₂ Compound Molecule',
      },
    ],
  },

  // LEVEL 5
  {
    id: 5,
    title: 'Physical vs. Chemical Change',
    category: 'Physical vs Chemical Change',
    difficulty: 'Advanced',
    instruction: 'Distinguish whether the particle diagram represents a PHYSICAL CHANGE (particles rearrange/mix without breaking chemical bonds) or a CHEMICAL CHANGE (bonds break and new chemical formulas form).',
    unlockedByDefault: false,
    badgeRewardId: 'reaction_alchemist',
    hint: 'Physical change: The individual chemical formulas stay 100% the same (e.g. H₂O stays H₂O). Chemical change: Chemical bonds break and re-bond into NEW formulas (e.g. H₂O splits into H₂ and O₂)!',
    dropZones: [
      {
        id: 'zone_physical',
        label: 'PHYSICAL CHANGE',
        subLabel: 'Same particle formulas throughout (mixing, phase change)',
        acceptTypes: ['physical'],
        iconName: 'ShieldCheck',
        colorTheme: 'border-cyan-500 bg-cyan-950/20 text-cyan-400',
      },
      {
        id: 'zone_chemical',
        label: 'CHEMICAL CHANGE',
        subLabel: 'Bonds break & new particle formulas form (chemical reaction)',
        acceptTypes: ['chemical'],
        iconName: 'FlaskConical',
        colorTheme: 'border-emerald-500 bg-emerald-950/20 text-emerald-400',
      },
    ],
    diagrams: [
      {
        id: 'd_water_evap_physical',
        title: 'Water Evaporating (Liquid H₂O → Water Vapor H₂O)',
        description: 'Compare the liquid water particles before heating with the vaporized particles after.',
        groups: [
          {
            id: 'g1',
            atoms: [
              { id: 'a1', elementId: 'O', x: 25, y: 25 },
              { id: 'a2', elementId: 'H', x: 18, y: 18 },
              { id: 'a3', elementId: 'H', x: 32, y: 18 },
            ],
            bonds: [
              { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
              { atom1Id: 'a1', atom2Id: 'a3', type: 'single' },
            ],
          },
          {
            id: 'g2',
            atoms: [
              { id: 'a4', elementId: 'O', x: 75, y: 70 },
              { id: 'a5', elementId: 'H', x: 68, y: 63 },
              { id: 'a6', elementId: 'H', x: 82, y: 63 },
            ],
            bonds: [
              { atom1Id: 'a4', atom2Id: 'a5', type: 'single' },
              { atom1Id: 'a4', atom2Id: 'a6', type: 'single' },
            ],
          },
        ],
        reactantsGroups: [
          {
            id: 'r1',
            atoms: [
              { id: 'ra1', elementId: 'O', x: 30, y: 70 },
              { id: 'ra2', elementId: 'H', x: 22, y: 62 },
              { id: 'ra3', elementId: 'H', x: 38, y: 62 },
            ],
            bonds: [
              { atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' },
              { atom1Id: 'ra1', atom2Id: 'ra3', type: 'single' },
            ],
          },
          {
            id: 'r2',
            atoms: [
              { id: 'ra4', elementId: 'O', x: 60, y: 75 },
              { id: 'ra5', elementId: 'H', x: 52, y: 67 },
              { id: 'ra6', elementId: 'H', x: 68, y: 67 },
            ],
            bonds: [
              { atom1Id: 'ra4', atom2Id: 'ra5', type: 'single' },
              { atom1Id: 'ra4', atom2Id: 'ra6', type: 'single' },
            ],
          },
        ],
        productsGroups: [
          {
            id: 'p1',
            atoms: [
              { id: 'pa1', elementId: 'O', x: 25, y: 25 },
              { id: 'pa2', elementId: 'H', x: 17, y: 17 },
              { id: 'pa3', elementId: 'H', x: 33, y: 17 },
            ],
            bonds: [
              { atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' },
              { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' },
            ],
          },
          {
            id: 'p2',
            atoms: [
              { id: 'pa4', elementId: 'O', x: 75, y: 75 },
              { id: 'pa5', elementId: 'H', x: 67, y: 67 },
              { id: 'pa6', elementId: 'H', x: 83, y: 67 },
            ],
            bonds: [
              { atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' },
              { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' },
            ],
          },
        ],
        reactantsLabel: 'BEFORE (Liquid H₂O)',
        productsLabel: 'AFTER (H₂O Steam)',
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        isPhysicalChange: true,
        isChemicalChange: false,
        stateOfMatter: 'gas',
        explanation: 'Water vaporizing is a PHYSICAL change. The H₂O molecules spread apart, but no intramolecular H-O covalent bonds are broken, so no new substance is created.',
        particleCountBreakdown: '2 Intact H₂O Molecules (Liquid → Gas Phase Change)',
      },
      {
        id: 'd_water_electrolysis_chemical',
        title: 'Water Electrolysis Decomposition (2 H₂O → 2 H₂ + O₂)',
        description: 'Observe how electric current breaks liquid water bonds into Hydrogen and Oxygen gas.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'H', x: 20, y: 30 }, { id: 'a2', elementId: 'H', x: 30, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }] },
          { id: 'g2', atoms: [{ id: 'a3', elementId: 'H', x: 45, y: 70 }, { id: 'a4', elementId: 'H', x: 55, y: 70 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'single' }] },
          { id: 'g3', atoms: [{ id: 'a5', elementId: 'O', x: 70, y: 35 }, { id: 'a6', elementId: 'O', x: 80, y: 35 }], bonds: [{ atom1Id: 'a5', atom2Id: 'a6', type: 'double' }] },
        ],
        reactantsGroups: [
          {
            id: 'r1',
            atoms: [
              { id: 'ra1', elementId: 'O', x: 30, y: 35 },
              { id: 'ra2', elementId: 'H', x: 22, y: 27 },
              { id: 'ra3', elementId: 'H', x: 38, y: 27 },
            ],
            bonds: [
              { atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' },
              { atom1Id: 'ra1', atom2Id: 'ra3', type: 'single' },
            ],
          },
          {
            id: 'r2',
            atoms: [
              { id: 'ra4', elementId: 'O', x: 70, y: 65 },
              { id: 'ra5', elementId: 'H', x: 62, y: 57 },
              { id: 'ra6', elementId: 'H', x: 78, y: 57 },
            ],
            bonds: [
              { atom1Id: 'ra4', atom2Id: 'ra5', type: 'single' },
              { atom1Id: 'ra4', atom2Id: 'ra6', type: 'single' },
            ],
          },
        ],
        productsGroups: [
          {
            id: 'p1',
            atoms: [
              { id: 'pa1', elementId: 'H', x: 20, y: 30 },
              { id: 'pa2', elementId: 'H', x: 30, y: 30 },
            ],
            bonds: [{ atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' }],
          },
          {
            id: 'p2',
            atoms: [
              { id: 'pa3', elementId: 'H', x: 30, y: 70 },
              { id: 'pa4', elementId: 'H', x: 40, y: 70 },
            ],
            bonds: [{ atom1Id: 'pa3', atom2Id: 'pa4', type: 'single' }],
          },
          {
            id: 'p3',
            atoms: [
              { id: 'pa5', elementId: 'O', x: 70, y: 40 },
              { id: 'pa6', elementId: 'O', x: 82, y: 40 },
            ],
            bonds: [{ atom1Id: 'pa5', atom2Id: 'pa6', type: 'double' }],
          },
        ],
        reactantsLabel: 'BEFORE (2 H₂O Molecules)',
        productsLabel: 'AFTER (2 H₂ + 1 O₂ Gases)',
        isAtom: false,
        isMolecule: true,
        isElement: true,
        isCompound: false,
        isPureSubstance: false,
        isMixture: true,
        isPhysicalChange: false,
        isChemicalChange: true,
        stateOfMatter: 'gas',
        explanation: 'Electrolysis is a CHEMICAL change. Original H-O bonds in water broke and new H-H and O-O covalent bonds formed, creating entirely new chemical substances (H₂ and O₂ gas).',
        particleCountBreakdown: '2 H₂ molecules + 1 O₂ molecule formed from 2 H₂O (Chemical Reaction)',
      },
      {
        id: 'd_mixing_argon_helium_physical',
        title: 'Mixing Helium and Argon Gases',
        description: 'Observe separated gas containers before opening the valve vs after intermixing.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'He', x: 20, y: 25 }], bonds: [] },
          { id: 'g2', atoms: [{ id: 'a2', elementId: 'Ar', x: 75, y: 30 }], bonds: [] },
          { id: 'g3', atoms: [{ id: 'a3', elementId: 'He', x: 40, y: 70 }], bonds: [] },
          { id: 'g4', atoms: [{ id: 'a4', elementId: 'Ar', x: 80, y: 75 }], bonds: [] },
        ],
        reactantsGroups: [
          { id: 'r1', atoms: [{ id: 'ra1', elementId: 'He', x: 25, y: 30 }], bonds: [] },
          { id: 'r2', atoms: [{ id: 'ra2', elementId: 'He', x: 35, y: 70 }], bonds: [] },
          { id: 'r3', atoms: [{ id: 'ra3', elementId: 'Ar', x: 75, y: 30 }], bonds: [] },
          { id: 'r4', atoms: [{ id: 'ra4', elementId: 'Ar', x: 80, y: 75 }], bonds: [] },
        ],
        productsGroups: [
          { id: 'p1', atoms: [{ id: 'pa1', elementId: 'He', x: 20, y: 25 }], bonds: [] },
          { id: 'p2', atoms: [{ id: 'pa2', elementId: 'Ar', x: 45, y: 75 }], bonds: [] },
          { id: 'p3', atoms: [{ id: 'pa3', elementId: 'He', x: 70, y: 30 }], bonds: [] },
          { id: 'p4', atoms: [{ id: 'pa4', elementId: 'Ar', x: 85, y: 70 }], bonds: [] },
        ],
        reactantsLabel: 'BEFORE (Separated He & Ar)',
        productsLabel: 'AFTER (Mixed Gas Mixture)',
        isAtom: true,
        isMolecule: false,
        isElement: false,
        isCompound: false,
        isPureSubstance: false,
        isMixture: true,
        isPhysicalChange: true,
        isChemicalChange: false,
        stateOfMatter: 'gas',
        explanation: 'Mixing gases without reaction is a PHYSICAL change. The individual He and Ar atoms freely intermix, but retain their original chemical identities.',
        particleCountBreakdown: '2 He atoms + 2 Ar atoms mixed physically (Physical Mixture)',
      },
      {
        id: 'd_methane_combustion_chemical',
        title: 'Methane Gas Combustion (CH₄ + 2 O₂ → CO₂ + 2 H₂O)',
        description: 'Observe the reactant fuel and oxygen before ignition compared to post-reaction carbon dioxide and water.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 20, y: 30 }, { id: 'a2', elementId: 'C', x: 32, y: 30 }, { id: 'a3', elementId: 'O', x: 44, y: 30 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }, { atom1Id: 'a2', atom2Id: 'a3', type: 'double' }] },
          { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 75, y: 25 }, { id: 'a5', elementId: 'H', x: 67, y: 17 }, { id: 'a6', elementId: 'H', x: 83, y: 17 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
          { id: 'g3', atoms: [{ id: 'a7', elementId: 'O', x: 60, y: 75 }, { id: 'a8', elementId: 'H', x: 52, y: 67 }, { id: 'a9', elementId: 'H', x: 68, y: 67 }], bonds: [{ atom1Id: 'a7', atom2Id: 'a8', type: 'single' }, { atom1Id: 'a7', atom2Id: 'a9', type: 'single' }] },
        ],
        reactantsGroups: [
          // CH4 (methane)
          {
            id: 'r1',
            atoms: [
              { id: 'ra1', elementId: 'C', x: 25, y: 30 },
              { id: 'ra2', elementId: 'H', x: 15, y: 30 },
              { id: 'ra3', elementId: 'H', x: 35, y: 30 },
              { id: 'ra4', elementId: 'H', x: 25, y: 18 },
              { id: 'ra5', elementId: 'H', x: 25, y: 42 },
            ],
            bonds: [
              { atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' },
              { atom1Id: 'ra1', atom2Id: 'ra3', type: 'single' },
              { atom1Id: 'ra1', atom2Id: 'ra4', type: 'single' },
              { atom1Id: 'ra1', atom2Id: 'ra5', type: 'single' },
            ],
          },
          // 2 O2
          {
            id: 'r2',
            atoms: [
              { id: 'ra6', elementId: 'O', x: 70, y: 25 },
              { id: 'ra7', elementId: 'O', x: 82, y: 25 },
            ],
            bonds: [{ atom1Id: 'ra6', atom2Id: 'ra7', type: 'double' }],
          },
          {
            id: 'r3',
            atoms: [
              { id: 'ra8', elementId: 'O', x: 70, y: 70 },
              { id: 'ra9', elementId: 'O', x: 82, y: 70 },
            ],
            bonds: [{ atom1Id: 'ra8', atom2Id: 'ra9', type: 'double' }],
          },
        ],
        productsGroups: [
          // CO2
          {
            id: 'p1',
            atoms: [
              { id: 'pa1', elementId: 'O', x: 20, y: 30 },
              { id: 'pa2', elementId: 'C', x: 32, y: 30 },
              { id: 'pa3', elementId: 'O', x: 44, y: 30 },
            ],
            bonds: [
              { atom1Id: 'pa1', atom2Id: 'pa2', type: 'double' },
              { atom1Id: 'pa2', atom2Id: 'pa3', type: 'double' },
            ],
          },
          // H2O 1
          {
            id: 'p2',
            atoms: [
              { id: 'pa4', elementId: 'O', x: 75, y: 25 },
              { id: 'pa5', elementId: 'H', x: 67, y: 17 },
              { id: 'pa6', elementId: 'H', x: 83, y: 17 },
            ],
            bonds: [
              { atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' },
              { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' },
            ],
          },
          // H2O 2
          {
            id: 'p3',
            atoms: [
              { id: 'pa7', elementId: 'O', x: 60, y: 75 },
              { id: 'pa8', elementId: 'H', x: 52, y: 67 },
              { id: 'pa9', elementId: 'H', x: 68, y: 67 },
            ],
            bonds: [
              { atom1Id: 'pa7', atom2Id: 'pa8', type: 'single' },
              { atom1Id: 'pa7', atom2Id: 'pa9', type: 'single' },
            ],
          },
        ],
        reactantsLabel: 'BEFORE (CH₄ + 2 O₂ Fuel)',
        productsLabel: 'AFTER (CO₂ + 2 H₂O Products)',
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: false,
        isMixture: true,
        isPhysicalChange: false,
        isChemicalChange: true,
        stateOfMatter: 'gas',
        explanation: 'Combustion is a CHEMICAL change. C-H and O=O bonds broke and re-bonded into CO₂ and H₂O compound molecules.',
        particleCountBreakdown: '1 CO₂ molecule + 2 H₂O molecules (Chemical Combustion Product)',
      },
      {
        id: 'd_ice_melting_physical_l5',
        title: 'Ice Cube Melting (Solid H₂O → Liquid H₂O)',
        description: 'Observe rigid crystalline ice lattice before heating vs fluid liquid water after.',
        groups: [
          {
            id: 'g1',
            atoms: [
              { id: 'a1', elementId: 'O', x: 25, y: 25 },
              { id: 'a2', elementId: 'H', x: 18, y: 18 },
              { id: 'a3', elementId: 'H', x: 32, y: 18 },
            ],
            bonds: [
              { atom1Id: 'a1', atom2Id: 'a2', type: 'single' },
              { atom1Id: 'a1', atom2Id: 'a3', type: 'single' },
            ],
          },
        ],
        reactantsGroups: [
          {
            id: 'r1',
            atoms: [
              { id: 'ra1', elementId: 'O', x: 30, y: 30 },
              { id: 'ra2', elementId: 'H', x: 22, y: 22 },
              { id: 'ra3', elementId: 'H', x: 38, y: 22 },
            ],
            bonds: [
              { atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' },
              { atom1Id: 'ra1', atom2Id: 'ra3', type: 'single' },
            ],
          },
          {
            id: 'r2',
            atoms: [
              { id: 'ra4', elementId: 'O', x: 70, y: 30 },
              { id: 'ra5', elementId: 'H', x: 62, y: 22 },
              { id: 'ra6', elementId: 'H', x: 78, y: 22 },
            ],
            bonds: [
              { atom1Id: 'ra4', atom2Id: 'ra5', type: 'single' },
              { atom1Id: 'ra4', atom2Id: 'ra6', type: 'single' },
            ],
          },
        ],
        productsGroups: [
          {
            id: 'p1',
            atoms: [
              { id: 'pa1', elementId: 'O', x: 35, y: 75 },
              { id: 'pa2', elementId: 'H', x: 27, y: 67 },
              { id: 'pa3', elementId: 'H', x: 43, y: 67 },
            ],
            bonds: [
              { atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' },
              { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' },
            ],
          },
          {
            id: 'p2',
            atoms: [
              { id: 'pa4', elementId: 'O', x: 65, y: 75 },
              { id: 'pa5', elementId: 'H', x: 57, y: 67 },
              { id: 'pa6', elementId: 'H', x: 73, y: 67 },
            ],
            bonds: [
              { atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' },
              { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' },
            ],
          },
        ],
        reactantsLabel: 'BEFORE (Solid Ice Grid)',
        productsLabel: 'AFTER (Liquid Flowing Water)',
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        isPhysicalChange: true,
        isChemicalChange: false,
        stateOfMatter: 'liquid',
        explanation: 'Melting ice is a PHYSICAL change. Solid H₂O molecules absorb heat and slip into liquid flow, but H-O chemical bonds remain intact.',
        particleCountBreakdown: '2 H₂O Molecules (Solid → Liquid Physical Phase Change)',
      },
      {
        id: 'd_ammonia_synthesis_chemical_l5',
        title: 'Haber-Bosch Ammonia Synthesis (N₂ + 3 H₂ → 2 NH₃)',
        description: 'Observe Nitrogen gas and Hydrogen gas reaction synthesizing Ammonia compound molecules.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'N', x: 30, y: 35 }, { id: 'a2', elementId: 'H', x: 20, y: 28 }, { id: 'a3', elementId: 'H', x: 40, y: 28 }, { id: 'a4', elementId: 'H', x: 30, y: 47 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a3', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a4', type: 'single' }] },
          { id: 'g2', atoms: [{ id: 'a5', elementId: 'N', x: 70, y: 65 }, { id: 'a6', elementId: 'H', x: 60, y: 58 }, { id: 'a7', elementId: 'H', x: 80, y: 58 }, { id: 'a8', elementId: 'H', x: 70, y: 77 }], bonds: [{ atom1Id: 'a5', atom2Id: 'a6', type: 'single' }, { atom1Id: 'a5', atom2Id: 'a7', type: 'single' }, { atom1Id: 'a5', atom2Id: 'a8', type: 'single' }] },
        ],
        reactantsGroups: [
          { id: 'r1', atoms: [{ id: 'ra1', elementId: 'N', x: 20, y: 30 }, { id: 'ra2', elementId: 'N', x: 32, y: 30 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'triple' }] },
          { id: 'r2', atoms: [{ id: 'ra3', elementId: 'H', x: 60, y: 25 }, { id: 'ra4', elementId: 'H', x: 70, y: 25 }], bonds: [{ atom1Id: 'ra3', atom2Id: 'ra4', type: 'single' }] },
          { id: 'r3', atoms: [{ id: 'ra5', elementId: 'H', x: 60, y: 50 }, { id: 'ra6', elementId: 'H', x: 70, y: 50 }], bonds: [{ atom1Id: 'ra5', atom2Id: 'ra6', type: 'single' }] },
          { id: 'r4', atoms: [{ id: 'ra7', elementId: 'H', x: 60, y: 75 }, { id: 'ra8', elementId: 'H', x: 70, y: 75 }], bonds: [{ atom1Id: 'ra7', atom2Id: 'ra8', type: 'single' }] },
        ],
        productsGroups: [
          {
            id: 'p1',
            atoms: [
              { id: 'pa1', elementId: 'N', x: 30, y: 35 },
              { id: 'pa2', elementId: 'H', x: 20, y: 28 },
              { id: 'pa3', elementId: 'H', x: 40, y: 28 },
              { id: 'pa4', elementId: 'H', x: 30, y: 47 },
            ],
            bonds: [
              { atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' },
              { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' },
              { atom1Id: 'pa1', atom2Id: 'pa4', type: 'single' },
            ],
          },
          {
            id: 'p2',
            atoms: [
              { id: 'pa5', elementId: 'N', x: 70, y: 65 },
              { id: 'pa6', elementId: 'H', x: 60, y: 58 },
              { id: 'pa7', elementId: 'H', x: 80, y: 58 },
              { id: 'pa8', elementId: 'H', x: 70, y: 77 },
            ],
            bonds: [
              { atom1Id: 'pa5', atom2Id: 'pa6', type: 'single' },
              { atom1Id: 'pa5', atom2Id: 'pa7', type: 'single' },
              { atom1Id: 'pa5', atom2Id: 'pa8', type: 'single' },
            ],
          },
        ],
        reactantsLabel: 'BEFORE (1 N₂ + 3 H₂ Reactants)',
        productsLabel: 'AFTER (2 NH₃ Compound Products)',
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        isPhysicalChange: false,
        isChemicalChange: true,
        stateOfMatter: 'gas',
        explanation: 'Ammonia synthesis is a CHEMICAL change. Strong triple N≡N and H-H single bonds break, forming brand new N-H covalent bonds in NH₃.',
        particleCountBreakdown: '2 NH₃ Compound Molecules formed from N₂ and 3 H₂ (Chemical Reaction)',
      },
      {
        id: 'd_oxygen_condensation_physical_l5',
        title: 'Oxygen Gas Condensation (Gas O₂ → Liquid O₂)',
        description: 'Observe oxygen gas molecules cooling down and condensing into liquid oxygen at bottom.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 25, y: 75 }, { id: 'a2', elementId: 'O', x: 35, y: 75 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'double' }] },
          { id: 'g2', atoms: [{ id: 'a3', elementId: 'O', x: 65, y: 75 }, { id: 'a4', elementId: 'O', x: 75, y: 75 }], bonds: [{ atom1Id: 'a3', atom2Id: 'a4', type: 'double' }] },
        ],
        reactantsGroups: [
          { id: 'r1', atoms: [{ id: 'ra1', elementId: 'O', x: 25, y: 25 }, { id: 'ra2', elementId: 'O', x: 35, y: 25 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'double' }] },
          { id: 'r2', atoms: [{ id: 'ra3', elementId: 'O', x: 70, y: 65 }, { id: 'ra4', elementId: 'O', x: 80, y: 65 }], bonds: [{ atom1Id: 'ra3', atom2Id: 'ra4', type: 'double' }] },
        ],
        productsGroups: [
          { id: 'p1', atoms: [{ id: 'pa1', elementId: 'O', x: 30, y: 80 }, { id: 'pa2', elementId: 'O', x: 40, y: 80 }], bonds: [{ atom1Id: 'pa1', atom2Id: 'pa2', type: 'double' }] },
          { id: 'p2', atoms: [{ id: 'pa3', elementId: 'O', x: 60, y: 80 }, { id: 'pa4', elementId: 'O', x: 70, y: 80 }], bonds: [{ atom1Id: 'pa3', atom2Id: 'pa4', type: 'double' }] },
        ],
        reactantsLabel: 'BEFORE (Gas Phase O₂)',
        productsLabel: 'AFTER (Liquid Phase O₂)',
        isAtom: false,
        isMolecule: true,
        isElement: true,
        isCompound: false,
        isPureSubstance: true,
        isMixture: false,
        isPhysicalChange: true,
        isChemicalChange: false,
        stateOfMatter: 'liquid',
        explanation: 'Condensing gas into liquid is a PHYSICAL change. The O₂ diatomic molecules remain chemically identical throughout.',
        particleCountBreakdown: '2 O₂ Molecules (Gas → Liquid Condensation)',
      },
      {
        id: 'd_water_synthesis_chemical_l5',
        title: 'Explosive Synthesis of Water (2 H₂ + O₂ → 2 H₂O)',
        description: 'Observe Hydrogen and Oxygen gases reacting chemically to produce Water vapor.',
        groups: [
          { id: 'g1', atoms: [{ id: 'a1', elementId: 'O', x: 30, y: 35 }, { id: 'a2', elementId: 'H', x: 22, y: 27 }, { id: 'a3', elementId: 'H', x: 38, y: 27 }], bonds: [{ atom1Id: 'a1', atom2Id: 'a2', type: 'single' }, { atom1Id: 'a1', atom2Id: 'a3', type: 'single' }] },
          { id: 'g2', atoms: [{ id: 'a4', elementId: 'O', x: 70, y: 65 }, { id: 'a5', elementId: 'H', x: 62, y: 57 }, { id: 'a6', elementId: 'H', x: 78, y: 57 }], bonds: [{ atom1Id: 'a4', atom2Id: 'a5', type: 'single' }, { atom1Id: 'a4', atom2Id: 'a6', type: 'single' }] },
        ],
        reactantsGroups: [
          { id: 'r1', atoms: [{ id: 'ra1', elementId: 'H', x: 20, y: 30 }, { id: 'ra2', elementId: 'H', x: 30, y: 30 }], bonds: [{ atom1Id: 'ra1', atom2Id: 'ra2', type: 'single' }] },
          { id: 'r2', atoms: [{ id: 'ra3', elementId: 'H', x: 30, y: 70 }, { id: 'ra4', elementId: 'H', x: 40, y: 70 }], bonds: [{ atom1Id: 'ra3', atom2Id: 'ra4', type: 'single' }] },
          { id: 'r3', atoms: [{ id: 'ra5', elementId: 'O', x: 70, y: 45 }, { id: 'ra6', elementId: 'O', x: 82, y: 45 }], bonds: [{ atom1Id: 'ra5', atom2Id: 'ra6', type: 'double' }] },
        ],
        productsGroups: [
          {
            id: 'p1',
            atoms: [
              { id: 'pa1', elementId: 'O', x: 30, y: 35 },
              { id: 'pa2', elementId: 'H', x: 22, y: 27 },
              { id: 'pa3', elementId: 'H', x: 38, y: 27 },
            ],
            bonds: [
              { atom1Id: 'pa1', atom2Id: 'pa2', type: 'single' },
              { atom1Id: 'pa1', atom2Id: 'pa3', type: 'single' },
            ],
          },
          {
            id: 'p2',
            atoms: [
              { id: 'pa4', elementId: 'O', x: 70, y: 65 },
              { id: 'pa5', elementId: 'H', x: 62, y: 57 },
              { id: 'pa6', elementId: 'H', x: 78, y: 57 },
            ],
            bonds: [
              { atom1Id: 'pa4', atom2Id: 'pa5', type: 'single' },
              { atom1Id: 'pa4', atom2Id: 'pa6', type: 'single' },
            ],
          },
        ],
        reactantsLabel: 'BEFORE (2 H₂ + 1 O₂ Gas Mixture)',
        productsLabel: 'AFTER (2 H₂O Compound Molecules)',
        isAtom: false,
        isMolecule: true,
        isElement: false,
        isCompound: true,
        isPureSubstance: true,
        isMixture: false,
        isPhysicalChange: false,
        isChemicalChange: true,
        stateOfMatter: 'gas',
        explanation: 'Water synthesis is a CHEMICAL change. Elemental H-H and O=O bonds broke and formed brand new H₂O compound molecules.',
        particleCountBreakdown: '2 H₂O Molecules formed from 2 H₂ + O₂ (Chemical Synthesis)',
      },
    ],
  },
];
