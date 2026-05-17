// Function to adjust layout and append HTML based on window width
function adjustLayout() {
    const desire = document.querySelector('.desire');
    const desire2 = document.querySelector('.desire2');
     // Assuming you have a container element for the data

    // Clear any existing content in the container (optional)
    desire.innerHTML = '';
    desire2.innerHTML = '';

    if (window.innerWidth <= 1000) {
        // For small screens (<=1000px), append the desired HTML in a stacked layout
        desire.innerHTML = `
            <div id="header">
                <h1>Software für<br>
                    Wald- und <br>
                    Gartenüberwachung
                </h1>
                <a href="/shop">
                    <button>
                        Unser Angebot
                    </button>
                </a>
            </div>
        `;

        desire2.innerHTML = `
            <div class="data">

            </div>
        `;
    } else {
        // For larger screens (>1000px), append the HTML in a horizontal layout
        desire.innerHTML = `
            <div id="header">
                <h1>Software für<br>
                    Wald- und <br>
                    Gartenüberwachung
                </h1>
                <a href="/shop">
                    <button>
                        Unser Angebot
                    </button>
                </a>
            </div>
    
            <div class="data">

            </div>
        `;
        
        desire2.innerHTML = ``;
    }
}

// Call adjustLayout on page load and when the window is resized
window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);
