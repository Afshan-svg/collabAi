(function (window) {
    window.YourChatbot = {
        init: function () {
            const scriptTag = document.querySelector('script[src*="customise-chatbot.js"]');
            if (!scriptTag) {
                console.error("Chatbot script tag not found.");
                return;
            }

            const assistantName = scriptTag.getAttribute('data-assistant-name');
            const assistantId = scriptTag.getAttribute('data-assistant-id');
            const color = scriptTag.getAttribute('data-bg-color') || 'rgb(247, 245, 242)';
            const textColor = scriptTag.getAttribute('data-text-color') || '#d1d5db';
            const fontSize = scriptTag.getAttribute('data-font-size') || '16px';
            const themeColor = scriptTag.getAttribute('data-theme-color') || '#0F91F2';

            console.log("Chatbot API initialized with options:", { assistantName, assistantId, color, textColor, fontSize, themeColor });

            // Add FontAwesome stylesheet
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
            document.head.appendChild(link);

            // Create container for chatbot
            const container = document.createElement("div");
            container.id = "assistant-embed-container";
            container.innerHTML = `
                <div id="chatbot-icon" style="position:fixed;bottom:40px;right:50px;width:120px;height:120px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;z-index:9999;">
                    <img src="https://github.com/afshansji/embeded-chatbot/blob/main/Bot%201.png?raw=true" alt="Chatbot" style="width:150px;height:120px;object-fit:contain;" />
                </div>
                <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:510px;height:580px;border:1px solid #ccc;border-radius:10px;display:none;z-index:9999;">
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background: linear-gradient(90deg, #1969E9 0%, #05B8FB 100%);border-top-left-radius:10px;border-top-right-radius:10px;">
                        <h4 style="margin:0;color:white;font-size:16px;">${assistantName} Assistant</h4>
                        <button id="minimize-button" style="border:none;background:transparent;cursor:pointer;font-size:20px;">
                            <i class="fas fa-chevron-down" style="color:#ffffff;"></i>
                        </button>
                    </div>
                    <iframe id="chatbot-iframe" width="100%" height="100%" style="border: none; border-radius: 0 0 10px 10px;" title="Custom Chatbot"></iframe>
                </div>
            `;
            document.body.appendChild(container);

            // Set iframe source
            const iframe = document.getElementById("chatbot-iframe");
            if (!iframe) {
                console.error("Chatbot iframe not found.");
                return;
            }

            const baseURL = `https://tutorgpt.managedcoder.com/assistants/${assistantName}/${assistantId}`;
            const iframeSrc = `${baseURL}?color=${encodeURIComponent(color)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}&themeColor=${encodeURIComponent(themeColor)}&isAuthenticated=true`;
            console.log(`Iframe source set to: ${iframeSrc}`);
            iframe.src = iframeSrc;

            // Icon click handler
            const chatbotIcon = document.getElementById("chatbot-icon");
            chatbotIcon.onclick = function () {
                console.log("Chatbot icon clicked, opening chat window.");
                document.getElementById("assistant-embed").style.display = "block";
                chatbotIcon.style.display = "none";
            };

            // Minimize button handler
            const minimizeButton = document.getElementById("minimize-button");
            minimizeButton.onclick = function () {
                console.log("Minimize button clicked, closing chat window.");
                document.getElementById("assistant-embed").style.display = "none";
                chatbotIcon.style.display = "flex";
            };

            // Update SVG icon color
            function updateSVGColor() {
                const svgPaths = document.querySelectorAll('#chatbot-icon img'); // Update to target correct element
                svgPaths.forEach(path => {
                    path.style.filter = `hue-rotate(${themeColor})`; // Apply theme color
                });
                console.log("SVG icon color updated.");
            }

            // Initialize SVG color
            updateSVGColor();
        }
    };

    window.YourChatbot.init();
})(window);
