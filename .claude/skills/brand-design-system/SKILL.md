---
name: brand-design-system
description: Brand design system and visual guidelines for Hakam Data Studio (@HakamDataStudio). Defines typography, exact color tokens (Lime Green #BFFF00, Electric Cyan #00D2FF, Cyber Slate #0D2229), logo placement, Figma design token integration, and motion graphics standards.
---

# Hakam Data Studio Brand Design System

This skill defines the official visual identity, color tokens, logo usage, and Figma integration guidelines for **Hakam Data Studio**.

---

## 1. Official Color Palette & Tokens

- **Brand Primary Accent (Lime Green)**: `#BFFF00`
- **Brand Secondary Accent (Cyber Cyan)**: `#00D2FF`
- **Primary Text**: `#FFFFFF` (Pure White, 900 Heavy Weight)
- **Container Background**: `rgba(13, 34, 41, 0.95)` (Dark Cyber Slate Teal `#0D2229`)
- **Border Accent**: `1.5px solid #00D2FF` or `#BFFF00`

---

## 2. Logo & Badge Guidelines

- **Primary Logo Badge**: Cyber HUD Orbit Play Button (`BrandBadge.tsx`).
- **Overlay Position**: Top-Right Corner (`top: 50px`, `right: 50px`).
- **Watermark Opacity**: `0.95` with soft drop-shadow.

---

## 3. Subtitle & Caption Layout

- **Dual-Language Alignment**:
  - **Top Line**: Active Spoken Arabic Translation (RTL) with Cyan word highlight (`#00D2FF`).
  - **Bottom Line**: Active Spoken English Text (LTR) in Hakam Lime (`#BFFF00`).
- **Word-Level Sync**: Real-time timestamp word tracking (`word.startMs <= currentTimeMs < word.endMs`).
