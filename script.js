// --- Gesture Library ---
const gestureLibrary = {
    // Alphabet (Lowercase keys for easier lookup)
    "a": { interpretation: "A", description: "ASL letter 'A'. A closed fist with the thumb alongside." },
    "b": { interpretation: "B", description: "ASL letter 'B'. Flat hand with fingers together, thumb across the palm." },
    "c": { interpretation: "C", description: "ASL letter 'C'. Hand shaped like a 'C'." },
    "d": { interpretation: "D", description: "ASL letter 'D'. Index finger points up, other fingers and thumb touch to form a circle." },
    "e": { interpretation: "E", description: "ASL letter 'E'. Fingers curled in, thumb tucked underneath, resting on palm." },
    "f": { interpretation: "F", description: "ASL letter 'F'. Thumb and index finger touch (like 'Okay' sign), other fingers point straight up." },
    "g": { interpretation: "G", description: "ASL letter 'G'. Index finger and thumb point sideways, parallel, fist closed." },
    "h": { interpretation: "H", description: "ASL letter 'H'. Like 'G' but index and middle fingers point sideways." },
    "i": { interpretation: "I", description: "ASL letter 'I'. Pinky finger points straight up, fist closed." },
    "j": { interpretation: "J", description: "ASL letter 'J'. Pinky finger ('I' sign) traces the letter 'J' shape in the air." },
    "k": { interpretation: "K", description: "ASL letter 'K'. Middle finger points up, index finger points up/forward, thumb touches middle finger." },
    "l": { interpretation: "L", description: "ASL letter 'L'. Index finger points up, thumb points sideways ('L' shape)." },
    "m": { interpretation: "M", description: "ASL letter 'M'. Thumb tucked under first three fingers (index, middle, ring)." },
    "n": { interpretation: "N", description: "ASL letter 'N'. Thumb tucked under first two fingers (index, middle)." },
    "o": { interpretation: "O", description: "ASL letter 'O'. Hand shaped like an 'O', fingers touching thumb." },
    "p": { interpretation: "P", description: "ASL letter 'P'. Like 'K' but pointing downwards." },
    "q": { interpretation: "Q", description: "ASL letter 'Q'. Like 'G' but pointing downwards." },
    "r": { interpretation: "R", description: "ASL letter 'R'. Index and middle fingers crossed." },
    "s": { interpretation: "S", description: "ASL letter 'S'. Simple closed fist, thumb across the front." },
    "t": { interpretation: "T", description: "ASL letter 'T'. Thumb tucked under index finger only, fist closed." },
    "u": { interpretation: "U", description: "ASL letter 'U'. Index and middle fingers point straight up, touching, fist closed." },
    "v": { interpretation: "V", description: "ASL letter 'V'. Like 'U' but index and middle fingers are spread apart." },
    "w": { interpretation: "W", description: "ASL letter 'W'. Index, middle, and ring fingers point up, spread apart, thumb holds pinky." },
    "x": { interpretation: "X", description: "ASL letter 'X'. Index finger hooked like a question mark, fist closed." },
    "y": { interpretation: "Y", description: "ASL letter 'Y'. Thumb and pinky finger extended ('hang loose' sign)." },
    "z": { interpretation: "Z", description: "ASL letter 'Z'. Index finger draws the letter 'Z' shape in the air." },

    // Common Words/Phrases
    "hello": { interpretation: "Hello 👋", description: "Gesture for 'Hello' or 'Hi'. Typically an open B-hand moving away from the forehead in a salute-like motion, or a simple wave." },
    "wave": { interpretation: "Hello / Bye 👋", description: "Waving hand usually means 'Hello' or 'Goodbye'." },
    "good job": { interpretation: "Good job! 👍", description: "'Thumbs Up' commonly signals approval, 'Good job!', or agreement." },
    "thumbs up": { interpretation: "Good job! 👍", description: "Alias for 'Good job!' gesture." }, // Alias
    "okay": { interpretation: "Okay 👌", description: "The 'Okay' sign (thumb and index finger form a circle) means 'Okay', 'Alright', 'Perfect'." },
    "okay sign": { interpretation: "Okay 👌", description: "Alias for the 'Okay' gesture." }, // Alias
    "stop": { interpretation: "Stop / Wait ✋", description: "An open palm facing outward signifies 'Stop' or 'Wait'." },
    "open palm": { interpretation: "Stop / Wait ✋", description: "Alias for the 'Stop/Wait' gesture." }, // Alias
    "thank you": { interpretation: "Thank You 🙏", description: "Gesture for 'Thank You'. Flat hand moves from the chin forward/downward slightly. (Emoji approx)" },
    "yes": { interpretation: "Yes ✅", description: "Gesture for 'Yes'. Hand shaped like an 'S' fist nods up and down, like a head nodding." },
    "no": { interpretation: "No ❌", description: "Gesture for 'No'. Thumb, index, and middle finger tap together quickly. Or sometimes a simple head shake is used." },
    "please": { interpretation: "Please", description: "Gesture for 'Please'. Flat hand rubs in a circle on the chest." },
    "i love you": { interpretation: "I Love You 🤟", description: "The 'I Love You' gesture combines ASL 'I' (pinky), 'L' (thumb+index), and 'Y' (thumb+pinky) into one sign." },
    "name": { interpretation: "Name", description: "'Name' sign: Both hands use 'H' shape, tap middle fingers together twice." },
    "help": { interpretation: "Help", description: "'Help' sign: One hand (flat palm up) supports the other hand ('A' shape fist) moving upwards." },
    "eat": { interpretation: "Eat / Food", description: "'Eat' or 'Food' sign: Flattened 'O' hand shape taps fingers near the mouth." },
    "drink": { interpretation: "Drink", description: "'Drink' sign: Hand shaped like a 'C' mimics bringing a cup to the mouth." }
};

