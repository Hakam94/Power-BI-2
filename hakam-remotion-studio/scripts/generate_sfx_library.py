import os
import sys
import math
import struct
import wave

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs("public/sfx", exist_ok=True)
SAMPLE_RATE = 44100

def write_wav(filename, samples):
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(SAMPLE_RATE)
        packed_samples = [struct.pack('<h', max(-32768, min(32767, int(s * 32767)))) for s in samples]
        wav_file.writeframes(b''.join(packed_samples))

# 1. Cinematic Whoosh / Air Sweep (0.45s)
def create_whoosh():
    dur = 0.45
    n_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        env = math.sin(math.pi * (t / dur)) ** 2
        noise = (math.sin(2 * math.pi * 120 * t) + math.sin(2 * math.pi * 340 * t) + math.sin(2 * math.pi * 680 * t)) / 3.0
        # frequency sweep up then down
        freq = 150 + 700 * math.sin(math.pi * (t / dur))
        tone = math.sin(2 * math.pi * freq * t)
        samples.append(env * (0.6 * tone + 0.4 * noise) * 0.8)
    return samples

# 2. Deep Sub Bass Impact / Thud (0.8s)
def create_bass_impact():
    dur = 0.8
    n_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-6.0 * t)  # Fast punch decay
        freq = 120 * math.exp(-8.0 * t) + 42  # Drops from 160Hz to 42Hz sub
        tone = math.sin(2 * math.pi * freq * t)
        distortion = math.tanh(tone * 1.5)
        samples.append(env * distortion * 0.95)
    return samples

# 3. Clean UI Bubble Pop / Click (0.12s)
def create_pop():
    dur = 0.12
    n_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-35.0 * t)
        freq = 550 + 800 * math.exp(-40.0 * t)
        tone = math.sin(2 * math.pi * freq * t)
        samples.append(env * tone * 0.7)
    return samples

# 4. Futuristic Laser / Digital Pulse (0.25s)
def create_laser_pulse():
    dur = 0.25
    n_samples = int(dur * SAMPLE_RATE)
    samples = []
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        env = math.exp(-14.0 * t)
        freq = 1200 * math.exp(-18.0 * t) + 200
        tone = math.sin(2 * math.pi * freq * t)
        samples.append(env * tone * 0.75)
    return samples

# 5. Cyber-Tech Ambient Background Music Bed (Loopable 20s)
def create_cyber_music_bed():
    dur = 20.0
    n_samples = int(dur * SAMPLE_RATE)
    samples = []
    bpm = 118
    beat_dur = 60.0 / bpm
    
    # Root frequencies (D minor vibe for cyber tech: D=73.4Hz, F=87.3Hz, G=98.0Hz, A=110Hz)
    chords = [73.42, 87.31, 98.00, 110.00]
    
    for i in range(n_samples):
        t = i / SAMPLE_RATE
        chord_idx = int(t / (beat_dur * 4)) % len(chords)
        root_freq = chords[chord_idx]
        
        # Sub pad drone
        pad = 0.25 * math.sin(2 * math.pi * root_freq * t) + 0.15 * math.sin(2 * math.pi * (root_freq * 2) * t)
        
        # Subtle 16th note synth arpeggio tick
        arp_step = int((t % beat_dur) / (beat_dur / 4))
        arp_mult = [1.0, 1.5, 1.33, 2.0][arp_step]
        arp_env = math.exp(-30.0 * (t % (beat_dur / 4)))
        arp_synth = arp_env * 0.12 * math.sin(2 * math.pi * (root_freq * 4 * arp_mult) * t)
        
        # Soft kick pulse on each beat
        kick_t = t % beat_dur
        kick_env = math.exp(-18.0 * kick_t)
        kick_freq = 90 * math.exp(-25.0 * kick_t) + 40
        kick = kick_env * 0.35 * math.sin(2 * math.pi * kick_freq * kick_t)
        
        mix = pad + arp_synth + kick
        samples.append(mix * 0.45)
        
    return samples

print("Generating Hakam Studio Cinematic SFX & Background Music...")
write_wav("public/sfx/whoosh.wav", create_whoosh())
write_wav("public/sfx/bass_impact.wav", create_bass_impact())
write_wav("public/sfx/pop.wav", create_pop())
write_wav("public/sfx/laser.wav", create_laser_pulse())
write_wav("public/sfx/cyber_bgm.wav", create_cyber_music_bed())

print("✅ Generated 5 Studio Audio Assets in public/sfx/:")
print("   • whoosh.wav (Kinetic text zooms)")
print("   • bass_impact.wav (Hook 3-second punch)")
print("   • pop.wav (Badge popups & card entries)")
print("   • laser.wav (Workflow diagram beam pulses)")
print("   • cyber_bgm.wav (20s calibrated background music bed with ducking)")
