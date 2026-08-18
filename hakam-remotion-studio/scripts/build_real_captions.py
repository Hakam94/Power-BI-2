import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')


def load(name):
    with open(os.path.join(PUBLIC, name), 'r', encoding='utf-8') as f:
        return json.load(f)


def build_clips(speech_data):
    # Output position in the edited TransitionSeries is the cumulative sum of
    # preceding clips' KEPT durations — NOT `trimBefore`, which is a source-video
    # offset (roughly equal to srcStartSec) and unrelated to where the clip lands
    # in the final timeline once silence has been cut out.
    fps = speech_data.get('fps', 30)
    clips_sorted = sorted(speech_data['clips'], key=lambda c: c['srcStartSec'])
    clips = []
    cumulative_frames = 0
    for c in clips_sorted:
        output_start_frame = cumulative_frames
        cumulative_frames += c['durationFrames']
        clips.append({
            'sourceStartMs': round(c['srcStartSec'] * 1000),
            'sourceEndMs': round(c['srcEndSec'] * 1000),
            'outputStartMs': round((output_start_frame / fps) * 1000),
            'outputEndMs': round((cumulative_frames / fps) * 1000),
        })
    return clips


def overlap(a_start, a_end, b_start, b_end):
    return max(0, min(a_end, b_end) - max(a_start, b_start))


def remap_word(clips, start_ms, end_ms):
    best_clip = None
    best_overlap = 0
    for clip in clips:
        ov = overlap(start_ms, end_ms, clip['sourceStartMs'], clip['sourceEndMs'])
        if ov > best_overlap:
            best_overlap = ov
            best_clip = clip
    if best_clip is None:
        return None
    clamped_start = max(start_ms, best_clip['sourceStartMs'])
    clamped_end = min(end_ms, best_clip['sourceEndMs'])
    out_start = best_clip['outputStartMs'] + (clamped_start - best_clip['sourceStartMs'])
    out_end = best_clip['outputStartMs'] + (clamped_end - best_clip['sourceStartMs'])
    if out_end <= out_start:
        out_end = out_start + 40
    return out_start, out_end


def best_english_for_segment(seg_start, seg_end, en_segments):
    best = None
    best_ov = 0
    for en in en_segments:
        ov = overlap(seg_start, seg_end, en['startMs'], en['endMs'])
        if ov > best_ov:
            best_ov = ov
            best = en
    if best is not None:
        return best['text'].strip()
    # fallback: nearest by start time
    nearest = min(en_segments, key=lambda e: abs(e['startMs'] - seg_start), default=None)
    return nearest['text'].strip() if nearest else ''


def escape_ts(s):
    return s.replace('\\', '\\\\').replace("'", "\\'")


def main():
    speech_data = load('speech_segments.json')
    ar_segments = load('whisper_full_ar.json')
    en_segments = load('whisper_full_en.json')
    clips = build_clips(speech_data)

    caption_segments = []
    dropped_words = 0
    kept_words = 0

    for idx, seg in enumerate(ar_segments):
        remapped_words = []
        for w in seg['words']:
            remapped = remap_word(clips, w['startMs'], w['endMs'])
            if remapped is None:
                dropped_words += 1
                continue
            out_start, out_end = remapped
            remapped_words.append({
                'text': w['text'],
                'startMs': out_start,
                'endMs': out_end,
            })
            kept_words += 1

        if not remapped_words:
            continue

        seg_start_ms = remapped_words[0]['startMs']
        seg_end_ms = remapped_words[-1]['endMs']
        arabic_text = ' '.join(w['text'] for w in remapped_words)
        english_text = best_english_for_segment(seg['startMs'], seg['endMs'], en_segments).upper()

        caption_segments.append({
            'id': f'seg-{idx}',
            'startMs': seg_start_ms,
            'endMs': seg_end_ms,
            'arabic': arabic_text,
            'english': english_text,
            'words': remapped_words,
        })

    caption_segments.sort(key=lambda s: s['startMs'])

    # Drop any segment that starts before the previous segment's end (defensive, keeps validator happy)
    cleaned = []
    prev_end = -1
    for seg in caption_segments:
        if seg['startMs'] < prev_end:
            seg['startMs'] = prev_end
        if seg['endMs'] <= seg['startMs']:
            continue
        cleaned.append(seg)
        prev_end = seg['endMs']

    print(f"Segments: {len(cleaned)} | words kept: {kept_words} | words dropped (in cut silence): {dropped_words}")

    lines = ["import { CaptionSegment } from './captionTypes';", '',
             'export const FULL_VIDEO_CAPTIONS: CaptionSegment[] = [']
    for seg in cleaned:
        lines.append('  {')
        lines.append(f"    id: '{seg['id']}',")
        lines.append(f"    startMs: {seg['startMs']},")
        lines.append(f"    endMs: {seg['endMs']},")
        lines.append(f"    arabic: '{escape_ts(seg['arabic'])}',")
        lines.append(f"    english: '{escape_ts(seg['english'])}',")
        lines.append('    words: [')
        word_lines = []
        for w in seg['words']:
            word_lines.append(
                f"      {{ text: '{escape_ts(w['text'])}', startMs: {w['startMs']}, endMs: {w['endMs']} }}"
            )
        lines.append(',\n'.join(word_lines))
        lines.append('    ],')
        lines.append('  },')
    lines.append('];')
    lines.append('')

    out_path = os.path.join(ROOT, 'src', 'captions', 'captionData.ts')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Wrote {out_path}")


if __name__ == '__main__':
    main()