// --- Gestures for Practice Mode ---
const practiceGestures = [
    "A", "B", "C", "L", "O", "V", "W", "Y",
    "Hello", "Okay", "Thumbs Up", "Thank You", "Yes", "No", "I Love You", "Eat"
];
let currentPracticeGestureIndex = 0;

// --- Main Script Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selectors ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const yearSpan = document.getElementById('current-year');
    const webcamFeed = document.getElementById('webcam-feed'); // Shared webcam element
    const startCamButton = document.getElementById('start-cam-button'); // Home page button
    const startCamButtonPractice = document.getElementById('start-cam-button-practice'); // Practice page button
    const loadingMessage = document.getElementById('loading-message');
    const webcamFallback = document.getElementById('webcam-fallback');
    const permissionPrompt = document.getElementById('permission-prompt'); // Shared permission prompt
    const gestureOutput = document.getElementById('gesture-output'); // Home page output
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Practice Mode Elements
    const targetGestureDisplay = document.getElementById('target-gesture-display');
    const targetGestureName = document.getElementById('target-gesture-name');
    const nextGestureButton = document.getElementById('next-gesture-button');
    const practiceFeedback = document.getElementById('practice-feedback');

    // **NEW**: Get references to the actual feature sections
    const translationSection = document.getElementById('translation-section');
    const practiceSection = document.getElementById('practice-section'); // Needed for visibility checks

    // **NEW**: Get references to the login prompt sections (though not directly used in script.js now)
    // const loginPromptTranslation = document.getElementById('login-prompt-translation');
    // const loginPromptPractice = document.getElementById('login-prompt-practice');

    // --- State ---
    let currentStream = null; // Hold active webcam stream

    // --- Initialization ---
    initializeTheme(); // Set theme on load
    setupNavigation();
    setupChatbot(); // Always setup chatbot elements if present
    updateYear();
    // !! Webcam trigger is NOT called directly anymore. auth.js handles it. !!
    // setupWebcamTrigger(); // <-- REMOVED
    if (document.getElementById('practice-section')) { // Check if practice section *elements* exist for UI setup
        setupPracticeMode(); // Setup "Next" button listener etc.
    }
    setupDarkModeToggle(); // Listener for the theme toggle

    // --- Dark Mode Logic ---
    function initializeTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        updateDarkModeButton(currentTheme === 'dark');
    }

    function setupDarkModeToggle() {
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                const isDarkMode = document.body.classList.toggle('dark-mode');
                const newTheme = isDarkMode ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                updateDarkModeButton(isDarkMode);
            });
        }
    }

    function updateDarkModeButton(isDarkMode) {
        if (darkModeToggle) {
            darkModeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
            darkModeToggle.setAttribute('aria-pressed', String(isDarkMode));
        }
    }

    // --- Navigation Logic ---
    function setupNavigation() {
        // ... (Mobile menu toggle logic remains the same) ...
         if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => { /* ... */ });
            document.addEventListener('click', (event) => { /* ... */ });
         }
        // ... (Active nav link highlighting logic remains the same) ...
        try {
            const currentPath = window.location.pathname;
             // ... (logic to add 'active' class) ...
        } catch (e) { /* ... */ }

        // ... (Dropdown accessibility logic remains the same) ...
        const dropdowns = document.querySelectorAll('.nav-menu .dropdown');
        dropdowns.forEach(dropdown => { /* ... */ });
    }

    // --- Webcam Logic ---

    // Named handlers defined in accessible scope
    function startWebcamForFeed() { startWebcam(webcamFeed); }
    function handlePermissionClick(e) { e.preventDefault(); startWebcam(webcamFeed); }

    // !!! Expose setup and reset functions globally for auth.js !!!
    window.setupWebcamTrigger = function() {
        // Get fresh references inside function scope
        const currentTranslationSection = document.getElementById('translation-section');
        const currentPracticeSection = document.getElementById('practice-section');
        const currentPermissionPrompt = document.getElementById('permission-prompt');
        const permissionButton = currentPermissionPrompt?.querySelector('button');
        const currentStartCamButton = document.getElementById('start-cam-button');
        const currentStartCamButtonPractice = document.getElementById('start-cam-button-practice');

        // Check visibility based on inline style primarily (set by auth.js)
        const translationVisible = currentTranslationSection && currentTranslationSection.style.display !== 'none';
        const practiceVisible = currentPracticeSection && currentPracticeSection.style.display !== 'none';

        if (!translationVisible && !practiceVisible) {
            console.log("Webcam setup skipped: Relevant section not visible.");
            return;
        }

        console.log("Setting up webcam trigger (called by auth)...");
        resetWebcamUI(true); // Start with a clean UI state for webcam elements

        // Cleanup existing listeners first to prevent duplicates
        currentStartCamButton?.removeEventListener('click', startWebcamForFeed);
        currentStartCamButtonPractice?.removeEventListener('click', startWebcamForFeed);
        permissionButton?.removeEventListener('click', handlePermissionClick);

        // Attach listeners ONLY if the button/prompt exists AND the relevant section is visible
        if (currentStartCamButton && translationVisible) {
            console.log("Attaching listener to main start button (Home).");
            currentStartCamButton.addEventListener('click', startWebcamForFeed);
        }
        if (currentStartCamButtonPractice && practiceVisible) {
            console.log("Attaching listener to practice start button.");
            currentStartCamButtonPractice.addEventListener('click', startWebcamForFeed);
        }
        if (permissionButton && (translationVisible || practiceVisible)) {
            console.log("Attaching listener to permission prompt button.");
            permissionButton.addEventListener('click', handlePermissionClick);
        }

        // Show initial permission prompt if applicable
        if (webcamFeed && !currentStream && (translationVisible || practiceVisible)) {
            console.log("Webcam feed element found, showing permission prompt.");
            if (currentPermissionPrompt) currentPermissionPrompt.style.display = 'flex';
            if (currentStartCamButton) currentStartCamButton.style.display = 'none';
            if (currentStartCamButtonPractice) currentStartCamButtonPractice.style.display = 'none';
        } else if (currentStream && webcamFeed && (translationVisible || practiceVisible)) {
            console.log("Stream already active, showing video feed.");
            webcamFeed.style.display = 'block'; // Ensure feed is visible
            if (currentPermissionPrompt) currentPermissionPrompt.style.display = 'none'; // Hide prompt
            if (currentStartCamButton) currentStartCamButton.style.display = 'none';
            if (currentStartCamButtonPractice) currentStartCamButtonPractice.style.display = 'none';
        } else {
            // Ensure prompt is hidden if sections aren't visible or stream exists
            if (currentPermissionPrompt) currentPermissionPrompt.style.display = 'none';
        }
    };

    // Expose reset function too
    window.resetWebcamUI = function(isInitialSetup = false) {
        console.log(`Resetting webcam UI. Initial setup: ${isInitialSetup}`);
        // Refresh references within reset scope
        const currentLoadingMessage = document.getElementById('loading-message');
        const currentWebcamFallback = document.getElementById('webcam-fallback');
        const currentPermissionPrompt = document.getElementById('permission-prompt');
        const currentWebcamFeed = document.getElementById('webcam-feed');
        const currentStartCamButton = document.getElementById('start-cam-button');
        const currentStartCamButtonPractice = document.getElementById('start-cam-button-practice');
        const currentTranslationSection = document.getElementById('translation-section');
        const currentPracticeSection = document.getElementById('practice-section');

        if (currentLoadingMessage) currentLoadingMessage.style.display = 'none';
        if (currentWebcamFallback) currentWebcamFallback.style.display = 'none';
        if (currentPermissionPrompt) currentPermissionPrompt.style.display = 'none';
        if (currentWebcamFeed) currentWebcamFeed.style.display = 'none';

        const translationVisible = currentTranslationSection && currentTranslationSection.style.display !== 'none';
        const practiceVisible = currentPracticeSection && currentPracticeSection.style.display !== 'none';

        // Show the appropriate 'Start' button only if NOT initial setup AND the relevant section is visible
        if (!isInitialSetup) {
            if (currentStartCamButton) {
                currentStartCamButton.style.display = translationVisible ? 'inline-block' : 'none';
            }
            if (currentStartCamButtonPractice) {
                 currentStartCamButtonPractice.style.display = practiceVisible ? 'inline-block' : 'none';
            }
        } else { // If it is initial setup, always hide the start buttons (permission prompt flow)
            if (currentStartCamButton) currentStartCamButton.style.display = 'none';
            if (currentStartCamButtonPractice) currentStartCamButtonPractice.style.display = 'none';
        }
    }


    async function startWebcam(videoElement) {
         console.log("startWebcam function execution begins.");
        if (!videoElement) {
             console.error("Target video element not found for webcam.");
             showWebcamError("Internal error: Cannot find video display area.", null);
             return;
         }
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
             console.error("getUserMedia not supported by this browser.");
             showWebcamError("Webcam access is not supported by your browser.", videoElement);
             return;
         }

        console.log("Resetting UI before requesting stream...");
        resetWebcamUI(false); // Standard reset
        const currentLoadingMessage = document.getElementById('loading-message'); // Refresh selector
        if (currentLoadingMessage) currentLoadingMessage.style.display = 'flex';
         // Ensure buttons are hidden during loading
        const currentStartCamButton = document.getElementById('start-cam-button');
        const currentStartCamButtonPractice = document.getElementById('start-cam-button-practice');
         if (currentStartCamButton) currentStartCamButton.style.display = 'none';
         if (currentStartCamButtonPractice) currentStartCamButtonPractice.style.display = 'none';


        if (currentStream) {
            console.log("Stopping existing stream before starting new one...");
            currentStream.getTracks().forEach(track => track.stop());
            currentStream = null;
        }

        try {
            console.log("Requesting user media (webcam)...");
            currentStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
                audio: false
            });
            console.log("getUserMedia successful. Stream obtained:", currentStream ? currentStream.id : 'N/A');

            videoElement.srcObject = currentStream;
            videoElement.style.display = 'block'; // Show video element itself
            console.log("Stream assigned to video element srcObject.");

            videoElement.onloadedmetadata = async () => {
                 console.log("Video metadata loaded.");
                 // Check for loading message again before hiding
                 const ldMsg = document.getElementById('loading-message');
                try {
                    await videoElement.play();
                    console.log("Video playback started successfully.");
                    if (ldMsg) ldMsg.style.display = 'none'; // Hide loading message
                    console.log("Webcam setup complete.");

                    // --- !!! GESTURE DETECTION INTEGRATION POINT !!! ---
                    console.log(">>> NOW START GESTURE DETECTION <<<");
                    // Example: startGestureRecognition(videoElement, handleGestureDetected);
                    // --- END INTEGRATION POINT ---

                } catch (playError) {
                    console.error("Error occurred during videoElement.play():", playError);
                    if (ldMsg) ldMsg.style.display = 'none'; // Hide loading even on play error
                    showWebcamError(`Could not play webcam feed. Error: ${playError.name}`, videoElement);
                    // Stop the stream if play fails
                    if (currentStream) {
                        currentStream.getTracks().forEach(track => track.stop());
                        currentStream = null;
                    }
                }
            };
            videoElement.onerror = (e) => {
                console.error("Video element reported an error:", e);
                showWebcamError("Video element error occurred.", videoElement);
            }

        } catch (error) {
             console.error("Error during getUserMedia or setup:", error.name, error.message);
             const ldMsg = document.getElementById('loading-message');
             if (ldMsg) ldMsg.style.display = 'none'; // Hide loading on any error
             // ... (Error message formatting remains the same) ...
             let errorMessage = `Could not access webcam. (${error.name})`;
             if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                errorMessage = "Camera permission denied. Please allow access in browser settings & refresh.";
            } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
                errorMessage = "No webcam found. Check if it's connected & enabled.";
            } else if (error.name === "NotReadableError" || error.name === "TrackStartError") {
                errorMessage = "Webcam error (Not Readable). Is it already in use by another app?";
             } else if (error.name === "OverconstrainedError") {
                 errorMessage = `Camera doesn't support requested settings (e.g., resolution). (${error.constraint})`;
             } else if (error.name === "SecurityError") {
                 errorMessage = "Camera access denied due to browser security settings or policy.";
             } else if (error.name === "AbortError") {
                 errorMessage = "Camera request was aborted.";
             }
            showWebcamError(errorMessage, videoElement);
            if (currentStream) { currentStream.getTracks().forEach(track => track.stop()); currentStream = null; }
        }
    }

    function showWebcamError(message, videoElement) {
        console.error("Webcam Error Displayed:", message);
        const currentLoadingMessage = document.getElementById('loading-message');
        const currentPermissionPrompt = document.getElementById('permission-prompt');
        const currentWebcamFallback = document.getElementById('webcam-fallback');

        if (currentLoadingMessage) currentLoadingMessage.style.display = 'none';
        if (currentPermissionPrompt) currentPermissionPrompt.style.display = 'none';

        if (currentWebcamFallback) {
             currentWebcamFallback.textContent = message || "Webcam access issue.";
             currentWebcamFallback.style.display = 'flex'; // Show the error message area
        }

        // Decide which button to show based on which page/section context
        const currentTranslationSection = document.getElementById('translation-section');
        const currentPracticeSection = document.getElementById('practice-section');
        const currentStartCamButton = document.getElementById('start-cam-button');
        const currentStartCamButtonPractice = document.getElementById('start-cam-button-practice');

         // Show the 'Start' button only for the currently *intended* section if applicable
        if (videoElement === webcamFeed) { // Check if error relates to the shared feed
             if (currentTranslationSection && currentTranslationSection.style.display !== 'none' && currentStartCamButton) {
                currentStartCamButton.style.display = 'inline-block'; // Show Home page button
             } else if (currentPracticeSection && currentPracticeSection.style.display !== 'none' && currentStartCamButtonPractice) {
                currentStartCamButtonPractice.style.display = 'inline-block'; // Show Practice page button
             }
        }
     }

    // Placeholder for actual gesture detection result handling
    function handleGestureDetected(gestureName) {
         console.log("Gesture Detected (Simulation/Placeholder):", gestureName);
         const currentGestureOutput = document.getElementById('gesture-output'); // Refresh selector
         const currentPracticeFeedback = document.getElementById('practice-feedback'); // Refresh selector

        if (currentGestureOutput && document.getElementById('translation-section')?.style.display !== 'none') { // Home page visible
            const gestureInfo = Object.values(gestureLibrary).find(g => g.interpretation.toLowerCase().includes(gestureName.toLowerCase()) || g.interpretation.toLowerCase() === gestureName.toLowerCase())
                                || gestureLibrary[gestureName.toLowerCase()]; // Basic lookup
            currentGestureOutput.textContent = gestureInfo ? gestureInfo.interpretation : `? (${gestureName})`; // Show ? if truly unknown
        }

        if (currentPracticeFeedback && document.getElementById('practice-section')?.style.display !== 'none') { // Practice page visible
            const currentTargetDisplay = document.getElementById('target-gesture-display');
            const currentTargetText = currentTargetDisplay?.textContent.trim() || '';

            // Simple check - needs ML confidence score for real feedback
            let feedbackMsg = `Detected: ${gestureName}.`;
             // Try matching detected interpretation (e.g., "Okay 👌") or key ("okay") with target text ("Okay")
            const detectedGestureInfo = Object.values(gestureLibrary).find(g => g.interpretation.toLowerCase().includes(gestureName.toLowerCase()) || g.interpretation.toLowerCase() === gestureName.toLowerCase());
            const detectedInterpOrKey = detectedGestureInfo ? detectedGestureInfo.interpretation.split(' ')[0].toLowerCase() : gestureName.toLowerCase(); // Get first word or key

            if (currentTargetText && detectedInterpOrKey === currentTargetText.toLowerCase()) {
                 feedbackMsg = `Correct! You signed: ${currentTargetText}`;
                 updatePracticeFeedback(feedbackMsg, true); // Pass true for success style
            } else {
                feedbackMsg += ` Target was: ${currentTargetText}. Try again!`;
                updatePracticeFeedback(feedbackMsg, false); // Pass false for default/error style
            }
         }
     }

     // Keep SIMULATION FUNCTION for testing
     window.simulateGesture = function(gestureKeyOrInterp) {
         console.log("Simulating Gesture:", gestureKeyOrInterp);
         // Try to find in library based on key or interpretation text for better handling
          const foundGesture = Object.values(gestureLibrary).find(g =>
               g.interpretation.toLowerCase().startsWith(gestureKeyOrInterp.toLowerCase()) ||
               Object.keys(gestureLibrary).find(key => key === gestureKeyOrInterp.toLowerCase()) === gestureKeyOrInterp.toLowerCase()
          );
          // Use the Interpretation from library if found, otherwise the input itself
         handleGestureDetected(foundGesture ? foundGesture.interpretation : gestureKeyOrInterp);
     }


    // --- Practice Mode UI Logic ---
    function setupPracticeMode() {
         if (!document.getElementById('practice-section')) return; // Check page element again just in case
        console.log("Setting up Practice Mode UI elements (Next Button, etc.).");
        const currentNextButton = document.getElementById('next-gesture-button'); // Refresh selector
        if (currentNextButton && document.getElementById('target-gesture-display') && document.getElementById('target-gesture-name')) {
            currentNextButton.addEventListener('click', showNextPracticeGesture);
            displayPracticeGesture(practiceGestures[currentPracticeGestureIndex]); // Display initial gesture text
        } else {
            console.error("Practice mode UI control elements (Next button, display) not found.");
        }
    }

    function showNextPracticeGesture() {
        currentPracticeGestureIndex = (currentPracticeGestureIndex + 1) % practiceGestures.length;
        displayPracticeGesture(practiceGestures[currentPracticeGestureIndex]);
        // Reset feedback text
         const currentPracticeFeedback = document.getElementById('practice-feedback'); // Refresh selector
         if (currentPracticeFeedback) {
            updatePracticeFeedback("Try making the target sign..."); // Use the update function to reset style too
         }
    }

    function displayPracticeGesture(gestureKey) {
         // Refresh selectors
         const currentTargetDisplay = document.getElementById('target-gesture-display');
         const currentTargetName = document.getElementById('target-gesture-name');
        if (!currentTargetDisplay || !currentTargetName) return;

        // Find the gesture info (more robustly)
        const foundGesture = Object.values(gestureLibrary).find(g =>
               g.interpretation.toLowerCase().startsWith(gestureKey.toLowerCase())
            ) || gestureLibrary[gestureKey.toLowerCase()]; // Find by interp start OR direct key

         const gestureInfo = foundGesture || { interpretation: gestureKey, description: 'Unknown' }; // Fallback

         // Display interpretation without emoji for clarity in target box
        const interpText = gestureInfo.interpretation.replace(/([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}])+/gu, '').trim();
        currentTargetDisplay.textContent = interpText || gestureKey; // Fallback to key if no text part
        currentTargetName.textContent = `(Target: ${gestureKey})`;
        console.log(`Displaying practice gesture: ${gestureKey} (Display text: ${currentTargetDisplay.textContent})`);
    }

    // Update function specifically for practice feedback area (with style indication)
     function updatePracticeFeedback(feedbackText, isSuccess = null) { // Added optional success flag
         const currentPracticeFeedback = document.getElementById('practice-feedback'); // Refresh selector
         if (currentPracticeFeedback) {
            currentPracticeFeedback.textContent = feedbackText;
            const container = currentPracticeFeedback.closest('.output-container'); // Find parent container
            if (container) {
                container.style.transition = 'background-color 0.1s ease-in-out, border-color 0.1s ease-in-out';
                let bgColorVar = '--background-color'; // Default background (from CSS vars)
                let borderColorVar = '--border-color'; // Default border

                if (isSuccess === true) {
                    bgColorVar = '--success-bg';
                    borderColorVar = '--success-border';
                } else if (isSuccess === false) { // Explicitly check for false if needed, null is default
                     bgColorVar = '--error-bg';
                     borderColorVar = '--error-border';
                }

                // Get computed color values
                const computedBgColor = getComputedStyle(document.body).getPropertyValue(bgColorVar).trim();
                 const computedBorderColor = getComputedStyle(document.body).getPropertyValue(borderColorVar).trim();

                container.style.backgroundColor = computedBgColor || '#e9ecef'; // Fallback light mode color
                 container.style.borderColor = computedBorderColor || '#dee2e6'; // Fallback light mode border

                // Reset background and border after a short delay
                setTimeout(() => {
                     const defaultBg = getComputedStyle(document.body).getPropertyValue('--background-color').trim();
                     const defaultBorder = getComputedStyle(document.body).getPropertyValue('--border-color').trim();
                    container.style.backgroundColor = defaultBg || '#e9ecef';
                     container.style.borderColor = defaultBorder || '#dee2e6';
                    }, 600);
            }
        }
    }
    window.updatePracticeFeedback = updatePracticeFeedback; // Expose if needed externally

    // --- Chatbot Logic ---
    function setupChatbot() {
        // ... (Chatbot setup remains largely the same) ...
         if (!chatbotToggle || !chatbotWindow || !chatbotClose || !chatbotMessages || !chatbotInput || !chatbotSend) { /* ... */ return; }
         chatbotToggle.addEventListener('click', () => { /* ... */ });
         chatbotClose.addEventListener('click', () => { /* ... */ });
         chatbotSend.addEventListener('click', handleChatInput);
         chatbotInput.addEventListener('keypress', (e) => { /* ... */ });
         document.addEventListener('click', (event) => { /* ... close on outside click ... */ });
    }

    function handleChatInput() {
        // ... (handleChatInput remains the same) ...
         const userText = chatbotInput.value.trim(); /* ... */ addChatMessage(userText, 'user'); /* ... */ setTimeout(/*...*/);
    }

    function addChatMessage(text, sender) {
        // ... (addChatMessage remains the same) ...
         if (!chatbotMessages) return; /* ... create div, add text, append, scroll ... */
    }

     function getBotResponse(userInput) {
         // ... (getBotResponse logic remains the same, including navigation and gesture info) ...
        const input = userInput.toLowerCase().replace(/[?.,!]/g, '').trim();
         const pages = { /* ... */ };
         for (const pageKey in pages) { /* ... navigation logic ... */ }
         // ... gesture info logic ...
         // ... other commands ...
         return "Fallback message...";
    }

    // --- Footer Year ---
    function updateYear() {
        // ... (Update year remains the same) ...
         if (yearSpan) { try { /*...*/ } catch (e) { /*...*/ } }
    }

    // --- Cleanup on Page Unload ---
    window.addEventListener('beforeunload', () => {
        // ... (Stop stream on unload remains the same) ...
        if (currentStream) {
            console.log("Stopping webcam stream on page unload.");
            currentStream.getTracks().forEach(track => { track.stop(); });
            currentStream = null;
        }
    });

}); // END DOMContentLoaded