from pathlib import Path

root = Path(__file__).resolve().parents[2]
required = [
    'index.html', '02 Logo Guidelines.html', '03 Logo in Motion.html',
    '04 Opening Film.html', '05 Design Guidelines.html', 'README.txt',
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
for target in ['02 Logo Guidelines.html', '03 Logo in Motion.html', '04 Opening Film.html', '05 Design Guidelines.html']:
    content = (root / target).read_text(encoding='utf-8')
    if content.count('grimmor-resource-navigation.js') != 1:
        raise SystemExit(f'{target} must load the shared navigation enhancement exactly once.')

script = (root / 'grimmor-resource-navigation.js').read_text(encoding='utf-8')
for needle in ['Back to Homepage', 'focus', '05%20Design%20Guidelines.html']:
    if needle not in script:
        raise SystemExit(f'Shared navigation script is missing required integration: {needle}')
print('Static navigation verification passed.')
