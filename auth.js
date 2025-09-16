document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- Dropdown Items --- (Select items *inside* the dropdown)
    const loginDropdownItem = document.getElementById('login-dropdown-item');
    const registerDropdownItem = document.getElementById('register-dropdown-item');
    const logoutDropdownItem = document.getElementById('logout-dropdown-item');
    const logoutButton = document.getElementById('logout-button'); // Button inside the item
    const accountToggle = document.getElementById('account-dropdown-toggle'); // The dropdown toggle link itself

    // --- Feature Sections to Control --- Get references at the start
    const translationSection = document.getElementById('translation-section');
    const practiceSection = document.getElementById('practice-section');

    // --- Login Prompt Sections to Control --- Get references at the start
    const loginPromptTranslation = document.getElementById('login-prompt-translation');
    const loginPromptPractice = document.getElementById('login-prompt-practice');

    // --- Check Login Status on Page Load ---
    checkLoginStatus(); // Call immediately

    // --- Event Listeners ---
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    if (logoutButton) { // Listen on the button itself
        logoutButton.addEventListener('click', handleLogout);
    }

    // --- Functions ---
    function handleLogin(event) {
        event.preventDefault();
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        const errorDiv = document.getElementById('login-error');

        const email = emailInput.value;
        const password = passwordInput.value;
        if (errorDiv) {
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';
        }

        // --- !!! SIMULATION ONLY !!! ---
        const registeredUser = localStorage.getItem('signifyUser_email');
        const registeredPass = localStorage.getItem('signifyUser_pass'); // INSECURE!

        if (registeredUser && registeredPass && email === registeredUser && password === registeredPass) {
             console.log('Simulated login successful for:', email);
             localStorage.setItem('isLoggedIn', 'true');
             localStorage.setItem('loggedInUserEmail', email);
              // Redirect to home page after successful login
             window.location.href = 'index.html';
             // If complex redirect logic based on 'intendedPage' is needed, implement here
             // window.location.href = localStorage.getItem('intendedPage') || 'index.html';
             // localStorage.removeItem('intendedPage');
        } else if (!registeredUser && email && password) {
             // Allow login if no user is registered (for demo)
             console.warn('No registered user found in simulation, logging in anyway.');
             localStorage.setItem('isLoggedIn', 'true');
             localStorage.setItem('loggedInUserEmail', email);
             window.location.href = 'index.html'; // Redirect home
             // If complex redirect logic based on 'intendedPage' is needed, implement here
        }
         else {
            console.log('Simulated login failed');
            if (errorDiv) {
                errorDiv.textContent = 'Invalid email or password. (Simulation - Try registering first or check credentials)';
                errorDiv.style.display = 'block';
            }
            if (passwordInput) passwordInput.value = ''; // Clear password field on failure
            if (emailInput) emailInput.focus();
        }
    }

    function handleRegister(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('register-username');
        const emailInput = document.getElementById('register-email');
        const passwordInput = document.getElementById('register-password');
        const errorDiv = document.getElementById('register-error');
        const successDiv = document.getElementById('register-success');

        const username = usernameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const password = passwordInput?.value || '';

        if (errorDiv) {
            errorDiv.style.display = 'none';
            errorDiv.textContent = '';
        }
         if (successDiv) {
            successDiv.style.display = 'none';
            successDiv.textContent = '';
        }

        if (!username || !email || !password) {
             if (errorDiv) {
                 errorDiv.textContent = 'Please fill in all fields.';
                 errorDiv.style.display = 'block';
             }
             return;
        }

        if (password.length < 8) {
            if (errorDiv) {
                errorDiv.textContent = 'Password must be at least 8 characters long.';
                errorDiv.style.display = 'block';
            }
            if (passwordInput) passwordInput.focus();
            return;
        }

        // --- !!! SIMULATION ONLY !!! ---
        console.log('Simulated registration for:', email);
        localStorage.setItem('signifyUser_username', username);
        localStorage.setItem('signifyUser_email', email);
        localStorage.setItem('signifyUser_pass', password); // VERY INSECURE!

        if (successDiv) {
            successDiv.textContent = 'Registration successful! Redirecting to login...';
            successDiv.style.display = 'block';
        }
        if (registerForm) registerForm.reset(); // Clear the form fields

        // Redirect to login page after a short delay
        setTimeout(() => {
           window.location.href = 'login.html';
        }, 2000);
    }

    function handleLogout(event) {
        event.preventDefault(); // Prevent any default button behavior
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUserEmail');
        // Optional: Clear registration details on logout?
        // localStorage.removeItem('signifyUser_username');
        // localStorage.removeItem('signifyUser_email');
        // localStorage.removeItem('signifyUser_pass');
        console.log('User logged out (simulation)');

        checkLoginStatus(); // Update nav dropdown state immediately

        // Check if we are currently on a page that *requires* login
        const requiresLogin = translationSection || practiceSection; // True if either exists on page

        if (requiresLogin) {
            // Reload the page to show the logged-out state (prompts)
             console.log("Reloading page to reflect logged-out state.");
             // Slight delay can sometimes help ensure UI updates before reload starts
             setTimeout(() => window.location.reload(), 50);
        } else {
             // If on a page that doesn't require login (like About, FAQ),
             // optionally redirect to home or login page, or just stay.
             // Currently, just updating the header is sufficient.
             console.log("Logged out on a non-restricted page.");
             // Optional: window.location.href = 'index.html';
        }
    }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        console.log("Auth: checkLoginStatus - isLoggedIn:", isLoggedIn);

        // --- 1. Update Header Dropdown ---
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (isLoggedIn) {
            loginDropdownItem?.style.setProperty('display', 'none', 'important');
            registerDropdownItem?.style.setProperty('display', 'none', 'important');
            logoutDropdownItem?.style.setProperty('display', 'list-item', 'important');
            if (accountToggle) {
                 // Basic text update
                 accountToggle.innerHTML = 'Account <span class="visually-hidden">(Logged In)</span>';
            }
        } else {
            loginDropdownItem?.style.setProperty('display', 'list-item', 'important');
            registerDropdownItem?.style.setProperty('display', 'list-item', 'important');
            logoutDropdownItem?.style.setProperty('display', 'none', 'important');
             if (accountToggle) {
                 accountToggle.innerHTML = 'Account';
             }
        }

        // --- 2. Control Feature Section Visibility & Trigger Webcam Setup ---
        let webcamShouldBeSetup = false; // Reset flag each check

        // --- Handle Translation Section (index.html) ---
        if (translationSection && loginPromptTranslation) { // Ensure elements exist before manipulating
             // Add a data attribute to help identify elements controlled by auth status
            translationSection.dataset.controlledByAuth = 'true';
            loginPromptTranslation.dataset.controlledByAuth = 'true';

            if (isLoggedIn) {
                 console.log("Auth: Showing Translation Section");
                 translationSection.style.display = ''; // Remove inline style to show
                 loginPromptTranslation.style.display = 'none'; // Hide prompt
                 webcamShouldBeSetup = true; // Set flag
            } else {
                 console.log("Auth: Hiding Translation Section, Showing Prompt");
                 translationSection.style.display = 'none'; // Hide feature
                 loginPromptTranslation.style.display = 'block'; // Show prompt
                 // If webcam was running, logout should handle stream stop/reset UI ideally
            }
        } else {
            // console.log("Auth: Translation section or prompt not found on this page.");
        }

        // --- Handle Practice Section (practice.html) ---
        if (practiceSection && loginPromptPractice) { // Ensure elements exist
            practiceSection.dataset.controlledByAuth = 'true';
            loginPromptPractice.dataset.controlledByAuth = 'true';

            if (isLoggedIn) {
                console.log("Auth: Showing Practice Section");
                practiceSection.style.display = ''; // Show feature
                loginPromptPractice.style.display = 'none'; // Hide prompt
                webcamShouldBeSetup = true; // Set flag
            } else {
                 console.log("Auth: Hiding Practice Section, Showing Prompt");
                 practiceSection.style.display = 'none'; // Hide feature
                 loginPromptPractice.style.display = 'block'; // Show prompt
                 // If webcam was running, logout should handle stream stop/reset UI ideally
            }
        } else {
            // console.log("Auth: Practice section or prompt not found on this page.");
        }

        // --- 3. Trigger Webcam Setup ONLY IF logged in AND a webcam section was made visible ---
        if (isLoggedIn && webcamShouldBeSetup) {
             console.log("Auth: Conditions met, attempting to trigger webcam setup...");
             // Use setTimeout to ensure the DOM display change has likely rendered
             // before script.js tries to attach listeners or check visibility.
             setTimeout(() => {
                 if (typeof window.setupWebcamTrigger === 'function') {
                     console.log("Auth: Calling window.setupWebcamTrigger()");
                     window.setupWebcamTrigger();
                 } else {
                     console.error("Auth Error: setupWebcamTrigger function not found on window object. Check script.js load order and exposure.");
                     // Attempt fallback call just in case of timing issues, but flag the error
                     setTimeout(() => {
                          if (typeof window.setupWebcamTrigger === 'function') {
                              console.warn("Auth: Retrying setupWebcamTrigger call...")
                              window.setupWebcamTrigger();
                          } else {
                              console.error("Auth Error: setupWebcamTrigger STILL not found after delay.");
                          }
                     }, 500); // Longer delay for retry
                 }
            }, 100); // 100ms delay after DOM manipulation
        } else if (!isLoggedIn) {
            console.log("Auth: User is not logged in or no webcam section was activated. Webcam setup skipped.");
            // Call reset function if it exists and user logged out, ensuring clean state
             if (typeof window.resetWebcamUI === 'function') {
                 // Pass true to indicate it might be an initial setup (or logout) state
                 // window.resetWebcamUI(true);
             }
        }
    }

}); // END DOMContentLoaded