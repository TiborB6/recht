document.addEventListener("DOMContentLoaded", function() {
    awaitOpen();
});

var closedHTML = `
    <button id="menu-button" class="dropbtn" aria-label="Menu" aria-expanded="false">
        <svg id="menu-icon" class="show" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
    </button>
                        
    <div id="dropdown-content" class="dropdown-content closed">
                            
    </div>
`;

var openHTML = `
    <button id="menu-button" class="dropbtn" aria-label="Close menu" aria-expanded="true">
        <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>    
    </button>
                        
    <div id="dropdown-content" class="dropdown-content open">
        <ul>
            <li><a href="/"><p>Home</p></a><div></div></li>
            <li><a href="/services"><p>Services</p></a><div></div></li>
            <li><a href="/kontakt"><p>Kontakt</p></a><div></div></li>
        </ul>   
    </div>
`;

function initResponsiveMenu() {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    // Wenn sich der Breakpoint‑Status nicht geändert hat, nichts tun
    if (currentBreakpointMatch === isMobile) return;
    currentBreakpointMatch = isMobile;

    if (isMobile) {
        // Menü nur einfügen, wenn es noch nicht existiert
        if (!isMenuInitialized) {
            insertMobileMenu();
            isMenuInitialized = true;
        }
    } else {
        // Menü entfernen, wenn es existiert
        if (isMenuInitialized) {
            removeMobileMenu();
            isMenuInitialized = false;
        }
    }
}

function insertMobileMenu() {
    const dropdownContainer = document.getElementById("dropdown");
    if (!dropdownContainer) return;

    // Inhalt mit geschlossenem Menü befüllen
    dropdownContainer.innerHTML = closedHTML; // dein closedHTML von oben

    const openButton = document.getElementById("menu-button");
    if (openButton) {
        openButton.addEventListener("click", awaitClose);
    }
}

function removeMobileMenu() {
    const dropdownContainer = document.getElementById("dropdown");
    if (dropdownContainer) {
        // Event‑Listener manuell entfernen (wichtig!)
        const oldButton = document.getElementById("menu-button");
        if (oldButton) {
            oldButton.removeEventListener("click", awaitClose);
            // falls auch andere Listener existieren, hier entfernen
        }
        // Container leeren
        dropdownContainer.innerHTML = "";
    }

    // Globalen Click‑Outside‑Listener aufräumen (falls aktiv)
    window.removeEventListener("click", handleClickOutside);
}

function awaitOpen() {
    var dropdownContent = document.getElementById("dropdown");
    if (dropdownContent) {
        dropdownContent.innerHTML = closedHTML;

        var openButton = document.getElementById("menu-button");
        if (openButton) {
            openButton.addEventListener("click", awaitClose);
        }
    }
}

function awaitClose(event) {
    var dropdownContent = document.getElementById("dropdown");
    if (dropdownContent) {
        dropdownContent.innerHTML = openHTML;

        var closeButton = document.getElementById("menu-button");
        if (closeButton) {
            closeButton.addEventListener("click", awaitOpen);
        }

        window.addEventListener("click", handleClickOutside);
    }

    // Prevent event propagation to avoid immediate re-close
    event.stopPropagation();
}

function handleClickOutside(event) {
    var dropdownContent = document.getElementById("dropdown");
    if (dropdownContent && !dropdownContent.contains(event.target)) {
        awaitOpen();
        window.removeEventListener("click", handleClickOutside);
    }
}
