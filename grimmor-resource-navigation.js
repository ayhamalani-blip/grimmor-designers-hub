(() => {
  'use strict';

  const resourcePages = new Set([
    '02 Logo Guidelines.html',
    '03 Logo in Motion.html',
    '04 Opening Film.html',
    '05 Design Guidelines.html'
  ]);

  const focusedSections = {
    c: 'Colour',
    d: 'Typography',
    e: 'Layout & grid',
    f: 'Geometry',
    g: 'Depth, transparency & blur',
    h: 'Motion & interaction states',
    k: 'Voice & copy'
  };

  const questionTargets = [
    ['WHICH COLOUR IS MY BUTTON?', 'c'],
    ['WHICH TYPEFACE?', 'd'],
    ['HOW WIDE ARE THE MARGINS?', 'e'],
    ['HOW ROUND IS A CORNER?', 'f'],
    ['TEXT ON A PHOTO?', 'g'],
    ['BRAND OR PRODUCT VOICE?', 'k'],
    ['HOW DOES IT MOVE?', 'h']
  ];

  const filename = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');

  function addStyles() {
    if (document.getElementById('grimmor-resource-navigation-styles')) return;

    const style = document.createElement('style');
    style.id = 'grimmor-resource-navigation-styles';
    style.textContent = `
      #grimmor-back-homepage {
        position: fixed;
        z-index: 2147483647;
        top: 20px;
        left: 20px;
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        padding: 0 16px;
        background: #FFFFFF;
        color: #151515;
        border: 1px solid #151515;
        border-radius: 4px;
        font-family: "DM Sans", Arial, sans-serif;
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
        letter-spacing: 0.10em;
        text-transform: uppercase;
        text-decoration: none;
        white-space: nowrap;
        opacity: 1;
        transition: transform 140ms cubic-bezier(0.2, 0, 0.2, 1), background 180ms cubic-bezier(0.2, 0, 0.2, 1), color 180ms cubic-bezier(0.2, 0, 0.2, 1);
      }
      #grimmor-back-homepage:hover {
        background: #151515;
        color: #FFFFFF;
        opacity: 1;
      }
      #grimmor-back-homepage:active { transform: scale(0.97); }
      #grimmor-back-homepage:focus-visible {
        outline: 2px solid #151515;
        outline-offset: 3px;
      }
      .grimmor-focused-guideline {
        scroll-behavior: auto;
      }
      .grimmor-focused-guideline doc-page > [hidden] {
        display: none !important;
      }
      .grimmor-focus-context {
        margin: 72px 0 24px;
        padding-bottom: 12px;
        border-bottom: 1px solid #E2E2DE;
        color: #5E5E5B;
        font-family: "DM Sans", Arial, sans-serif;
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
        letter-spacing: 0.10em;
        text-transform: uppercase;
      }
      @media (max-width: 600px) {
        #grimmor-back-homepage { top: 12px; left: 12px; }
        .grimmor-focus-context { margin-top: 68px; }
      }
      @media (prefers-reduced-motion: reduce) {
        #grimmor-back-homepage { transition: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function addBackToHomepage() {
    if (!resourcePages.has(filename) || document.getElementById('grimmor-back-homepage')) return;

    const link = document.createElement('a');
    link.id = 'grimmor-back-homepage';
    link.href = 'index.html';
    link.textContent = 'Back to Homepage';
    link.setAttribute('aria-label', 'Back to Homepage');
    document.body.appendChild(link);
  }

  function setFocusedQuestionLinks() {
    if (filename !== 'index.html') return;

    const guidelinePath = '05%20Design%20Guidelines.html';
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      questionTargets.forEach(([question, sectionId]) => {
        if (link.textContent.trim().startsWith(question)) {
          link.setAttribute('href', `${guidelinePath}?focus=${sectionId}#${sectionId}`);
        }
      });
    });
  }

  function applyFocusedGuidelineView() {
    if (filename !== '05 Design Guidelines.html') return;

    const sectionId = new URLSearchParams(window.location.search).get('focus');
    if (!Object.prototype.hasOwnProperty.call(focusedSections, sectionId)) return;

    const page = document.querySelector('doc-page');
    const section = page && page.querySelector(`:scope > .sec#${CSS.escape(sectionId)}`);
    if (!page || !section) return;

    const children = Array.from(page.children);
    const start = children.indexOf(section);
    const nextSection = children.findIndex((node, index) => {
      return index > start && (node.classList.contains('sec') || node.classList.contains('part'));
    });
    const end = nextSection === -1 ? children.length : nextSection;

    children.forEach((node, index) => {
      node.hidden = index < start || index >= end;
    });

    const context = document.createElement('div');
    context.className = 'grimmor-focus-context';
    context.textContent = `Start here / ${focusedSections[sectionId]}`;
    page.insertBefore(context, section);
    document.documentElement.classList.add('grimmor-focused-guideline');
    document.title = `Grimmor — ${focusedSections[sectionId]}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function initialise() {
    addStyles();
    addBackToHomepage();
    setFocusedQuestionLinks();
    applyFocusedGuidelineView();
  }

  function waitForRenderedPage(attemptsRemaining) {
    const needsGuidelinePage = filename === '05 Design Guidelines.html';
    const needsHomepage = filename === 'index.html';
    const homepageReady = !needsHomepage || questionTargets.some(([question]) => {
      return [...document.querySelectorAll('a[href]')].some((link) => {
        return link.textContent.trim().startsWith(question);
      });
    });

    if ((!needsGuidelinePage || document.querySelector('doc-page')) && homepageReady) {
      initialise();
      return;
    }
    if (attemptsRemaining > 0) {
      window.setTimeout(() => waitForRenderedPage(attemptsRemaining - 1), 50);
    }
  }

  waitForRenderedPage(60);
})();
