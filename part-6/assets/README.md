# 📁 Part 6 — Complete Video & Project Assets Package

All assets generated for **Part 6: Connecting Power BI MCP to Antigravity AI** on **@HakamDataStudio**.

## 📄 Included Assets:
1. `youtube_video_script_part6.md` - Complete 15-minute video script with 20s hook & chapters.
2. `youtube_thumbnail_16x9_1920x1080.png` - 16:9 Widescreen YouTube Thumbnail (1920x1080).
3. `youtube_shorts_cover_9x16_1080x1920.png` - 9:16 Vertical Shorts / Reels Cover (1080x1920).
4. `hakam_presenter_photo.jpg` - Original presenter photo.
5. `../Cafe-part 6.pbip` - Power BI Developer Mode Project.
6. `../CoffeeShop_Sales_v3.xlsx` - Coffee Shop Sales Excel Dataset.
7. `generate_seedance_broll.py` - Seedance AI script for the single opening hook B-roll clip.
8. `generate_gemini_broll.py` - Gemini (Veo) script that generates the **complete** B-roll package: one branded clip per chapter of `youtube_video_script_part6.md` (hook, tool comparison, PBIP vs PBIX, MCP setup, DAX/TMDL generation, executive dashboard reveal, brand theme test, outro), all sharing one consistent brand style block (colors, presenter look, mood) so every shot matches the channel. Run with `GEMINI_API_KEY` set (`pip install google-genai`); without a key it prints the dummy prompt payloads for review.
9. `build_resolve_timeline.py` - Drives a running **DaVinci Resolve** via its scripting API to auto-assemble the rough cut: imports the trimmed narration onto V1/A1, drops all 8 `generate_gemini_broll.py` clips onto V2 at their chapter timestamps, and adds a chapter marker per scene. Requires Resolve's external scripting enabled (Preferences → System → General) and Resolve open locally. Run: `python build_resolve_timeline.py --narration "path\to\trimmed_narration.mp4"`.
