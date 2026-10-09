import React, { useState, useEffect } from 'react';
import { GAME_LEVELS } from './data/levelsData';
import { INITIAL_BADGES } from './data/badgesData';
import { GameLevel, UserProgress, Badge } from './types';
import { LevelBoard } from './components/LevelBoard';
import { StatesOfMatterLab } from './components/StatesOfMatterLab';
import { AdvancedChallengeLab } from './components/AdvancedChallengeLab';
import { ParticleCheatSheet } from './components/ParticleCheatSheet';
import { BadgesDrawer } from './components/BadgesDrawer';
import { AiTutorModal } from './components/AiTutorModal';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Thermometer,
  BookOpen,
  Award,
  Bot,
  Sparkles,
  Zap,
  CheckCircle2,
  Trophy,
  Atom,
  FileText,
  Download
} from 'lucide-react';
import { generateAndDownloadWordDoc } from './lib/exportDocx';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'levels' | 'challenge' | 'states' | 'guide' | 'badges' | 'tutor'
  >('levels');

  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(1);

  // Persistence State
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('particle_lab_progress_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      completedLevelIds: [],
      levelStars: {},
      levelHighScores: {},
      unlockedBadgeIds: [],
      totalScore: 0,
      currentStreak: 0,
      highestStreak: 0,
      builtMoleculesCount: 0,
    };
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    return INITIAL_BADGES.map((b) => ({
      ...b,
      unlocked: userProgress.unlockedBadgeIds.includes(b.id),
    }));
  });

  const [userStreak, setUserStreak] = useState<number>(userProgress.currentStreak);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);
  const [isExportingDocx, setIsExportingDocx] = useState(false);

  // Sync progress to localStorage
  useEffect(() => {
    localStorage.setItem('particle_lab_progress_v1', JSON.stringify(userProgress));
  }, [userProgress]);

  // Check & Unlock Badges
  const checkAndUnlockBadges = (
    updatedProgress: UserProgress,
    completedLevelId?: number,
    stars?: number
  ) => {
    let unlockedAny = false;

    setBadges((prevBadges) => {
      const updatedBadges = prevBadges.map((badge) => {
        if (badge.unlocked) return badge;

        let shouldUnlock = false;

        if (badge.id === 'atom_apprentice' && updatedProgress.completedLevelIds.includes(1)) {
          shouldUnlock = true;
        } else if (badge.id === 'elemental_explorer' && updatedProgress.completedLevelIds.includes(2)) {
          shouldUnlock = true;
        } else if (badge.id === 'compound_chemist' && (stars === 3 || updatedProgress.completedLevelIds.includes(4))) {
          shouldUnlock = true;
        } else if (badge.id === 'purity_inspector' && updatedProgress.completedLevelIds.includes(3)) {
          shouldUnlock = true;
        } else if (badge.id === 'matter_matrix_master' && updatedProgress.completedLevelIds.includes(4)) {
          shouldUnlock = true;
        } else if (badge.id === 'state_shifter' && updatedProgress.completedLevelIds.includes(5)) {
          shouldUnlock = true;
        } else if (badge.id === 'perfect_streak' && userStreak >= 5) {
          shouldUnlock = true;
        } else if (
          badge.id === 'grandmaster_chemist' &&
          Object.values(updatedProgress.levelStars).filter((s) => s === 3).length >= GAME_LEVELS.length
        ) {
          shouldUnlock = true;
        } else if (badge.id === 'kinetic_thermalist') {
          shouldUnlock = true;
        }

        if (shouldUnlock) {
          unlockedAny = true;
          setNewlyUnlockedBadge(badge);
          setTimeout(() => setNewlyUnlockedBadge(null), 4000);
          return { ...badge, unlocked: true, unlockedAt: new Date().toLocaleDateString() };
        }
        return badge;
      });

      if (unlockedAny) {
        setUserProgress((p) => ({
          ...p,
          unlockedBadgeIds: updatedBadges.filter((b) => b.unlocked).map((b) => b.id),
        }));
      }

      return updatedBadges;
    });
  };

  const handleLevelComplete = (levelId: number, stars: number, score: number) => {
    setUserProgress((prev) => {
      const newCompleted = Array.from(new Set([...prev.completedLevelIds, levelId]));
      const newStars = { ...prev.levelStars, [levelId]: Math.max(prev.levelStars[levelId] || 0, stars) };
      const newScores = { ...prev.levelHighScores, [levelId]: Math.max(prev.levelHighScores[levelId] || 0, score) };
      const newTotalScore = prev.totalScore + score;

      const nextProg: UserProgress = {
        ...prev,
        completedLevelIds: newCompleted,
        levelStars: newStars,
        levelHighScores: newScores,
        totalScore: newTotalScore,
        currentStreak: userStreak + 1,
        highestStreak: Math.max(prev.highestStreak, userStreak + 1),
      };

      checkAndUnlockBadges(nextProg, levelId, stars);
      return nextProg;
    });
  };

  const activeLevel = GAME_LEVELS.find((l) => l.id === selectedLevelId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Toast Notification for Badge Unlock */}
      <AnimatePresence>
        {newlyUnlockedBadge && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-amber-300"
          >
            <Trophy className="w-8 h-8 fill-slate-950" />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest block opacity-80">
                NEW REWARD BADGE UNLOCKED!
              </span>
              <h4 className="text-base font-extrabold">{newlyUnlockedBadge.title}</h4>
              <p className="text-xs opacity-90">{newlyUnlockedBadge.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-900/40">
              <Atom className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>Particle Chemistry Lab</span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Interactive Particle Diagrams & Gamified Matter Classification
              </p>
            </div>
          </div>

          {/* User Score & Badges Quick Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                try {
                  setIsExportingDocx(true);
                  await generateAndDownloadWordDoc();
                } catch (e) {
                  console.error(e);
                } finally {
                  setIsExportingDocx(false);
                }
              }}
              disabled={isExportingDocx}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-800/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50"
              title="Download Complete Source Code in Microsoft Word (.docx) Format"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">{isExportingDocx ? 'Generating Word Doc...' : 'Export Code (.docx)'}</span>
              <Download className="w-3.5 h-3.5 opacity-80" />
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">{userProgress.totalScore} XP</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-400 text-xs font-semibold">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{userStreak} Streak</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('levels')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'levels'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Challenge Levels</span>
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'challenge'
                ? 'border-amber-400 text-amber-400 bg-amber-950/20 font-extrabold'
                : 'border-transparent text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Mastery Arena</span>
          </button>

          <button
            onClick={() => setActiveTab('states')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'states'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            <span>States Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Concept Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'badges'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Badges ({badges.filter((b) => b.unlocked).length}/{badges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tutor')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'tutor'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask Dr. Atom</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 py-6">
        {activeTab === 'levels' && (
          <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4">
            {/* Level Selector Drawer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Select Level Challenge</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {GAME_LEVELS.map((lvl) => {
                  const isCompleted = userProgress.completedLevelIds.includes(lvl.id);
                  const stars = userProgress.levelStars[lvl.id] || 0;
                  const isSelected = selectedLevelId === lvl.id;

                  return (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedLevelId(lvl.id)}
                      className={`flex flex-col justify-between p-3.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 ring-4 ring-cyan-400/20'
                          : isCompleted
                          ? 'border-slate-800 bg-slate-950 hover:border-slate-700'
                          : 'border-slate-800/80 bg-slate-950/80 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-slate-400">Level {lvl.id}</span>
                          {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{lvl.title}</h4>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/80">
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map((s) => (
                            <Sparkles
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500">{lvl.difficulty}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Level View */}
            {activeLevel ? (
              <LevelBoard
                key={activeLevel.id}
                level={activeLevel}
                onLevelComplete={handleLevelComplete}
                onNextLevel={() => {
                  if (selectedLevelId && selectedLevelId < GAME_LEVELS.length) {
                    setSelectedLevelId(selectedLevelId + 1);
                  }
                }}
                onRestart={() => {
                  setSelectedLevelId(activeLevel.id);
                }}
                userStreak={userStreak}
                setUserStreak={setUserStreak}
              />
            ) : (
              <div className="text-center py-12 text-slate-500">Select a level above to begin!</div>
            )}
          </div>
        )}

        {activeTab === 'challenge' && <AdvancedChallengeLab />}

        {activeTab === 'states' && <StatesOfMatterLab />}

        {activeTab === 'guide' && <ParticleCheatSheet />}

        {activeTab === 'badges' && <BadgesDrawer badges={badges} progress={userProgress} />}

        {activeTab === 'tutor' && <AiTutorModal />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-600">
        Particle Chemistry Lab • Interactive Drag-and-Drop Classification Engine for High School Chemistry
      </footer>
    </div>
  );
}
