# GuardPlay: Sports Media Verification

GuardPlay is a high-performance digital asset protection platform designed for sports organizations to protect, track, and verify their high-value media content using blockchain technology and digital watermarking.

## 🚀 The Mission
To prevent unauthorized use and redistribution of proprietary sports content by providing a real-time, immutable proof-of-ownership system.

## 🛠 Tech Stack

### Frontend
- **React 18/19:** Modern UI development with functional components.
- **TypeScript:** Type-safe application logic.
- **Tailwind CSS:** Professional-grade "Professional Polish" design theme.
- **Framer Motion:** Smooth route transitions and micro-animations.
- **Lucide React:** Iconography for a clean, technical aesthetic.
- **Recharts:** Real-time analytics and detection trend visualization.

### Backend (Full-Stack)
- **Node.js & Express:** Robust API server.
- **Simulated Blockchain Ledger:** Mocked Polygon-style transactions for prototype integrity.
- **Real-time Alert Simulator:** Automated threat intelligence generation.

### Security
- **SHA-256 Hashing:** Used for media fingerprint simulation.
- **Blockchain Verification:** Immutable ownership records simulation.

## ✨ Key Features
- **Live Operations Dashboard:** Overview of protection rates and detection trends.
- **Asset Registry:** A searchable ledger of all protected media assets with their unique blockchain hashes.
- **Threat Intelligence:** A real-time feed of unauthorized content detection with platform-specific alerts.
- **Verification Tool:** A "drag-and-verify" style interface that allows users to check any URL for authorized watermarks.

## 📦 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 📜 Project Structure
- `/src/components`: UI modules (Overview, Registry, Intelligence, Verification).
- `/src/types.ts`: Centralized TypeScript interfaces.
- `server.ts`: Express backend with mock database and simulation logic.
- `metadata.json`: App permissions and description.
