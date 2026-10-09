import React, { useState, useEffect } from 'react';
import { GameLevel, ParticleDiagram, DropZone } from '../types';
import { ParticleDiagramCanvas } from './ParticleDiagramCanvas';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Award,
  Circle,
  Link,
  FlaskConical,
  Layers,
  Box,
  Droplets,
  Wind,
  Atom
} from 'lucide-react';

interface LevelBoardProps {
  level: GameLevel;
  onLevelComplete: (levelId: number, stars: number, score: number) => void;
  onNextLevel?: () => void;
  onRestart: () => void;
  userStreak: number;
  setUserStreak: React.Dispatch<React.SetStateAction<number>>;
}

export const LevelBoard: React.FC<LevelBoardProps> = ({
  level,
  onLevelComplete,
  onNextLevel,
  onRestart,
  userStreak,
  setUserStreak,
}) => {
  // Mapping of diagrams to dropzone IDs placed by user
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedDiagramId, setSelectedDiagramId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintUsedCount, setHintUsedCount] = useState<number>(0);
  const [evaluationResult, setEvaluationResult] = useState<{
    submitted: boolean;
    isAllCorrect: boolean;
    correctCount: number;
    totalCount: number;
    score: number;
    stars: number;
    feedbackMap: Record<string, boolean>; // diagramId -> boolean correct
  } | null>(null);

  // Active diagram list
  const [remainingDiagrams, setRemainingDiagrams] = useState<ParticleDiagram[]>(level.diagrams);

  useEffect(() => {
    setPlacements({});
    setSelectedDiagramId(null);
    setShowHint(false);
    setEvaluationResult(null);
    setRemainingDiagrams(level.diagrams);
  }, [level]);

  // Handle dropping or placing a diagram into a bin
  const handleAssignToZone = (diagramId: string, zoneId: string) => {
    if (evaluationResult?.submitted) return;

    setPlacements((prev) => ({
      ...prev,
      [diagramId]: zoneId,
    }));
    setSelectedDiagramId(null);
  };

  const handleUnassign = (diagramId: string) => {
    if (evaluationResult?.submitted) return;
    setPlacements((prev) => {
      const copy = { ...prev };
      delete copy[diagramId];
      return copy;
    });
  };

  // Evaluate Level Answers
  const handleSubmit = () => {
    let correctCount = 0;
    const totalCount = level.diagrams.length;
    const feedbackMap: Record<string, boolean> = {};

    level.diagrams.forEach((diag) => {
      const placedZoneId = placements[diag.id];
      if (!placedZoneId) {
        feedbackMap[diag.id] = false;
        return;
      }

      // Check against acceptance logic
      let isCorrect = false;

      if (level.category === 'Atom vs Molecule') {
        if (placedZoneId === 'zone_atom' && diag.isAtom) isCorrect = true;
        if (placedZoneId === 'zone_molecule' && diag.isMolecule) isCorrect = true;
      } else if (level.category === 'Element vs Compound') {
        if (placedZoneId === 'zone_element' && diag.isElement) isCorrect = true;
        if (placedZoneId === 'zone_compound' && diag.isCompound) isCorrect = true;
      } else if (level.category === 'Pure vs Mixture') {
        if (placedZoneId === 'zone_pure' && diag.isPureSubstance) isCorrect = true;
        if (placedZoneId === 'zone_mixture' && diag.isMixture) isCorrect = true;
      } else if (level.category === 'Matter Matrix') {
        if (placedZoneId === 'zone_pure_element' && diag.isPureSubstance && diag.isElement) isCorrect = true;
        if (placedZoneId === 'zone_pure_compound' && diag.isPureSubstance && diag.isCompound) isCorrect = true;
        if (placedZoneId === 'zone_mix_elements' && diag.isMixture && !diag.isCompound) isCorrect = true;
        if (placedZoneId === 'zone_mix_element_compound' && diag.isMixture) isCorrect = true;
      } else if (level.category === 'Physical vs Chemical Change') {
        if (placedZoneId === 'zone_physical' && diag.isPhysicalChange) isCorrect = true;
        if (placedZoneId === 'zone_chemical' && diag.isChemicalChange) isCorrect = true;
      }

      feedbackMap[diag.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    const isAllCorrect = correctCount === totalCount;

    // Calculate score & stars
    let stars = 1;
    if (correctCount === totalCount) {
      stars = hintUsedCount === 0 ? 3 : 2;
    } else if (correctCount >= totalCount / 2) {
      stars = 2;
    }

    const baseScore = correctCount * 250;
    const streakBonus = userStreak * 50;
    const hintPenalty = hintUsedCount * 50;
    const totalScore = Math.max(100, baseScore + streakBonus - hintPenalty);

    if (isAllCorrect) {
      setUserStreak((prev) => prev + 1);
    } else {
      setUserStreak(0);
    }

    setEvaluationResult({
      submitted: true,
      isAllCorrect,
      correctCount,
      totalCount,
      score: totalScore,
      stars,
      feedbackMap,
    });

    onLevelComplete(level.id, stars, totalScore);
  };

  // Helper icon lookup
  const renderZoneIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Circle':
        return <Circle className="w-5 h-5" />;
      case 'Link':
        return <Link className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Box':
        return <Box className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      default:
        return <Atom className="w-5 h-5" />;
    }
  };

  const allAssigned = level.diagrams.every((d) => placements[d.id]);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 py-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50">
              Level {level.id} • {level.category}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {level.difficulty}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{level.title}</h2>
          <p className="text-sm text-slate-400 mt-1">{level.instruction}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-400 text-sm font-semibold">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{userStreak} Streak</span>
          </div>

          {/* Hint Button */}
          <button
            onClick={() => {
              setShowHint(true);
              setHintUsedCount((c) => c + 1);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors border border-slate-700 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Hint</span>
          </button>

          {/* Restart */}
          <button
            onClick={() => {
              setPlacements({});
              setEvaluationResult(null);
              setSelectedDiagramId(null);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            title="Reset Placements"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hint Alert Drawer */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-cyan-950/60 border border-cyan-800/60 rounded-2xl p-4 text-cyan-200 text-sm flex items-start gap-3 shadow-lg"
          >
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold text-cyan-300 block mb-0.5">Particle Teacher Tip:</span>
              <p>{level.hint}</p>
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="text-cyan-400 hover:text-white text-xs font-semibold px-2 py-1 bg-cyan-900/60 rounded-lg border border-cyan-700 cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unassigned Diagrams Shelf */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Unassigned Particle Diagrams ({level.diagrams.filter((d) => !placements[d.id]).length})</span>
          </h3>
          <span className="text-xs text-slate-400">
            Tap a diagram, then tap a classification bin below to place it!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {level.diagrams.map((diag) => {
            const isAssigned = !!placements[diag.id];
            if (isAssigned) return null;

            const isSelected = selectedDiagramId === diag.id;

            return (
              <motion.div
                key={diag.id}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDiagramId(isSelected ? null : diag.id)}
                className={`relative flex flex-col bg-slate-950 rounded-xl p-3 border-2 cursor-pointer transition-all shadow-md ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/20 bg-slate-900'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-200 line-clamp-1">{diag.title}</span>
                  {isSelected && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                      SELECTED
                    </span>
                  )}
                </div>

                <div className="flex justify-center my-1">
                  <ParticleDiagramCanvas diagram={diag} width={220} height={160} showLegend={true} />
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <p className="line-clamp-2">{diag.description}</p>
                </div>
              </motion.div>
            );
          })}

          {level.diagrams.every((d) => placements[d.id]) && (
            <div className="col-span-full py-6 text-center text-slate-400 text-sm bg-slate-950/40 rounded-xl border border-dashed border-slate-800 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>All particle diagrams have been classified! Click <strong>Submit Answers</strong> below.</span>
            </div>
          )}
        </div>
      </div>

      {/* Drop Zones (Classification Bins) */}
      <div className={`grid grid-cols-1 ${level.dropZones.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : level.dropZones.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-5`}>
        {level.dropZones.map((zone) => {
          // Diagrams currently placed in this zone
          const assignedDiagrams = level.diagrams.filter((d) => placements[d.id] === zone.id);

          return (
            <div
              key={zone.id}
              onClick={() => {
                if (selectedDiagramId) {
                  handleAssignToZone(selectedDiagramId, zone.id);
                }
              }}
              className={`flex flex-col bg-slate-900/90 border-2 rounded-2xl p-4 min-h-[300px] transition-all relative ${zone.colorTheme} ${
                selectedDiagramId ? 'hover:border-amber-400/80 cursor-pointer' : ''
              }`}
            >
              {/* Zone Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-800/80">{renderZoneIcon(zone.iconName)}</div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-base">{zone.label}</h4>
                    {zone.subLabel && <p className="text-[11px] text-slate-400">{zone.subLabel}</p>}
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  {assignedDiagrams.length}
                </span>
              </div>

              {/* Placed Items List */}
              <div className="flex-1 flex flex-col gap-3">
                {assignedDiagrams.map((diag) => {
                  const isCorrect = evaluationResult?.feedbackMap[diag.id];

                  return (
                    <motion.div
                      key={diag.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`relative bg-slate-950 rounded-xl p-3 border-2 shadow-md flex flex-col ${
                        evaluationResult?.submitted
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-950/20 ring-2 ring-emerald-500/30'
                            : 'border-rose-500 bg-rose-950/20 ring-2 ring-rose-500/30'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-200">{diag.title}</span>
                        {!evaluationResult?.submitted ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnassign(diag.id);
                            }}
                            className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Remove from bin"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        ) : isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                        )}
                      </div>

                      <div className="flex justify-center">
                        <ParticleDiagramCanvas diagram={diag} width={200} height={140} showLegend={false} />
                      </div>

                      {/* Explanation box on submitted answer */}
                      {evaluationResult?.submitted && (
                        <div
                          className={`mt-2.5 p-2.5 rounded-lg text-xs border ${
                            isCorrect
                              ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
                              : 'bg-rose-950/40 border-rose-800/40 text-rose-200'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                          <p>{diag.explanation}</p>
                          <p className="mt-1 font-mono text-[10px] opacity-80">{diag.particleCountBreakdown}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {assignedDiagrams.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800/80 rounded-xl text-slate-500 text-xs gap-2">
                    <p>
                      {selectedDiagramId
                        ? 'Tap here to assign selected diagram'
                        : 'Select a particle diagram above and drop it here'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="text-sm text-slate-400">
          Progress: <strong className="text-white">{Object.keys(placements).length}</strong> of{' '}
          <strong className="text-white">{level.diagrams.length}</strong> classified
        </div>

        {!evaluationResult?.submitted ? (
          <button
            disabled={!allAssigned}
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all cursor-pointer ${
              allAssigned
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-900/30 ring-2 ring-emerald-400/20'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <span>Submit Answers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEvaluationResult(null);
                setPlacements({});
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 cursor-pointer"
            >
              Try Again
            </button>

            {onNextLevel && (
              <button
                onClick={onNextLevel}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-900/30 cursor-pointer"
              >
                <span>Next Level</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Evaluation Results Banner */}
      {evaluationResult?.submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-6 border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 ${
            evaluationResult.isAllCorrect
              ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border-emerald-500/50 text-emerald-100'
              : 'bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 border-amber-500/50 text-amber-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-2xl ${
                evaluationResult.isAllCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              <Award className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-extrabold tracking-tight">
                  {evaluationResult.isAllCorrect ? 'Flawless Particle Classification!' : 'Good Effort! Keep Practicing'}
                </h3>
                {/* Stars display */}
                <div className="flex gap-1 ml-2">
                  {[1, 2, 3].map((s) => (
                    <Sparkles
                      key={s}
                      className={`w-5 h-5 ${
                        s <= evaluationResult.stars
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm opacity-90">
                You correctly classified <strong>{evaluationResult.correctCount}</strong> out of{' '}
                <strong>{evaluationResult.totalCount}</strong> particle diagrams. Earned +{evaluationResult.score} XP!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
