import sys
print('EXE:', sys.executable)
try:
    import cairosvg
    print('cairosvg import: OK')
except Exception as e:
    print('cairosvg import: FAILED', e)
try:
    from PIL import Image
    print('Pillow import: OK')
except Exception as e:
    print('Pillow import: FAILED', e)
