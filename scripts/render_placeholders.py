"""
Render PNG placeholders for testing123 without relying on cairosvg (uses Pillow only).
Usage:
    python .\scripts\render_placeholders.py assets/blog/testing123
"""
import sys
import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

DEFAULT_FONT_SIZE = 24

def load_font(size):
    try:
        return ImageFont.truetype("arial.ttf", size)
    except Exception:
        try:
            return ImageFont.load_default()
        except Exception:
            return None

def render_left(path: Path):
    w, h = 600, 400
    img = Image.new('RGB', (w, h), '#e2e8f0')
    draw = ImageDraw.Draw(img)
    font = load_font(28)
    draw.text((20, 30), 'Left-aligned image', fill='#0f172a', font=font)
    draw.rounded_rectangle((20, 60, 280, 240), radius=6, fill='#94a3b8')
    img.save(path, optimize=True)
    print('Wrote', path)

def render_center(path: Path):
    w, h = 960, 360
    img = Image.new('RGB', (w, h), '#f8fafc')
    draw = ImageDraw.Draw(img)
    font = load_font(32)
    draw.text((24, 40), 'Centered image', fill='#0f172a', font=font)
    draw.rounded_rectangle((24, 80, 936, 280), radius=6, fill='#cbd5e1')
    img.save(path, optimize=True)
    print('Wrote', path)

def render_right(path: Path):
    w, h = 500, 350
    img = Image.new('RGB', (w, h), '#eef2ff')
    draw = ImageDraw.Draw(img)
    font = load_font(26)
    draw.text((20, 30), 'Right-aligned image', fill='#0f172a', font=font)
    draw.rounded_rectangle((20, 70, 320, 250), radius=6, fill='#93c5fd')
    img.save(path, optimize=True)
    print('Wrote', path)


def main():
        p = argparse.ArgumentParser(description='Render PNG placeholders using Pillow and optionally remove source SVGs.')
        p.add_argument('directory', help='Directory to write PNGs into')
        p.add_argument('--keep-svg', action='store_true', help='Do not remove original SVG files after rendering')
        args = p.parse_args()

        folder = Path(args.directory)
        folder.mkdir(parents=True, exist_ok=True)
        render_left(folder / 'left.png')
        render_center(folder / 'center.png')
        render_right(folder / 'right.png')

        # Post-processing: remove SVGs that have matching PNGs, warn for SVGs without PNGs
        svgs = list(folder.glob('*.svg'))
        removed = []
        failures = []
        for svg in svgs:
            png = svg.with_suffix('.png')
            if png.exists() and png.stat().st_size > 0:
                if not args.keep_svg:
                    try:
                        svg.unlink()
                        removed.append(svg)
                        print(f"Removed source SVG: {svg}")
                    except Exception as e:
                        print(f"Warning: failed to remove {svg}: {e}")
            else:
                failures.append(svg)

        print('\nSummary:')
        print(f"  PNGs written: 3")
        print(f"  SVGs found: {len(svgs)}")
        print(f"  Removed SVGs: {len(removed)}")
        if failures:
            print('\nThe following SVGs had no corresponding PNG and were NOT removed:')
            for f in failures:
                print(f" - {f}")
            sys.exit(2)
        else:
            print('\nDone.')

if __name__ == '__main__':
    main()
