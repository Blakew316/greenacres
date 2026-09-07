#!/usr/bin/env python3
"""Generates favicons, PWA icons, Apple touch icon and iOS splash screens
from assets/brand/gab-logo.png. Run from the repo root:  python3 scripts/make-icons.py
Requires Pillow (pip install pillow)."""
import os, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(ROOT, 'assets/brand/gab-logo.png')
OUT = os.path.join(ROOT, 'assets/icons')
FONT_CANDIDATES = [
    os.path.join(ROOT, 'assets/fonts/Inter-SemiBold.ttf'),
    '/tmp/claude-0/-home-user-greenacres/6f96a96c-9639-5b71-afe6-18313f6146f3/scratchpad/fonts/inter/extras/ttf/Inter-SemiBold.ttf',
    '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
]
NAVY = (16, 48, 64)
BRAND = (32, 88, 120)
WHITE = (255, 255, 255)
os.makedirs(OUT, exist_ok=True)
logo = Image.open(LOGO).convert('RGBA')

def font(size):
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size)
            except Exception: pass
    return ImageFont.load_default()

def vgradient(size, top, bottom):
    w, h = size
    g = Image.new('RGBA', (1, h))
    for y in range(h):
        t = y / max(1, h - 1)
        g.putpixel((0, y), tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3)) + (255,))
    return g.resize((w, h))

def rounded_mask(size, radius):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m

def fit(im, box_w, box_h):
    r = min(box_w / im.width, box_h / im.height)
    return im.resize((max(1, int(im.width * r)), max(1, int(im.height * r))), Image.LANCZOS)

def app_icon(size=1024, maskable=False, text=True):
    """Logo with 'Green Acres / Bowling Alley' beneath, composed as one block that is
    centred exactly in the square (inside the safe zone for maskable icons)."""
    im = vgradient((size, size), (255, 255, 255), (236, 240, 243))
    d = ImageDraw.Draw(im)
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([size * 0.14, size * 0.16, size * 0.86, size * 0.72], fill=BRAND + (26,))
    glow = glow.filter(ImageFilter.GaussianBlur(size * 0.09))
    im.alpha_composite(glow)
    # maskable icons must keep everything inside the inner 80% circle
    inner = size * (0.62 if maskable else 0.82)
    l = fit(logo, inner, inner * 0.42)
    if not text:
        im.alpha_composite(l, (int((size - l.width) / 2), int((size - l.height) / 2)))
        return im
    f = font(int(size * (0.082 if maskable else 0.096)))
    lines = ['Green Acres', 'Bowling Alley']
    boxes = [d.textbbox((0, 0), t, font=f) for t in lines]
    line_h = max(b[3] - b[1] for b in boxes)
    gap_logo = int(size * 0.055)
    gap_line = int(size * 0.022)
    total = l.height + gap_logo + line_h * 2 + gap_line
    y = int((size - total) / 2)
    im.alpha_composite(l, (int((size - l.width) / 2), y))
    y += l.height + gap_logo
    for t, b in zip(lines, boxes):
        tw = b[2] - b[0]
        d.text((int((size - tw) / 2) - b[0], y - b[1]), t, font=f, fill=NAVY)
        y += line_h + gap_line
    return im

def favicon_tile(size):
    """Navy rounded tile with the logo — reads as a brand mark even at 16px."""
    im = vgradient((size, size), BRAND, NAVY)
    l = fit(logo, size * 0.92, size * 0.8)
    im.alpha_composite(l, (int((size - l.width) / 2), int((size - l.height) / 2)))
    r = int(size * 0.22)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), rounded_mask((size, size), r))
    return out

# ---- PWA / Android / desktop icons
base = app_icon(1024)
for s in (512, 384, 192, 144, 96, 72, 48):
    base.resize((s, s), Image.LANCZOS).save(os.path.join(OUT, f'icon-{s}.png'), optimize=True)
app_icon(1024, maskable=True).resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, 'icon-maskable-512.png'), optimize=True)
app_icon(1024, maskable=True).resize((192, 192), Image.LANCZOS).save(os.path.join(OUT, 'icon-maskable-192.png'), optimize=True)
# iOS applies its own rounded mask; keep the ground opaque
base.convert('RGB').resize((180, 180), Image.LANCZOS).save(os.path.join(OUT, 'apple-touch-icon.png'), optimize=True)
base.convert('RGB').resize((167, 167), Image.LANCZOS).save(os.path.join(OUT, 'apple-touch-icon-167.png'), optimize=True)
base.convert('RGB').resize((152, 152), Image.LANCZOS).save(os.path.join(OUT, 'apple-touch-icon-152.png'), optimize=True)

# ---- Browser tab favicons (logo in the tab)
big = favicon_tile(256)
for s in (64, 48, 32, 16):
    big.resize((s, s), Image.LANCZOS).save(os.path.join(OUT, f'favicon-{s}.png'), optimize=True)
big.resize((32, 32), Image.LANCZOS).save(os.path.join(ROOT, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
big.save(os.path.join(OUT, 'favicon-256.png'), optimize=True)

# ---- Shortcut icons (manifest shortcuts) — same ground, glyph-free logo only
app_icon(1024, text=False).resize((96, 96), Image.LANCZOS).save(os.path.join(OUT, 'shortcut-96.png'), optimize=True)

# ---- iOS splash screens (portrait) — logo centred on white
SPLASH = [
    (1320, 2868, 'iphone-16-pro-max'), (1206, 2622, 'iphone-16-pro'), (1290, 2796, 'iphone-15-pro-max'), (1179, 2556, 'iphone-15-pro'), (1284, 2778, 'iphone-14-plus'),
    (1170, 2532, 'iphone-14'), (1125, 2436, 'iphone-x'), (1242, 2688, 'iphone-11-pro-max'),
    (828, 1792, 'iphone-11'), (750, 1334, 'iphone-se'), (2048, 2732, 'ipad-pro-13'), (1668, 2388, 'ipad-pro-11'),
    (1640, 2360, 'ipad-air'), (1620, 2160, 'ipad-10'),
]
for w, h, name in SPLASH:
    im = vgradient((w, h), (255, 255, 255), (243, 246, 248)).convert('RGB')
    l = fit(logo, int(w * 0.62), int(h * 0.25))
    im.paste(l, (int((w - l.width) / 2), int(h * 0.42 - l.height / 2)), l)
    d = ImageDraw.Draw(im)
    f = font(int(w * 0.036))
    txt = 'Green Acres Bowling Alley'
    bb = d.textbbox((0, 0), txt, font=f)
    d.text(((w - (bb[2] - bb[0])) / 2 - bb[0], int(h * 0.42 + l.height / 2 + w * 0.05)), txt, font=f, fill=BRAND)
    im.save(os.path.join(OUT, f'splash-{w}x{h}.png'), optimize=True)

print('icons written to', OUT)
