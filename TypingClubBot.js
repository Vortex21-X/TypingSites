/**
 * This script types for you automatically on www.typingclub.com:
 * 1. Open the website
 * 2. Blaze past the tutorials
 * 3. Go into a level
 * 4. Open Console
 * 5. Paste the script and press ENTER
 */

// NOTE: When delay (in ms between two strokes) is too low, the site might bug out and the result page will not be shown
const minDelay = 60;
const maxDelay = 60;

const keyOverrides = {
  [String.fromCharCode(160)]: ' '    // convert hardspace to normal space
};

function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  const chrs = els
    .map(el => {
      // get letter to type from each letter DOM element
      if (el.firstChild?.classList?.contains('_enter')) {
        // special case: ENTER
        return '\n';
      }
      let text = el.textContent[0];
      return text;
    })
    .map(c => keyOverrides.hasOwnProperty(c) ? keyOverrides[c] : c); // convert special characters
  return chrs;
}

function recordKey(chr) {
  // send it straight to the internal API
  window.core.record_keydown_time(chr);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function autoPlay() {
  const chrs = getTargetCharacters();
  if (chrs.length === 0) {
    // No characters to type, move to the next level
    goToNextLevel();
    return;
  }

  for (let i = 0; i < chrs.length; ++i) {
    const c = chrs[i];
    recordKey(c);
    await sleep(Math.random() * (maxDelay - minDelay) + minDelay);
  }

  // After auto-typing ends, automatically move to the next level
  goToNextLevel();
}

// Function to click the button that moves to the next level
function goToNextLevel() {
  // Wait a bit after typing before attempting to go to the next level
  setTimeout(async () => {
    const nextButton = Array.from(document.querySelectorAll('span')).find(el => el.textContent === '→');
    if (nextButton) {
      nextButton.click(); // Simulate click to proceed to the next level
      console.log('Moving to next level...');

      // Wait for the next level to load before starting the typing again
      await sleep(1000); // Adjust this delay if necessary
      autoPlay(); // Call autoPlay again for the next level
    } else {
      console.log('Next level button not found.');
    }
  }, 2000); // Adjust the delay before going to the next level if needed
}

// ############################################################################################################
// go!
// ############################################################################################################

autoPlay();
