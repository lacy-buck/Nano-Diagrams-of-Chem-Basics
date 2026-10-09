import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';

const ROOT_DIR = process.cwd();

const FILE_PATHS = [
  { path: 'src/App.tsx', category: 'Core Layout', desc: 'Main application container, navigation, and persistence.' },
  { path: 'src/components/ParticleDiagramCanvas.tsx', category: 'Canvas Physics & Simulations', desc: 'HTML5 Canvas simulation engine with thermal motion and state physics.' },
  { path: 'src/components/LevelBoard.tsx', category: 'Interactive Labs', desc: 'Level challenge engine for classification of matter.' },
  { path: 'src/components/StatesOfMatterLab.tsx', category: 'Interactive Labs', desc: 'States of matter simulator with temperature slider.' },
  { path: 'src/components/AdvancedChallengeLab.tsx', category: 'Interactive Labs', desc: 'Mastery arena, timed challenge, classification matrix, and builder.' },
  { path: 'src/components/ParticleCheatSheet.tsx', category: 'Interactive Labs', desc: 'Concept guide and classification rules.' },
  { path: 'src/components/BadgesDrawer.tsx', category: 'Interactive Labs', desc: 'Badges and achievement tracker.' },
  { path: 'src/components/AiTutorModal.tsx', category: 'Interactive Labs', desc: 'Dr. Atom Gemini AI tutor chat modal.' },
  { path: 'src/types.ts', category: 'Data Models', desc: 'TypeScript interfaces and data structures.' },
  { path: 'src/data/elementsAndParticles.ts', category: 'Data Models', desc: 'Element definitions and particle styling data.' },
  { path: 'src/data/levelsData.ts', category: 'Data Models', desc: 'Level objectives and particle diagram samples.' },
  { path: 'src/data/badgesData.ts', category: 'Data Models', desc: 'Badge definitions and unlock criteria.' },
  { path: 'server.ts', category: 'Backend Server', desc: 'Express backend and Gemini API endpoint.' },
];

async function generateDocx() {
  console.log('Generating Word document (.docx)...');

  const childrenElements: any[] = [];

  // Title
  childrenElements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: 'Particle Chemistry Lab',
          bold: true,
          size: 32,
          color: '0F172A',
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
          color: '0284C7',
          font: 'Arial',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 360 },
      children: [
        new TextRun({
          text: `Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n`,
          size: 18,
          color: '64748B',
          font: 'Arial',
        }),
        new TextRun({
          text: 'This Word document contains the full source code files for the Particle Chemistry Lab web application.',
          size: 18,
          italics: true,
          color: '334155',
          font: 'Arial',
        }),
      ],
    })
  );

  // File Table
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
  ];

  const loadedFiles: { path: string; category: string; desc: string; content: string }[] = [];

  for (const fileItem of FILE_PATHS) {
    const fullPath = path.join(ROOT_DIR, fileItem.path);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      loadedFiles.push({ ...fileItem, content });

      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: fileItem.path, bold: true, size: 14, font: 'Consolas' })] })],
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: fileItem.category, size: 14, font: 'Arial' })] })],
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: fileItem.desc, size: 14, font: 'Arial' })] })],
            }),
          ],
        })
      );
    }
  }

  childrenElements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: 'Project Source Code Directory',
          bold: true,
          size: 22,
          color: '0F172A',
          font: 'Arial',
        }),
      ],
    }),
    new Table({
      rows: tableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    })
  );

  // File contents
  loadedFiles.forEach((item, index) => {
    childrenElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 480, after: 80 },
        children: [
          new TextRun({
            text: `${index + 1}. ${item.path}`,
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
            text: `Category: ${item.category} | ${item.desc}`,
            size: 16,
            italics: true,
            color: '475569',
            font: 'Arial',
          }),
        ],
      })
    );

    const lines = item.content.split('\n');
    lines.forEach((line, lineIdx) => {
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

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: childrenElements,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(ROOT_DIR, 'Particle_Chemistry_Lab_SourceCode.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Word document successfully created at: ${outputPath}`);
}

generateDocx().catch((err) => {
  console.error('Error generating docx:', err);
  process.exit(1);
});
