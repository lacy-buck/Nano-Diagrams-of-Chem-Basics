# Particle Chemistry Lab (Nano Diagrams of Chem Basics)

Interactive particle diagram learning environment and drag-and-drop gamified challenge levels for high school chemistry students.

Hosted on GitHub Pages at: `https://<your-username>.github.io/Nano-Diagrams-of-Chem-Basics/`

---

## Features
- **Interactive Particle Diagrams**: HTML5 Canvas engine rendering thermal motion, kinetic velocity, covalent bonds, and state transitions (Solid, Liquid, Gas).
- **Gamified Level Progression**: 5 challenge tiers for identifying and classifying atoms, molecules, elements, compounds, pure substances, and mixtures.
- **Mastery Arena**: Drag-and-drop multi-particle classification arena with immediate accuracy scoring.
- **States of Matter Simulator**: Interactive temperature and pressure controls observing changes in density, particle proximity, and thermal kinetic energy.
- **Chemistry Concept Guide & Cheat Sheet**: Interactive visual reference breaking down particle rules side-by-side.
- **Achievement Badges & Streaks**: Progress tracking with milestone unlocks and continuous streak counters saved locally in the browser.

---

## GitHub Pages Deployment

This repository is pre-configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the app to GitHub Pages upon every push to `main` or `master`.

### One-Time Setup in GitHub:
1. Push this repository to GitHub: `https://github.com/<your-username>/Nano-Diagrams-of-Chem-Basics`
2. Go to repository **Settings** -> **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4. Push to `main` or trigger the workflow manually from the **Actions** tab (`Deploy Particle Chemistry Lab to GitHub Pages`).
5. Your app will be live at `https://<your-username>.github.io/Nano-Diagrams-of-Chem-Basics/`!

---

## Local Development

```bash
# Install dependencies (using Bun or npm)
bun install
# or: npm install

# Run development server
bun run dev
# or: npm run dev

# Build client for GitHub Pages
bun run build:client
# or: npm run build:client
```
