from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

out = Path('/home/rayan/cprayan/public/hutri81-share.png')
im = Image.new('RGB', (1200, 630), '#080a08')
d = ImageDraw.Draw(im)
red, white, dim, green = '#d92323', '#f4f1e8', '#7d847d', '#72d38d'
mono = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
sans = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
mono_b = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'

def font(path, size): return ImageFont.truetype(path, size)

# Indonesian flag header.
d.rectangle((0, 0, 1200, 22), fill=red)
d.rectangle((0, 22, 1200, 44), fill=white)
# Terminal chrome.
d.rectangle((55, 62, 1145, 568), outline='#303630', width=2)
d.rectangle((55, 62, 1145, 111), fill='#111511', outline='#303630', width=2)
for x, c in ((82, '#ff5f57'), (105, '#febc2e'), (128, '#28c840')):
    d.ellipse((x, 80, x+14, 94), fill=c)
d.text((165, 75), 'root@nusantara: ~/indonesia_emas.py', font=font(mono, 22), fill=white)
d.text((1010, 78), '[ BETA ]', font=font(mono, 17), fill=red)
# Main campaign copy.
d.text((95, 145), 'const HUT_RI = new Date("1945-08-17");', font=font(mono, 23), fill=green)
d.text((95, 205), 'DIRGAHAYU', font=font(sans, 64), fill=white)
d.text((95, 280), 'REPUBLIK INDONESIA', font=font(sans, 61), fill=red)
d.text((98, 372), 'INDONESIA EMAS', font=font(mono_b, 36), fill=white)
d.text((98, 423), 'HUT RI KE-81  ::  kritik() == health_check()', font=font(mono, 22), fill=dim)
# Right-side Python status.
d.line((805, 145, 805, 505), fill='#303630', width=2)
lines = [
    ('@dataclass', green),
    ('class IndonesiaEmas(Beta):', white),
    ('    stability = 0.42', red),
    ('    production_ready = False', red),
    ('', white),
    ('    # kritik bukan bug', dim),
    ('    # perubahan bukan slogan', dim),
    ('', white),
    ('raise RuntimeError(', white),
    ('    "CHANGE_REQUIRED")', red),
]
y = 157
for text, color in lines:
    d.text((845, y), text, font=font(mono, 19), fill=color)
    y += 31
# Bottom terminal status.
d.line((95, 512, 1105, 512), fill='#303630', width=2)
d.text((95, 532), 'python3 indonesia_emas.py --year=81', font=font(mono, 18), fill=dim)
d.text((885, 532), 'PID=1945', font=font(mono, 18), fill=green)
im.save(out, 'PNG', optimize=True)
print(out)
