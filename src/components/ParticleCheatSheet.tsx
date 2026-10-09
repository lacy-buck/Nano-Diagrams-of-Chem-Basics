import React, { useState } from 'react';
import { SAMPLE_DIAGRAMS } from '../data/levelsData';
import { ParticleDiagramCanvas } from './ParticleDiagramCanvas';
import { BookOpen, Sparkles, Check, HelpCircle, Lightbulb } from 'lucide-react';

export const ParticleCheatSheet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'atom_mol' | 'el_comp' | 'pure_mix' | 'states'>('atom_mol');

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Chemistry Guide</span>
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Particle Diagram Cheat Sheet & Concepts</h2>
        <p className="text-sm text-slate-400 mt-1">
          Review core definitions, visual rules, and side-by-side particle diagrams to master chemistry fundamentals!
        </p>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 mt-6 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('atom_mol')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'atom_mol'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Atom vs. Molecule
          </button>
          <button
            onClick={() => setActiveTab('el_comp')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'el_comp'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Element vs. Compound
          </button>
          <button
            onClick={() => setActiveTab('pure_mix')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pure_mix'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Pure Substance vs. Mixture
          </button>
          <button
            onClick={() => setActiveTab('states')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'states'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. States of Matter
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'atom_mol' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ATOM */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 mb-2 inline-block">
                    SINGLE PARTICLE
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Atom</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    An <strong>Atom</strong> is the fundamental building block of matter. In particle diagrams, an atom is drawn as a <strong>single, isolated sphere</strong> with no bond lines connecting it to other spheres.
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.single_helium_atom} width={280} height={180} />
                </div>
              </div>

              {/* MOLECULE */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-950 text-purple-400 mb-2 inline-block">
                    BONDED GROUP
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Molecule</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    A <strong>Molecule</strong> consists of <strong>two or more atoms</strong> chemically joined together by covalent bonds. In diagrams, look for bond lines connecting spheres or touching/overlapping atom circles!
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.oxygen_diatomic} width={280} height={180} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'el_comp' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ELEMENT */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 mb-2 inline-block">
                    UNIFORM ATOM SPECIES
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Element</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    An <strong>Element</strong> is made of only <strong>ONE type/color of atom</strong> throughout. Elements can exist as single atoms (e.g. He) OR as diatomic molecules (e.g. O₂, N₂)!
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.nitrogen_diatomic} width={280} height={180} />
                </div>
              </div>

              {/* COMPOUND */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-950 text-amber-400 mb-2 inline-block">
                    MULTI-ELEMENT BOND
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Compound</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    A <strong>Compound</strong> consists of <strong>two or more DIFFERENT element types</strong> chemically bonded in fixed ratios (e.g. H₂O, CO₂). Look for multiple distinct sphere colors joined together!
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.water_vapor} width={280} height={180} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pure_mix' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PURE SUBSTANCE */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-950 text-blue-400 mb-2 inline-block">
                    100% IDENTICAL FORMULAS
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Pure Substance</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    A sample is a <strong>Pure Substance</strong> if <strong>EVERY particle group in the container is 100% identical</strong>. A pure substance can be a Pure Element OR a Pure Compound!
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.carbon_dioxide} width={280} height={180} />
                </div>
              </div>

              {/* MIXTURE */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-950 text-rose-400 mb-2 inline-block">
                    PHYSICAL BLEND
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">Mixture</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    A <strong>Mixture</strong> contains <strong>two or more DIFFERENT particle species physically present together</strong>. They are NOT chemically bonded to each other and can be separated by physical methods!
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.air_mixture} width={280} height={180} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'states' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* SOLID */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-indigo-400 mb-1">Solid</h3>
                  <p className="text-xs text-slate-300 mb-3">
                    Fixed shape & volume. Particles ordered in rigid repeating lattice, vibrating in place.
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.solid_ice_crystal} width={220} height={150} />
                </div>
              </div>

              {/* LIQUID */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-sky-400 mb-1">Liquid</h3>
                  <p className="text-xs text-slate-300 mb-3">
                    Fixed volume, variable shape. Particles closely packed but disordered, sliding fluidly.
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.liquid_water_state} width={220} height={150} />
                </div>
              </div>

              {/* GAS */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-orange-400 mb-1">Gas</h3>
                  <p className="text-xs text-slate-300 mb-3">
                    Variable shape & volume. High kinetic energy, particles spread far apart flying in straight lines.
                  </p>
                </div>
                <div className="flex justify-center">
                  <ParticleDiagramCanvas diagram={SAMPLE_DIAGRAMS.gas_state_sample} width={220} height={150} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
