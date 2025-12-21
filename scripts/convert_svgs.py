"""
Convert SVGs in `assets/blog/<post>/` to optimized PNGs.

Usage (PowerShell):
    python -m pip install --user cairosvg pillow
    python .\scripts\convert_svgs.py assets/blog/testing123

The script uses cairosvg to render SVG -> PNG, then Pillow to optimize the PNG
by converting to a paletted image (up to 256 colors) and saving with optimize=True.
If cairosvg or Pillow are not installed the script will print instructions.
"""
import os
import sys
import argparse
from pathlib import Path

try:
    import cairosvg
    from PIL import Image
except Exception:
    print("Required packages not found or cairo unavailable. Please install with:")
    print("  python -m pip install --user cairosvg pillow")
    print("If cairosvg import fails due to missing Cairo native libs, install Cairo for your OS or use the Pillow-only renderer script `scripts/render_placeholders.py`.")
    sys.exit(1)


def convert_svg(svg_path: Path, png_path: Path, max_colors: int = 256):
    """Render an SVG to PNG and optimize with Pillow. Returns True on success."""
    print(f"Rendering {svg_path} -> {png_path}")
    try:
        cairosvg.svg2png(url=str(svg_path), write_to=str(png_path))
    except Exception as e:
        print(f"ERROR: rendering failed for {svg_path}: {e}")
        return False

    try:
        img = Image.open(png_path)
        img_q = img.convert('RGBA')
        img_pal = img_q.convert('P', palette=Image.ADAPTIVE, colors=max_colors)
        img_pal.save(png_path, optimize=True)
        print(f"Optimized {png_path}")
    except Exception as e:
        print(f"Warning: optimization failed for {png_path}: {e}")
        # Consider this a success because the PNG was rendered; leave it in place
    return True


def main():
    p = argparse.ArgumentParser(description='Convert SVG files in a folder to PNG and optionally remove SVGs on success.')
    p.add_argument('directory', help='Directory containing SVG files')
    p.add_argument('--keep-svg', action='store_true', help='Do not remove original SVG files after successful conversion')
    p.add_argument('--colors', type=int, default=256, help='Number of colors to quantize PNGs to (default: 256)')
    args = p.parse_args()

    folder = Path(args.directory)
    if not folder.exists() or not folder.is_dir():
        print(f"Directory not found: {folder}")
        sys.exit(1)

    svgs = list(folder.glob('*.svg'))
    if not svgs:
        print("No SVG files found in directory.")
        sys.exit(0)

    failures = []
    converted = []

    for svg in svgs:
        png = svg.with_suffix('.png')
        ok = convert_svg(svg, png, max_colors=args.colors)
        if ok and png.exists() and png.stat().st_size > 0:
            converted.append((svg, png))
        else:
            failures.append(svg)

    # Remove converted svgs unless user asked to keep them
    removed = []
    if not args.keep_svg:
        for svg, png in converted:
            try:
                svg.unlink()
                removed.append(svg)
                print(f"Removed source SVG: {svg}")
            except Exception as e:
                print(f"Warning: failed to remove {svg}: {e}")

    print('\nSummary:')
    print(f"  SVGs found: {len(svgs)}")
    print(f"  Converted to PNG: {len(converted)}")
    print(f"  Removed SVGs: {len(removed)}")
    if failures:
        print('\nThe following SVGs failed to convert and were NOT removed:')
        for f in failures:
            print(f" - {f}")
        sys.exit(2)
    else:
        print('\nAll SVGs converted successfully.')


if __name__ == '__main__':
    main()
