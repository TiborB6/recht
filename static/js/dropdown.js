document.addEventListener("DOMContentLoaded", function() {
    awaitOpen();
});

var closedHTML = `
    <button id="menu-button" class="dropbtn">
        <svg id="menu-icon" class="show" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
    </button>
                        
    <div id="dropdown-content" class="dropdown-content closed">
                            
    </div>
`;

var openHTML = `
    <button id="menu-button" class="dropbtn">
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
