import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  const assets = [
    {
      id: "ASSET-001",
      title: "Champions League Quarter Final Highlights",
      owner: "UEFA Sports Media",
      type: "Video",
      blockchainHash: "0x7d8e9f2a1b3c4d5e6f7a8b9c0d1e2f3a",
      registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      watermarkId: "UEFA-CL-2026-HQ-001",
      status: "Protected"
    },
    {
      id: "ASSET-002",
      title: "Premier League Matchday 32 Livestream",
      owner: "PL Productions",
      type: "Live Stream",
      blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      registeredAt: new Date(Date.now() - 3600000).toISOString(),
      watermarkId: "PL-LIVE-2026-BCAST",
      status: "Monitoring"
    }
  ];

  const alerts = [
    {
      id: "ALRT-001",
      assetId: "ASSET-001",
      platform: "GlobalTube.io",
      url: "https://globaltube.io/watch?v=k8sJ3xL",
      detectedAt: new Date(Date.now() - 1800000).toISOString(),
      confidence: 0.98,
      status: "Active",
      severity: "High"
    }
  ];

  // API Routes
  app.get("/api/assets", (req, res) => {
    res.json(assets);
  });

  app.post("/api/assets", (req, res) => {
    const newAsset = {
      ...req.body,
      id: `ASSET-${String(assets.length + 1).padStart(3, '0')}`,
      registeredAt: new Date().toISOString(),
      blockchainHash: "0x" + Math.random().toString(16).substring(2, 34),
      status: "Protected"
    };
    assets.push(newAsset);
    res.status(201).json(newAsset);
  });

  app.get("/api/alerts", (req, res) => {
    res.json(alerts);
  });

  app.post("/api/verify", (req, res) => {
    const { url } = req.body;
    // Mock verification logic
    const foundAlert = alerts.find(a => a.url === url);
    if (foundAlert) {
      res.json({
        verified: false,
        reason: "Unauthorized watermark detected",
        watermarkId: "UEFA-CL-2026-HQ-001",
        owner: "UEFA Sports Media"
      });
    } else {
      // Chance of detecting a "new" unauthorized source in this mock
      if (Math.random() > 0.7) {
        res.json({
          verified: false,
          reason: "Suspected unauthorized redistribution",
          details: "Mismatched metadata in transport header"
        });
      } else {
        res.json({
          verified: true,
          details: "Source verified as legitimate distributor"
        });
      }
    }
  });

  // Simulator: Add a new alert every 60 seconds
  setInterval(() => {
    const platforms = ["StreamX.tv", "SportsFlix.net", "BettingHub.live", "PiratePlay.cc"];
    const newAlert = {
      id: `ALRT-${String(alerts.length + 1).padStart(3, '0')}`,
      assetId: assets[Math.floor(Math.random() * assets.length)].id,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      url: `https://mock-unauthorized-site.com/media/${Math.random().toString(36).substring(7)}`,
      detectedAt: new Date().toISOString(),
      confidence: 0.85 + Math.random() * 0.14,
      status: "New",
      severity: Math.random() > 0.5 ? "Medium" : "High"
    };
    alerts.unshift(newAlert);
    if (alerts.length > 50) alerts.pop();
  }, 60000);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
