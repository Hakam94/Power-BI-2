---
name: hakam-data-studio-video-editor
description: Complete 1% Autonomous AI Video Editing Operating System tailored for Hakam Data Studio (@HakamDataStudio). Integrates the entire Google Creative AI Suite (Gemini Omni Video Director, Google Veo 3D B-Roll, Google Imagen 3 viral thumbnails, Google Lyria adaptive audio ducking, Google Chirp ASR) paired with Remotion-native ripple editing, EBU R128 loudness normalization, and vertical Short/Reel extraction.
---

# Hakam Data Studio Complete Autonomous AI Video Operating System

Tailored for **Hakam Data Studio** (@HakamDataStudio).

---

## 🛠️ Integrated Google Creative AI Suite & Reference Modules

1. **`hakam-data-studio-video-editor`** (Master Pipeline Runner & Skill Hub)
2. **`google-creative-ai-suite`** (Google DeepMind Media Engines):
   - **Gemini Omni Multimodal Director**: Cuts dead air, detects 3-second hook retention moments, calculates dynamic zoom-in/out keyframes (`1.28x` punch-in, attention resets), and provides contextual dual Arabic/English translations.
   - **Google Veo (AI B-Roll Engine)**: Auto-generates futuristic 3D B-roll overlays and architectural diagrams (Power BI, Microsoft Fabric, MCP) into `public/broll/`.
   - **Google Imagen 3 (Thumbnail & 3D Asset Studio)**: Automatically generates high-CTR 3D YouTube thumbnails and holographic badge assets adhering to Hakam brand tokens.
   - **Google Lyria (Adaptive Sound Bed Engine)**: Calibrates background cyber-tech music to match the exact duration of the video with -24 dB automated voice ducking.
   - **Google Chirp (Multilingual ASR)**: Millisecond-precision Arabic speech-to-text timing with active Cyan (`#00D2FF`) and Lime (`#BFFF00`) highlight tags.
3. **`brand-design-system`** (Hakam logo badge, Lime Green `#BFFF00` & Electric Cyan `#00D2FF` design tokens, Cyber Slate `#0D2229`).
4. **`remotion-best-practices`** (Official Remotion Dev Skill):
   - **`remotion-markup`**: Frame-driven animations via `useCurrentFrame()`, `interpolate()`, and `spring()`.
   - **`video-editing`**: Non-destructive ripple editing via `<TransitionSeries>` & `<Video trimBefore={clip.trimBefore}>`.
   - **`silence-detection`**: 2-step adaptive FFmpeg silence detection (`loudnorm` gating threshold → `silencedetect`).
   - **`calculate-metadata`**: Dynamic composition duration from `public/speech_segments.json`.
   - **`audio` & `sfx`**: -16 LUFS loudness normalization & transition sound effects.
5. **`hook-sound-design-and-sfx`** (Synchronized Audio Cues & Cyber BGM Bed):
   - **`whoosh.wav` (0.0s)**: Fast air sweep on kinetic text zoom-ins.
   - **`bass_impact.wav` (0.5s)**: Deep sub bass boom for the 3-second hook punch (*"IMAGINE THIS..."*).
   - **`pop.wav`**: Crisp UI pops for badge appearances, prompt cards, and 0-click icons.
   - **`laser.wav`**: Futuristic digital pulse for architecture beam transitions.
   - **`cyber_bgm.wav`**: 20s cyber-tech ambient music bed with automatic -24 dB voice ducking.
6. **`youtube-chapters-and-metadata`** (Timestamped YouTube chapters & SEO descriptions).
7. **`short-clip-exporter`** (1080x1920 vertical YouTube Shorts & Instagram Reels extraction).

---

## 📐 Autonomous Operating Standards

### Rule 1: Gemini Omni Dynamic Camera Zoom Engine
- **Hook Punch-In (0.0s – 3.5s)**: Immediate spring-driven punch-in from `1.0x` to `1.28x` focused on the speaker's face (`transformOrigin: '50% 30%'`).
- **Attention Reset Cadence**: Every 3 to 5 seconds, toggle between tight framing (`1.20x`) and contextual wide (`1.0x`) during scene transitions.

### Rule 2: Google Veo & Imagen 3 Visual Overlays
- When complex concepts are mentioned (MCP, Fabric IQ, Agentic AI), trigger the `<VeoBRollOverlay />` component to render 3D glowing concept cards.

### Rule 3: Frame-Driven React Animations (Strict)
- **NO** CSS `@keyframes` or CSS `transition` classes.
- Compute all animated values directly from `useCurrentFrame()`, `interpolate()`, and `spring()`.

---

## ⚡ Master Execution Commands

1. **Full Autonomous End-to-End Build & Render**:
   ```bash
   npm run studio:all
   ```
2. **Viral Vertical Reel / Short (1080x1920)**:
   ```bash
   npm run reel
   ```
3. **Live Studio Preview**:
   ```bash
   npm start
   ```
