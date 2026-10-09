import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';

// Raw source file imports via Vite ?raw suffix
import appCode from '../App.tsx?raw';
import canvasCode from '../components/ParticleDiagramCanvas.tsx?raw';
import boardCode from '../components/LevelBoard.tsx?raw';
import statesCode from '../components/StatesOfMatterLab.tsx?raw';
import challengeCode from '../components/AdvancedChallengeLab.tsx?raw';
import cheatCode from '../components/ParticleCheatSheet.tsx?raw';
import badgesCode from '../components/BadgesDrawer.tsx?raw';
import tutorCode from '../components/AiTutorModal.tsx?raw';
import typesCode from '../types.ts?raw';
import elementsCode from '../data/elementsAndParticles.ts?raw';
import levelsCode from '../data/levelsData.ts?raw';
import badgesDataCode from '../data/badgesData.ts?raw';
import serverCode from '../../server.ts?raw';

interface CodeFileItem {
  filename: string;
  description: string;
  content: string;
  category: 'Core Layout' | 'Canvas Physics & Simulations' | 'Interactive Labs' | 'Data Models' | 'Backend Server';
}

const FILE_ITEMS: CodeFileItem[] = [
  {
    filename: 'src/App.tsx',
    category: 'Core Layout',
    description: 'Main application container, tab state management, streak counter, and level progress persistence.',
    content: appCode,
  },
  {
    filename: 'src/components/ParticleDiagramCanvas.tsx',
    category: 'Canvas Physics & Simulations',
    description: 'Interactive HTML5 Canvas engine rendering thermal motion, fluid physics, molecular bonding, and state transitions (solid, liquid, gas).',
    content: canvasCode,
  },
  {
    filename: 'src/components/LevelBoard.tsx',
    category: 'Interactive Labs',
    description: 'Gamified level challenge view for classifying particle diagrams into atoms, molecules, elements, compounds, pure substances, and mixtures.',
    content: boardCode,
  },
  {
    filename: 'src/components/StatesOfMatterLab.tsx',
    category: 'Interactive Labs',
    description: 'Interactive state-of-matter simulator with dynamic temperature control slider (Kelvin) and state phase transitions.',
    content: statesCode,
  },
  {
    filename: 'src/components/AdvancedChallengeLab.tsx',
    category: 'Interactive Labs',
    description: 'Mastery Arena with timed challenge modes, drag-and-drop classification matrix, and particle building lab.',
    content: challengeCode,
  },
  {
    filename: 'src/components/ParticleCheatSheet.tsx',
    category: 'Interactive Labs',
    description: 'Interactive visual concept guide detailing definitions, visual rules, and particle diagram comparisons.',
    content: cheatCode,
  },
  {
    filename: 'src/components/BadgesDrawer.tsx',
    category: 'Interactive Labs',
    description: 'Achievement badges drawer showing unlocked rewards, requirements, and progress metrics.',
    content: badgesCode,
  },
  {
    filename: 'src/components/AiTutorModal.tsx',
    category: 'Interactive Labs',
    description: 'Dr. Atom AI Chemistry Tutor interface powered by Gemini API for student Q&A.',
    content: tutorCode,
  },
  {
    filename: 'src/types.ts',
    category: 'Data Models',
    description: 'TypeScript interfaces and type definitions for elements, bonds, particle groups, diagrams, levels, and user progress.',
    content: typesCode,
  },
  {
    filename: 'src/data/elementsAndParticles.ts',
    category: 'Data Models',
    description: 'Element database with colors, atomic masses, atomic radii, and symbols (Hydrogen, Carbon, Nitrogen, Oxygen, Argon, Helium, Chlorine, Sodium, Iron, Neon).',
    content: elementsCode,
  },
  {
    filename: 'src/data/levelsData.ts',
    category: 'Data Models',
    description: 'Game level data definitions, level objectives, hint guides, and sample particle diagram configurations.',
    content: levelsCode,
  },
  {
    filename: 'src/data/badgesData.ts',
    category: 'Data Models',
    description: 'Badge definitions, reward criteria, icons, and achievement metadata.',
    content: badgesDataCode,
  },
  {
    filename: 'server.ts',
    category: 'Backend Server',
    description: 'Express.js backend server handling Vite dev middleware and Gemini AI Tutor endpoints.',
    content: serverCode,
  },
];

export async function generateAndDownloadWordDoc() {
  const childrenElements: any[] = [];

  // Title Section
  childrenElements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'Particle Chemistry Lab',
          bold: true,
          size: 32,
          color: '0F172A', // Slate 900
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 240 },
      children: [
        new TextRun({
          text: 'Complete Source Code & Architectural Documentation',
          bold: true,
          size: 20,
          color: '0284C7', // Sky 600
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 360 },
      children: [
        new TextRun({
          text: `Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`,
          size: 18,
          color: '64748B',
          font: 'Arial',
        }),
        new TextRun({
          text: 'Project Overview: Interactive High School Chemistry Particle Diagram & Matter Classification Application built with React, TypeScript, HTML5 Canvas, Tailwind CSS, and Gemini AI.',
          size: 18,
          italics: true,
          color: '334155',
          font: 'Arial',
        }),
      ],
    })
  );

  // Table of Contents Summary
  childrenElements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: 'Table of Included Source Code Files',
          bold: true,
          size: 22,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
    })
  );

  // Table showing files
  const tableRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: 'File Path', bold: true, size: 16, font: 'Arial' })] })],
        }),
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: 'Category', bold: true, size: 16, font: 'Arial' })] })],
        }),
        new TableCell({
          width: { size: 45, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: 'Description', bold: true, size: 16, font: 'Arial' })] })],
        }),
      ],
    }),
    ...FILE_ITEMS.map(
      (item) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: item.filename, bold: true, size: 14, font: 'Consolas' })] })],
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: item.category, size: 14, font: 'Arial' })] })],
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: item.description, size: 14, font: 'Arial' })] })],
            }),
          ],
        })
    ),
  ];

  childrenElements.push(
    new Table({
      rows: tableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    })
  );

  // Add individual file sections
  FILE_ITEMS.forEach((item, index) => {
    childrenElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 480, after: 80 },
        children: [
          new TextRun({
            text: `${index + 1}. ${item.filename}`,
            bold: true,
            size: 22,
            color: '0F172A',
            font: 'Arial',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({
            text: `Category: ${item.category} | ${item.description}`,
            size: 16,
            italics: true,
            color: '475569',
            font: 'Arial',
          }),
        ],
      })
    );

    // Code lines formatted in monospace block
    const lines = item.content.split('\n');
    lines.forEach((line, lineIdx) => {
      // Replace tabs with spaces
      const formattedLine = line.replace(/\t/g, '  ');
      const lineNumber = (lineIdx + 1).toString().padStart(4, ' ');

      childrenElements.push(
        new Paragraph({
          spacing: { before: 0, after: 0, line: 200 },
          border: {
            left: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
          },
          children: [
            new TextRun({
              text: `${lineNumber} | `,
              size: 14,
              color: '94A3B8',
              font: 'Consolas',
            }),
            new TextRun({
              text: formattedLine || ' ',
              size: 14,
              color: '1E293B',
              font: 'Consolas',
            }),
          ],
        })
      );
    });
  });

  // Build the docx Document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: childrenElements,
      },
    ],
  });

  // Pack and trigger browser download
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Particle_Chemistry_Lab_SourceCode_${new Date().toISOString().slice(0, 10)}.docx`);
}
