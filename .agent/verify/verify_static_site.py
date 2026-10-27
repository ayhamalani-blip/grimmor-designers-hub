import re
from pathlib import Path

root = Path(__file__).resolve().parents[2]
resource_pages = [
    '02 Logo Guidelines.html',
    '03 Logo in Motion.html',
    '04 Opening Film.html',
    '05 Design Guidelines.html',
    '06 Social Media Guidelines.html',
]
required = [
    'index.html', *resource_pages, 'README.txt',
    '.nojekyll', 'grimmor-resource-navigation.js',
    'assets/lottie/grimmor-4A-logo-reveal.json',
    'assets/lottie/grimmor-4G-vermilion-turn.json',
    'assets/svg/grimmor-wordmark.svg',
    'assets/svg/grimmor-wordmark-animated.svg',
    'assets/svg/grimmor-1B-the-turn.svg',
    'assets/svg/grimmor-1B-the-turn-animated.svg',
    'uploads/grimmor_fashion_01_passage.mp4',
    'uploads/grimmor_fashion_02_orbit.mp4',
    'uploads/grimmor_fashion_03_reveal.mp4',
    'uploads/grimmor_fashion_04_threshold.mp4',
]
missing = [path for path in required if not (root / path).is_file()]
if missing:
    raise SystemExit('Missing required files: ' + ', '.join(missing))

index = (root / 'index.html').read_text(encoding='utf-8')
if index.count('grimmor-resource-navigation.js') != 1:
    raise SystemExit('Homepage must load the shared navigation enhancement exactly once.')
for target in resource_pages:
    content = (root / target).read_text(encoding='utf-8')
    if content.count('grimmor-resource-navigation.js') != 1:
        raise SystemExit(f'{target} must load the shared navigation enhancement exactly once.')

script = (root / 'grimmor-resource-navigation.js').read_text(encoding='utf-8')
for needle in [
    'Back to Homepage',
    'focus',
    '05%20Design%20Guidelines.html',
    '06%20Social%20Media%20Guidelines.html',
    'SOCIAL MEDIA GUIDELINES',
]:
    if needle not in script:
        raise SystemExit(f'Shared navigation script is missing required integration: {needle}')

chapter = (root / '06 Social Media Guidelines.html').read_text(encoding='utf-8')
for section in range(1, 20):
    if f'id="c{section}"' not in chapter:
        raise SystemExit(f'Social Media Guidelines is missing section c{section}.')
if 'claude.com' in chapter.lower() or '__claude_design_branding' in chapter:
    raise SystemExit('Social Media Guidelines must not include third-party artifact branding.')

chapter_refs = set(re.findall(r'(?:src|href)=["\']([^"\']+)', chapter))
chapter_refs.update(re.findall(r'url\(["\']?([^\)"\']+)', chapter))
missing_chapter_refs = []
for reference in chapter_refs:
    if reference.startswith(('#', 'http://', 'https://', 'data:', 'mailto:')):
        continue
    if not (root / reference).is_file():
        missing_chapter_refs.append(reference)
if missing_chapter_refs:
    raise SystemExit(
        'Social Media Guidelines has missing local references: '
        + ', '.join(sorted(missing_chapter_refs))
    )

manifest = root / 'assets/social-media-guidelines/MANIFEST.json'
if not manifest.is_file():
    raise SystemExit('Social Media Guidelines asset manifest is missing.')

print('Static navigation and Social Media Guidelines verification passed.')
