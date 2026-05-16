// ==UserScript==
// @name         Spotify Ad Skip
// @namespace    https://github.com/snarrow/spotify-ad-refresh
// @version      1.0
// @description  Detect Spotify ads and refresh the page to skip them, then resume playback
// @author       snarrow
// @match        https://open.spotify.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function () {
  'use strict';
  console.log("spotify-ad-refresh running")

  const RESUME_KEY = 'spotify-ad-resume';
  const REFRESHING_KEY = 'spotify-ad-refreshing';
  // -- Post-refresh: resume playback --------------------------------------------------
  if (localStorage.getItem(RESUME_KEY)) {
    localStorage.removeItem(RESUME_KEY);
    resumePlayback();
    return;
  }

  // -- Ad detection loop --------------------------------------------------------------
  setInterval(() => {
    if (sessionStorage.getItem(REFRESHING_KEY)) return;

    const isAd =
      document.querySelector('[data-testadtype="ad-type-ad"]')

    if (isAd) {
      console.log("spotify-ad-refresh refresh")
      sessionStorage.setItem(REFRESHING_KEY, '1');
      localStorage.setItem(RESUME_KEY, '1');
      location.reload();
    }
  }, 1500);

  // -- Resume helper ------------------------------------------------------------------
  function resumePlayback() {
    let attempts = 0;
    const maxAttempts = 20;

    const tryPlay = setInterval(() => {
      attempts++;
      const btn =
        document.querySelector('[data-testid="control-button-playpause"]');

      if (btn && !btn.disabled && btn.getAttribute('aria-label') === 'Play' || btn.getAttribute('aria-label') === '播放') {
        btn.click();
        clearInterval(tryPlay);
        console.log("spotify-ad-refresh play")
        return;
      }
      const playAll = document.querySelector('[data-testid="play-button"]')
      if (playAll) {
        playAll.click()
        clearInterval(tryPlay);
        console.log("spotify-ad-refresh play")
        return;
      }

      if (attempts >= maxAttempts) {
        clearInterval(tryPlay);
      }
    }, 500);
  }
})();
