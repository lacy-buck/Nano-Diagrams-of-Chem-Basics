import React, { useEffect, useRef, useState } from 'react';
import { ParticleDiagram, AtomPosition } from '../types';
import { ELEMENTS } from '../data/elementsAndParticles';

interface ParticleDiagramCanvasProps {
  diagram: ParticleDiagram;
  width?: number;
  height?: number;
  interactive?: boolean;
  showLegend?: boolean;
  temperatureKelvin?: number;
  customParticleState?: 'solid' | 'liquid' | 'gas';
  hideBonds?: boolean;
  isStatic?: boolean;
  className?: string;
  onAtomClick?: (atom: AtomPosition) => void;
}

interface SimAtom {
  id: string;
  elementId: string;
  relX: number;
  relY: number;
  radius: number;
}

interface SimGroup {
  id: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  boundingRadius: number;
  atoms: SimAtom[];
  bonds: { atom1Id: string; atom2Id: string; type: 'single' | 'double' | 'triple' }[];
}

export const ParticleDiagramCanvas: React.FC<ParticleDiagramCanvasProps> = ({
  diagram,
  width = 320,
  height = 240,
  interactive = false,
  showLegend = true,
  temperatureKelvin,
  customParticleState,
  hideBonds = false,
  isStatic: propIsStatic,
  className = '',
  onAtomClick,
}) => {
  // Check if diagram represents a reaction/change with both reactants and products
  if (
    diagram.reactantsGroups &&
    diagram.productsGroups &&
    diagram.reactantsGroups.length > 0 &&
    diagram.productsGroups.length > 0
  ) {
    const subWidth = Math.max(130, Math.floor((width - 44) / 2));
    const subHeight = Math.max(130, height - 20);

    const reactantDiag: ParticleDiagram = {
      ...diagram,
      groups: diagram.reactantsGroups,
      reactantsGroups: undefined,
      productsGroups: undefined,
    };
    const productDiag: ParticleDiagram = {
      ...diagram,
      groups: diagram.productsGroups,
      reactantsGroups: undefined,
      productsGroups: undefined,
    };

    return (
      <div className={`flex items-center justify-center gap-1.5 rounded-xl p-2 bg-slate-950/90 border border-slate-800 ${className}`}>
        {/* Reactants / BEFORE Box */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 shadow-sm">
            {diagram.reactantsLabel || 'BEFORE (Reactants)'}
          </span>
          <ParticleDiagramCanvas
            diagram={reactantDiag}
            width={subWidth}
            height={subHeight}
            interactive={false}
            showLegend={showLegend}
            hideBonds={hideBonds}
            isStatic={propIsStatic !== undefined ? propIsStatic : true}
          />
        </div>

        {/* Change / Reaction Arrow */}
        <div className="flex flex-col items-center justify-center px-1 text-amber-400 font-bold shrink-0">
          <span className="text-xl md:text-2xl text-amber-400">➔</span>
          <span className="text-[9px] uppercase font-extrabold tracking-tight text-slate-400">
            {diagram.isChemicalChange ? 'Reaction' : 'Change'}
          </span>
        </div>

        {/* Products / AFTER Box */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 shadow-sm">
            {diagram.productsLabel || 'AFTER (Products)'}
          </span>
          <ParticleDiagramCanvas
            diagram={productDiag}
            width={subWidth}
            height={subHeight}
            interactive={false}
            showLegend={false}
            hideBonds={hideBonds}
            isStatic={propIsStatic !== undefined ? propIsStatic : true}
          />
        </div>
      </div>
    );
  }

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredAtom, setHoveredAtom] = useState<AtomPosition | null>(null);

  const activeState = customParticleState || diagram.stateOfMatter || 'gas';
  const isStateSimulation = !!customParticleState;
  // If explicitly requested or if NOT in states simulator, render static particles
  const isStatic = propIsStatic !== undefined ? propIsStatic : !isStateSimulation;

  const groupsRef = useRef<SimGroup[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize simulation groups when diagram or dimensions change
  useEffect(() => {
    const simGroups: SimGroup[] = [];

    diagram.groups.forEach((group) => {
      let sumX = 0;
      let sumY = 0;
      const count = group.atoms.length;
      if (count === 0) return;

      group.atoms.forEach((atom) => {
        sumX += (atom.x / 100) * width;
        sumY += (atom.y / 100) * height;
      });

      const centerX = sumX / count;
      const centerY = sumY / count;

      let maxDist = 0;
      const simAtoms: SimAtom[] = group.atoms.map((atom) => {
        const pixelX = (atom.x / 100) * width;
        const pixelY = (atom.y / 100) * height;
        const relX = pixelX - centerX;
        const relY = pixelY - centerY;
        const elem = ELEMENTS[atom.elementId] || { radius: 15 };
        const radius = elem.radius || 15;
        const dist = Math.sqrt(relX * relX + relY * relY) + radius;
        if (dist > maxDist) maxDist = dist;

        return {
          id: atom.id,
          elementId: atom.elementId,
          relX,
          relY,
          radius,
        };
      });

      const temp = temperatureKelvin ?? (activeState === 'gas' ? 300 : activeState === 'liquid' ? 250 : 100);
      const speedScale = Math.max(0.4, Math.sqrt(temp / 200));

      let vx = 0;
      let vy = 0;

      if (!isStatic) {
        if (activeState === 'gas') {
          const angle = Math.random() * Math.PI * 2;
          const speed = (2.0 + Math.random() * 1.5) * speedScale;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        } else if (activeState === 'liquid') {
          const angle = Math.random() * Math.PI * 2;
          const speed = (0.6 + Math.random() * 0.5) * speedScale;
          vx = Math.cos(angle) * speed;
          vy = Math.sin(angle) * speed;
        }
      }

      simGroups.push({
        id: group.id,
        x: centerX,
        y: centerY,
        baseX: centerX,
        baseY: centerY,
        vx,
        vy,
        boundingRadius: Math.max(maxDist, 14),
        atoms: simAtoms,
        bonds: group.bonds || [],
      });
    });

    groupsRef.current = simGroups;
  }, [diagram.id, width, height, activeState, isStatic]);

  // Main Canvas Physics & Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Dark theme canvas container background
      ctx.fillStyle = '#0F172A'; // Slate 900
      ctx.fillRect(0, 0, width, height);

      // Beaker dimensions for States Simulation mode
      const beakerLeft = width * 0.12;
      const beakerRight = width * 0.88;
      const beakerTop = height * 0.15;
      const beakerBottom = height * 0.88;
      const beakerWidth = beakerRight - beakerLeft;

      const groups = groupsRef.current;

      if (!isStateSimulation) {
        // Standard non-simulator container stroke
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);
      } else {
        // DRAW LABORATORY GLASS BEAKER
        ctx.save();
        // Beaker glass fill gradient
        const beakerGrad = ctx.createLinearGradient(beakerLeft, 0, beakerRight, 0);
        beakerGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
        beakerGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.2)');
        beakerGrad.addColorStop(1, 'rgba(56, 189, 248, 0.08)');

        // Fill beaker interior
        ctx.fillStyle = beakerGrad;
        ctx.beginPath();
        ctx.moveTo(beakerLeft - 8, beakerTop - 4); // Spout
        ctx.lineTo(beakerLeft, beakerTop);
        ctx.lineTo(beakerLeft, beakerBottom - 12);
        ctx.quadraticCurveTo(beakerLeft, beakerBottom, beakerLeft + 12, beakerBottom);
        ctx.lineTo(beakerRight - 12, beakerBottom);
        ctx.quadraticCurveTo(beakerRight, beakerBottom, beakerRight, beakerBottom - 12);
        ctx.lineTo(beakerRight, beakerTop);
        ctx.lineTo(beakerRight + 8, beakerTop - 4); // Right lip
        ctx.closePath();
        ctx.fill();

        // Draw Beaker Glass Outline
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.7)'; // Soft translucent cyan glass
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(beakerLeft - 10, beakerTop - 5);
        ctx.lineTo(beakerLeft, beakerTop);
        ctx.lineTo(beakerLeft, beakerBottom - 12);
        ctx.quadraticCurveTo(beakerLeft, beakerBottom, beakerLeft + 12, beakerBottom);
        ctx.lineTo(beakerRight - 12, beakerBottom);
        ctx.quadraticCurveTo(beakerRight, beakerBottom, beakerRight, beakerBottom - 12);
        ctx.lineTo(beakerRight, beakerTop);
        ctx.lineTo(beakerRight + 8, beakerTop - 5);
        ctx.stroke();

        // Beaker Measurement Volume Tick Marks
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'right';

        const ticks = [
          { yRatio: 0.75, label: '50mL' },
          { yRatio: 0.60, label: '100mL' },
          { yRatio: 0.45, label: '150mL' },
          { yRatio: 0.30, label: '200mL' },
        ];

        ticks.forEach((tick) => {
          const tickY = beakerBottom - (beakerBottom - beakerTop) * tick.yRatio;
          ctx.beginPath();
          ctx.moveTo(beakerRight - 1, tickY);
          ctx.lineTo(beakerRight - 12, tickY);
          ctx.stroke();
          ctx.fillText(tick.label, beakerRight - 16, tickY + 3);
        });

        ctx.restore();
      }

      // -------------------------------------------------------------
      // PHYSICS UPDATE STEP
      // -------------------------------------------------------------
      if (!isStatic) {
        const temp = temperatureKelvin ?? (activeState === 'gas' ? 350 : activeState === 'liquid' ? 280 : 100);
        const speedScale = Math.max(0.2, Math.sqrt(temp / 220));

        if (activeState === 'solid') {
          // SOLID: Vibrates gently around fixed base position
          groups.forEach((g, idx) => {
            const jitterAmount = 0.8 * speedScale;
            const offsetX = Math.sin(time * 12 + idx * 1.7) * jitterAmount;
            const offsetY = Math.cos(time * 10 + idx * 2.3) * jitterAmount;

            g.x = g.baseX + offsetX;
            g.y = g.baseY + offsetY;

            // Clamp to beaker
            g.x = Math.max(beakerLeft + g.boundingRadius + 4, Math.min(beakerRight - g.boundingRadius - 4, g.x));
            g.y = Math.max(beakerTop + g.boundingRadius + 4, Math.min(beakerBottom - g.boundingRadius - 4, g.y));
          });
        } else if (activeState === 'liquid') {
          // LIQUID: Real fluid behavior (Gravity + Smooth fluid flow, rolling, slipping, position-swapping)
          const gravity = 0.08 * speedScale;
          const thermalKick = 0.45 * speedScale;

          groups.forEach((g) => {
            // Apply downward gravity pull
            g.vy += gravity;

            // Continuous fluid thermal agitation (Brownian motion & micro-currents)
            g.vx += (Math.random() - 0.5) * thermalKick;
            g.vy += (Math.random() - 0.5) * thermalKick * 0.5;

            // Fluid viscosity dampening
            g.vx *= 0.96;
            g.vy *= 0.96;

            // Update position
            g.x += g.vx;
            g.y += g.vy;

            // Beaker floor collision with fluid sliding and gentle upward thermal bounce
            if (g.y > beakerBottom - g.boundingRadius - 2) {
              g.y = beakerBottom - g.boundingRadius - 2;
              g.vy = -Math.abs(g.vy) * 0.3 - (Math.random() * 0.3 * speedScale); // gentle upward thermal agitation
              g.vx += (Math.random() - 0.5) * 0.8 * speedScale; // gentle horizontal sliding
            }
            if (g.y < beakerTop + g.boundingRadius + 4) {
              g.y = beakerTop + g.boundingRadius + 4;
              g.vy = Math.abs(g.vy) * 0.4;
            }
            if (g.x < beakerLeft + g.boundingRadius + 2) {
              g.x = beakerLeft + g.boundingRadius + 2;
              g.vx = Math.abs(g.vx) * 0.6 + 0.2 * speedScale;
            }
            if (g.x > beakerRight - g.boundingRadius - 2) {
              g.x = beakerRight - g.boundingRadius - 2;
              g.vx = -Math.abs(g.vx) * 0.6 - 0.2 * speedScale;
            }
          });

          // Inter-group fluid packing, tumbling, rolling, and active position swapping
          for (let i = 0; i < groups.length; i++) {
            for (let j = i + 1; j < groups.length; j++) {
              const g1 = groups[i];
              const g2 = groups[j];

              const dx = g2.x - g1.x;
              const dy = g2.y - g1.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
              const minDist = (g1.boundingRadius + g2.boundingRadius) * 0.96; // Touching close-pack

              if (dist < minDist) {
                const overlap = (minDist - dist) / 2;
                const nx = dx / dist;
                const ny = dy / dist;

                // Push overlapping groups apart along collision normal
                g1.x -= nx * overlap;
                g1.y -= ny * overlap;
                g2.x += nx * overlap;
                g2.y += ny * overlap;

                // Liquid sliding & rolling off shoulders:
                // If one molecule is resting on top of another, force it to roll off laterally to fill empty spaces!
                const tanX = -ny;
                const tanY = nx;

                const slipDirection = (dx !== 0 ? Math.sign(dx) : (i % 2 === 0 ? 1 : -1));
                const rollForce = 0.22 * speedScale;

                // Convert compressive stack pressure into sideways fluid flow
                g1.vx -= tanX * rollForce * slipDirection + nx * 0.05 * speedScale;
                g1.vy -= tanY * rollForce * slipDirection;
                g2.vx += tanX * rollForce * slipDirection + nx * 0.05 * speedScale;
                g2.vy += tanY * rollForce * slipDirection;

                // Velocity exchange along tangent & normal to encourage swapping places
                const kx = g1.vx - g2.vx;
                const ky = g1.vy - g2.vy;
                const p = (nx * kx + ny * ky) * 0.5;

                g1.vx -= p * nx * 0.5;
                g1.vy -= p * ny * 0.5;
                g2.vx += p * nx * 0.5;
                g2.vy += p * ny * 0.5;
              }
            }
          }
        } else if (activeState === 'gas') {
          // GAS: Rapid straight line flight & bouncing throughout beaker
          groups.forEach((g) => {
            const speed = Math.sqrt(g.vx * g.vx + g.vy * g.vy);
            const targetSpeed = (2.2 + Math.random() * 0.8) * speedScale;

            if (speed > 0.01) {
              const factor = targetSpeed / speed;
              g.vx = g.vx * 0.92 + g.vx * factor * 0.08;
              g.vy = g.vy * 0.92 + g.vy * factor * 0.08;
            } else {
              const angle = Math.random() * Math.PI * 2;
              g.vx = Math.cos(angle) * targetSpeed;
              g.vy = Math.sin(angle) * targetSpeed;
            }

            g.x += g.vx;
            g.y += g.vy;

            // Bounce off beaker walls & top rim
            if (g.x <= beakerLeft + g.boundingRadius + 2) {
              g.x = beakerLeft + g.boundingRadius + 2;
              g.vx = Math.abs(g.vx);
            } else if (g.x >= beakerRight - g.boundingRadius - 2) {
              g.x = beakerRight - g.boundingRadius - 2;
              g.vx = -Math.abs(g.vx);
            }

            if (g.y <= beakerTop + g.boundingRadius + 2) {
              g.y = beakerTop + g.boundingRadius + 2;
              g.vy = Math.abs(g.vy);
            } else if (g.y >= beakerBottom - g.boundingRadius - 2) {
              g.y = beakerBottom - g.boundingRadius - 2;
              g.vy = -Math.abs(g.vy);
            }
          });

          // Gas elastic collisions
          for (let i = 0; i < groups.length; i++) {
            for (let j = i + 1; j < groups.length; j++) {
              const g1 = groups[i];
              const g2 = groups[j];

              const dx = g2.x - g1.x;
              const dy = g2.y - g1.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
              const minDist = g1.boundingRadius + g2.boundingRadius;

              if (dist < minDist) {
                const overlap = (minDist - dist) / 2;
                const nx = dx / dist;
                const ny = dy / dist;

                g1.x -= nx * overlap;
                g1.y -= ny * overlap;
                g2.x += nx * overlap;
                g2.y += ny * overlap;

                const kx = g1.vx - g2.vx;
                const ky = g1.vy - g2.vy;
                const p = nx * kx + ny * ky;

                if (p > 0) {
                  g1.vx -= p * nx;
                  g1.vy -= p * ny;
                  g2.vx += p * nx;
                  g2.vy += p * ny;
                }
              }
            }
          }
        }
      } else {
        // STATIC MODE (for challenge levels): ensure groups stay fixed at exact baseX, baseY
        groups.forEach((g) => {
          g.x = g.baseX;
          g.y = g.baseY;
        });
      }

      // -------------------------------------------------------------
      // BONDS DRAWING STEP
      // -------------------------------------------------------------
      const shouldDrawBonds = !hideBonds;

      if (shouldDrawBonds) {
        groups.forEach((g) => {
          g.bonds.forEach((bond) => {
            const a1 = g.atoms.find((a) => a.id === bond.atom1Id);
            const a2 = g.atoms.find((a) => a.id === bond.atom2Id);

            if (a1 && a2) {
              const p1x = g.x + a1.relX;
              const p1y = g.y + a1.relY;
              const p2x = g.x + a2.relX;
              const p2y = g.y + a2.relY;

              ctx.save();
              if (bond.type === 'double') {
                ctx.strokeStyle = '#94A3B8';
                ctx.lineWidth = 3;
                const angle = Math.atan2(p2y - p1y, p2x - p1x);
                const offsetX = Math.sin(angle) * 3;
                const offsetY = -Math.cos(angle) * 3;

                ctx.beginPath();
                ctx.moveTo(p1x + offsetX, p1y + offsetY);
                ctx.lineTo(p2x + offsetX, p2y + offsetY);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(p1x - offsetX, p1y - offsetY);
                ctx.lineTo(p2x - offsetX, p2y - offsetY);
                ctx.stroke();
              } else if (bond.type === 'triple') {
                ctx.strokeStyle = '#CBD5E1';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(p1x, p1y);
                ctx.lineTo(p2x, p2y);
                ctx.stroke();
              } else {
                ctx.strokeStyle = '#CBD5E1';
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                ctx.moveTo(p1x, p1y);
                ctx.lineTo(p2x, p2y);
                ctx.stroke();
              }
              ctx.restore();
            }
          });
        });
      }

      // -------------------------------------------------------------
      // ATOMS DRAWING STEP
      // -------------------------------------------------------------
      groups.forEach((g) => {
        g.atoms.forEach((a) => {
          const elem = ELEMENTS[a.elementId] || {
            symbol: a.elementId,
            name: a.elementId,
            color: '#38BDF8',
            borderColor: '#0284C7',
            radius: 15,
          };

          const radius = a.radius;
          const cx = g.x + a.relX;
          const cy = g.y + a.relY;

          ctx.save();
          // 3D sphere gradient highlight
          const gradient = ctx.createRadialGradient(
            cx - radius * 0.3,
            cy - radius * 0.3,
            radius * 0.1,
            cx,
            cy,
            radius
          );
          gradient.addColorStop(0, '#FFFFFF');
          gradient.addColorStop(0.35, elem.color);
          gradient.addColorStop(1, elem.borderColor);

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.lineWidth = 2;
          ctx.strokeStyle = elem.borderColor;
          ctx.stroke();

          // Highlight if hovered
          if (hoveredAtom?.id === a.id) {
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = '#F59E0B';
            ctx.stroke();
          }

          // Atom Symbol Text
          ctx.fillStyle = elem.color === '#F8FAFC' || elem.color === '#FFFFFF' ? '#0F172A' : '#FFFFFF';
          ctx.font = 'bold 11px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(elem.symbol, cx, cy);

          ctx.restore();
        });
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    diagram,
    width,
    height,
    activeState,
    temperatureKelvin,
    hoveredAtom,
    isStateSimulation,
    hideBonds,
    isStatic,
  ]);

  // Extract element legend info
  const presentElementIds: string[] = Array.from(
    new Set<string>(diagram.groups.flatMap((g) => g.atoms.map((a) => a.elementId)))
  );

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900 ${className}`}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        style={{ width, height, display: 'block' }}
        className="transition-opacity duration-200"
      />

      {/* Legend Badge Overlay */}
      {showLegend && presentElementIds.length > 0 && (
        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800/80 text-[11px] flex items-center gap-2 pointer-events-none">
          <span className="text-slate-400 font-medium">Key:</span>
          {presentElementIds.map((id) => {
            const elem = ELEMENTS[id];
            if (!elem) return null;
            return (
              <div key={id} className="flex items-center gap-1">
                <span
                  className="w-3 h-3 rounded-full inline-block border border-slate-700 shadow-sm"
                  style={{ backgroundColor: elem.color }}
                />
                <span className="text-slate-200 font-semibold">{elem.symbol}</span>
                <span className="text-slate-400 font-normal">({elem.name})</span>
              </div>
            );
          })}
        </div>
      )}

      {/* State badge overlay - only shown in States Simulation Lab */}
      {isStateSimulation && (
        <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800/80 text-[10px] font-semibold tracking-wide uppercase text-slate-300 pointer-events-none">
          Phase: <span className="text-cyan-400">{activeState}</span>
        </div>
      )}
    </div>
  );
};
