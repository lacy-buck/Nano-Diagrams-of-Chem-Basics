import React from 'react';
import { Badge, UserProgress } from '../types';
import {
  Award,
  Lock,
  CheckCircle2,
  Trophy,
  Zap,
  Sparkles,
  Atom,
  FlaskConical,
  ShieldCheck,
  Grid,
  Thermometer,
  Flame,
  Filter,
  Boxes
} from 'lucide-react';

interface BadgesDrawerProps {
  badges: Badge[];
  progress: UserProgress;
}

export const BadgesDrawer: React.FC<BadgesDrawerProps> = ({ badges, progress }) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalBadges = badges.length;
  const percentage = Math.round((unlockedCount / totalBadges) * 100);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6 text-purple-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      case 'Grid':
        return <Grid className="w-6 h-6 text-emerald-400" />;
      case 'Thermometer':
        return <Thermometer className="w-6 h-6 text-indigo-400" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-orange-400" />;
      case 'Filter':
        return <Filter className="w-6 h-6 text-teal-400" />;
      case 'Boxes':
        return <Boxes className="w-6 h-6 text-pink-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-yellow-400" />;
      default:
        return <Trophy className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto px-4 py-4">
      {/* Overview Stats Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Chemistry Reward Badges</h2>
              <p className="text-sm text-slate-400 mt-1">
                Unlocked <strong>{unlockedCount}</strong> of <strong>{totalBadges}</strong> achievements ({percentage}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-2xl font-extrabold text-amber-400 font-mono">{progress.totalScore} XP</span>
              <span className="text-xs text-slate-400 block">Total Learner XP</span>
            </div>
            <div className="text-right border-l border-slate-800 pl-4">
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">{progress.currentStreak}</span>
              <span className="text-xs text-slate-400 block">Current Streak</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-950 rounded-full h-3 mt-6 p-0.5 border border-slate-800">
          <div
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 h-2 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between gap-4 ${
              badge.unlocked
                ? 'bg-slate-900/90 border-amber-500/40 shadow-xl ring-1 ring-amber-500/20'
                : 'bg-slate-950/60 border-slate-800/80 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl border ${
                    badge.unlocked
                      ? 'bg-amber-950/40 border-amber-500/40'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {badge.unlocked ? getBadgeIcon(badge.icon) : <Lock className="w-6 h-6 text-slate-600" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {badge.category}
                  </span>
                  <h3 className="text-base font-bold text-white">{badge.title}</h3>
                </div>
              </div>

              {badge.unlocked ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  UNLOCKED
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                  LOCKED
                </span>
              )}
            </div>

            <div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{badge.description}</p>
              <div className="text-[11px] font-mono text-slate-500 bg-slate-950 p-2 rounded-lg border border-slate-800/60">
                Requirement: {badge.reqCondition}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
