(() => {
  'use strict';

  const playControlTitle = 'Play/pause (space)';
  const restartControlTitle = 'Return to start (0)';
  const restartDelay = 80;
  let replayDispatchInProgress = false;

  function findControl(title) {
    return [...document.querySelectorAll('button')].find((button) => button.title === title) || null;
  }

  function playControlShowsPlay(button) {
    if (!button) return false;

    const hasPlayGlyph = Boolean(button.querySelector('path[d*="M3 2l9 5"]'));
    if (hasPlayGlyph) return true;

    const videos = [...document.querySelectorAll('video')];
    return videos.length > 0 && videos.every((video) => video.paused || video.ended);
  }

  function restartAndPlay() {
    const restartControl = findControl(restartControlTitle);
    if (!restartControl || replayDispatchInProgress) return false;

    replayDispatchInProgress = true;
    restartControl.click();

    window.setTimeout(() => {
      document.querySelectorAll('video').forEach((video) => {
        try {
          video.currentTime = 0;
        } catch (_) {
          // The player reset control already handles unloaded scene media.
        }
      });

      const playControl = findControl(playControlTitle);
      if (playControl) playControl.click();
      window.setTimeout(() => {
        replayDispatchInProgress = false;
      }, 0);
    }, restartDelay);

    return true;
  }

  function interceptPlayRequest(event) {
    if (replayDispatchInProgress) return;

    const target = event.target instanceof Element ? event.target.closest(`button[title="${playControlTitle}"]`) : null;
    if (!target || !playControlShowsPlay(target)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    restartAndPlay();
  }

  function interceptKeyboardPlay(event) {
    if (event.code !== 'Space' || event.repeat || replayDispatchInProgress) return;
    if (event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;

    const playControl = findControl(playControlTitle);
    if (!playControlShowsPlay(playControl)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    restartAndPlay();
  }

  document.addEventListener('click', interceptPlayRequest, true);
  document.addEventListener('keydown', interceptKeyboardPlay, true);
})();
