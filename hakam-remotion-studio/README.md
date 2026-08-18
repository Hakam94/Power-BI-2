# 🎬 Hakam Data Studio — Central Video Engine

This is the central Remotion video application for **Hakam Data Studio** (@HakamDataStudio). It manages all full-length videos, shorts, motion graphics, captions, and audio normalization pipelines across all channel topics.

---

## 📁 Repository Structure

```
hakam-remotion-studio/
├── src/
│   ├── Root.tsx                      <-- Register compositions for all video episodes & shorts
│   ├── index.ts                      <-- Remotion entry point
│   ├── FullVideoEdit.tsx             <-- Master camera edit + overlays + silence trimming
│   ├── components/                   <-- Reusable brand UI (CyberBackground, BrandBadge, DualCaptions, etc.)
│   └── scenes/                       <-- Individual video scene modules
├── public/                           <-- Assets (DHBP6661.MP4, speech_segments.json, captions.json, logo)
├── scripts/                          <-- Automated silence detection & caption generators
├── out/                              <-- Rendered video outputs (.mp4)
```

---

## ⚡ Quick Commands

### 1. Launch Remotion Studio Preview
```bash
npm start
# OR: npx remotion studio
```

### 2. Run Silence Detection (Native Remotion FFmpeg)
```bash
node scripts/detect-silences.mjs public/DHBP6661.MP4 2.0
```

### 3. Generate Word-Level Captions (Whisper AI)
```bash
python scripts/generate_captions.py
```

### 4. Render Video Compositions
```bash
# Render Full Production Video (Landscape 1920x1080)
npx remotion render src/index.ts FullVideoEdit out/full_video.mp4

# Render Motion Graphics Video
npx remotion render src/index.ts AgenticAIVideo out/agentic_ai_motion.mp4

# Render Vertical YouTube Short / Instagram Reel (1080x1920)
npx remotion render src/index.ts AgenticAIReel out/viral_reel.mp4
```

---

## 🎨 Adding a New Video Topic (e.g. Fabric IQ / Power BI Copilot)

1. Create scene files in `src/scenes/` (or `src/scenes/topic-name/`).
2. Add a new `<Composition>` definition in `src/Root.tsx`:
   ```tsx
   <Composition
     id="FabricIQVideo"
     component={FabricIQMainVideo}
     durationInFrames={1800}
     fps={30}
     width={1920}
     height={1080}
   />
   ```
3. Open `npm start` to preview and edit interactively.
