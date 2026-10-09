import React, { useState } from 'react';
import { ParticleDiagramCanvas } from './ParticleDiagramCanvas';
import { getSubstancePhaseDiagram } from '../data/levelsData';
import { Thermometer, Flame, Snowflake, Gauge } from 'lucide-react';

export const StatesOfMatterLab: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(200); // Kelvin
  const [selectedElement, setSelectedElement] = useState<'water' | 'argon' | 'oxygen' | 'iron'>('water');

  // Determine current phase based on temperature
  let currentPhase: 'solid' | 'liquid' | 'gas' = 'solid';
  let phaseName = 'Solid Phase';
  let phaseDesc = 'Particles packed tightly in fixed positions. Vibrate in place with strong intermolecular attraction.';

  if (selectedElement === 'water') {
    if (temperature < 273) {
      currentPhase = 'solid';
      phaseName = 'Solid Phase (Ice Grid)';
      phaseDesc = 'Fixed shape and fixed volume. Water molecules form a rigid crystalline structure with hexagonal packing.';
    } else if (temperature < 373) {
      currentPhase = 'liquid';
      phaseName = 'Liquid Phase (Flowing Water)';
      phaseDesc = 'Indefinite shape (takes container form) and fixed volume. H₂O molecules slip and slide past each other.';
    } else {
      currentPhase = 'gas';
      phaseName = 'Gas Phase (Steam)';
      phaseDesc = 'Indefinite shape and indefinite volume. High kinetic energy, H₂O molecules fly freely and fill space.';
    }
  } else if (selectedElement === 'argon') {
    if (temperature < 84) {
      currentPhase = 'solid';
      phaseName = 'Solid Argon (Ar)';
      phaseDesc = 'Rigid, closely-packed solid lattice of individual noble argon atoms.';
    } else if (temperature < 87) {
      currentPhase = 'liquid';
      phaseName = 'Liquid Argon (Ar)';
      phaseDesc = 'Flowing liquid noble gas state where Ar atoms slide past each other near the bottom.';
    } else {
      currentPhase = 'gas';
      phaseName = 'Gas Argon (Ar)';
      phaseDesc = 'Independent monoatomic argon atoms rapidly bouncing around the beaker.';
    }
  } else if (selectedElement === 'oxygen') {
    if (temperature < 54) {
      currentPhase = 'solid';
      phaseName = 'Solid Oxygen (O₂)';
      phaseDesc = 'Crystalline arrangement of diatomic oxygen molecules frozen in position.';
    } else if (temperature < 90) {
      currentPhase = 'liquid';
      phaseName = 'Liquid Oxygen (O₂)';
      phaseDesc = 'Pale blue liquid state where O₂ double-bonded pairs slide smoothly past one another.';
    } else {
      currentPhase = 'gas';
      phaseName = 'Gas Oxygen (O₂)';
      phaseDesc = 'Diatomic oxygen molecules zipping rapidly throughout the container.';
    }
  } else if (selectedElement === 'iron') {
    if (temperature < 1811) {
      currentPhase = 'solid';
      phaseName = 'Solid Iron Metal (Fe)';
      phaseDesc = 'Dense metallic crystalline lattice with strong metallic bonds keeping Fe atoms vibrating in place.';
    } else if (temperature < 3134) {
      currentPhase = 'liquid';
      phaseName = 'Molten Liquid Iron (Fe)';
      phaseDesc = 'Extremely hot molten liquid metal where Fe atoms slip past each other.';
    } else {
      currentPhase = 'gas';
      phaseName = 'Iron Vapor (Fe)';
      phaseDesc = 'Gaseous iron atoms moving at high speeds.';
    }
  }

  // Choose appropriate diagram matching substance and phase
  const activeDiagram = getSubstancePhaseDiagram(selectedElement, currentPhase);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 py-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-950 text-orange-400 border border-orange-800/50 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span>Kinetic Thermal Simulator</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">States of Matter Particle Motion</h2>
            <p className="text-sm text-slate-400 mt-1">
              Adjust thermal kinetic energy to observe how heating and cooling alters particle spacing, order, and kinetic movement!
            </p>
          </div>

          {/* Substance selector */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedElement('water')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedElement === 'water'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Water (H₂O)
            </button>
            <button
              onClick={() => setSelectedElement('argon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedElement === 'argon'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Argon (Ar)
            </button>
            <button
              onClick={() => setSelectedElement('oxygen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedElement === 'oxygen'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Oxygen (O₂)
            </button>
            <button
              onClick={() => setSelectedElement('iron')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedElement === 'iron'
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Iron (Fe)
            </button>
          </div>
        </div>

        {/* Interactive Controls & Canvas split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Temperature Slider Panel */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Temperature Control</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-cyan-400 font-mono">{temperature} K</span>
                <span className="text-xs text-slate-400 block font-mono">({temperature - 273}°C)</span>
              </div>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-3">
              <Snowflake className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="range"
                min={10}
                max={500}
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <Flame className="w-5 h-5 text-orange-500 shrink-0" />
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTemperature(100)}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>Cool (100 K)</span>
              </button>
              <button
                onClick={() => setTemperature(300)}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-300 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>Room (300 K)</span>
              </button>
              <button
                onClick={() => setTemperature(450)}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-orange-300 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Heat (450 K)</span>
              </button>
            </div>

            {/* Phase info box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1">
                Active Phase Properties
              </span>
              <h4 className="text-base font-bold text-white mb-1">{phaseName}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{phaseDesc}</p>
            </div>
          </div>

          {/* Dynamic Canvas Simulation */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <ParticleDiagramCanvas
              diagram={activeDiagram}
              width={500}
              height={320}
              temperatureKelvin={temperature}
              customParticleState={currentPhase}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
