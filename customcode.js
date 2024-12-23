(function (window) {
    window.YourChatbot = {
        init: function () {
            const scriptTag = document.querySelector('script[src*="customcode.js"]');
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

           
            function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
            }

            const queryThemeColor = getQueryParam('themeColor') || themeColor; 

           
            document.documentElement.style.setProperty('--main-bg-color', queryThemeColor);

          
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.style.backgroundColor = queryThemeColor;
            }

      
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
            document.head.appendChild(link);

            const container = document.createElement("div");
            container.innerHTML = `
                <div id="assistant-embed-container">
                    <div id="chatbot-icon" style="position:fixed;bottom:40px;right:50px;width:150px;height:150px;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:bounce 2s infinite;z-index:9999;">
                        <svg width="256" height="224" viewBox="0 0 256 224" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_9_337)">
<path d="M128.001 41.1676C186.679 41.1676 234.247 82.0972 234.247 132.585C234.247 158.598 221.62 182.073 201.35 198.72C201.609 206.657 204.379 214.514 209.223 220.814C199.832 220.44 190.633 216.697 183.559 210.521C167.394 219.071 148.366 224.001 128.001 224.001C69.3237 224.001 21.7556 183.072 21.7556 132.585C21.7556 82.0972 69.3237 41.1676 128.001 41.1676ZM61.9673 176.882C65.8829 181.197 71.4622 183.622 77.2879 183.622H178.715C184.541 183.622 190.12 181.197 194.036 176.882C205.123 164.664 211.73 149.287 211.73 132.583C211.73 115.879 205.124 100.504 194.037 88.2856C190.121 83.9695 184.542 81.544 178.715 81.544H77.2893C71.3907 81.544 65.7806 84.0578 61.83 88.4354C50.8241 100.629 44.273 115.948 44.273 132.582C44.273 149.216 50.8801 164.662 61.9673 176.881V176.882Z" fill="${themeColor}"/>
<path d="M239.306 132.583C239.306 145.122 236.587 157.282 231.218 168.771C245.563 164.054 256.001 154.718 256.001 132.583C256.001 111.587 245.563 101.112 231.217 96.3953C236.585 107.89 239.306 120.055 239.306 132.583Z" fill="${queryThemeColor}"/>
<path d="M243.609 69.2569V96.6628C247.331 99.0659 250.481 101.963 253.027 105.337C253.049 105.368 253.073 105.396 253.094 105.427V69.2569C253.094 66.6382 250.971 64.5151 248.352 64.5151C245.733 64.5151 243.609 66.6382 243.609 69.2569Z" fill="${queryThemeColor}"/>
<path d="M16.6958 132.583C16.6958 145.122 19.414 157.282 24.7833 168.771C10.4387 164.054 -3.8147e-06 154.718 -3.8147e-06 132.583C-3.8147e-06 111.587 10.4387 101.112 24.7847 96.3953C19.4168 107.89 16.6958 120.055 16.6958 132.583Z" fill="${queryThemeColor}"/>
<path d="M12.3938 69.2569V96.6628C8.67148 99.0659 5.52193 101.963 2.97596 105.337C2.95355 105.368 2.92975 105.396 2.90874 105.427V69.2569C2.90874 66.6382 5.03178 64.5151 7.65057 64.5151C10.2694 64.5151 12.3938 66.6382 12.3938 69.2569Z" fill="${queryThemeColor}"/>
<path d="M150.579 129.749C153.666 134.5 158.119 129.749 167.423 129.749C176.728 129.749 181.18 134.5 184.266 129.749C187.253 125.148 179.012 113.801 167.423 113.801C155.835 113.801 147.593 125.15 150.579 129.749Z" fill="${queryThemeColor}"/>
<path d="M71.7367 129.749C74.8232 134.5 79.2765 129.749 88.5809 129.749C97.8854 129.749 102.337 134.5 105.424 129.749C108.411 125.148 100.169 113.801 88.5809 113.801C76.9924 113.801 68.751 125.15 71.7367 129.749Z" fill="${queryThemeColor}"/>
<path d="M128.001 151.367C134.495 151.367 138.779 146.217 138.958 145.999C139.929 144.811 139.754 143.061 138.566 142.09C137.379 141.12 135.628 141.295 134.658 142.483C134.639 142.504 131.825 145.811 128.001 145.811C124.178 145.811 121.363 142.504 121.335 142.47C120.365 141.282 118.62 141.113 117.432 142.083C116.245 143.054 116.074 144.81 117.046 145.998C117.225 146.217 121.509 151.365 128.003 151.365L128.001 151.367Z" fill="${themeColor}"/>
<path d="M0 1.07551H8.2723V12.7255H19.4841V1.07551H27.7774V30.9153H19.4841V19.5944H8.2723V30.9153H0V1.07551Z" fill="${queryThemeColor}"/>
<path d="M32.5164 19.4838C32.5164 17.8159 32.8231 16.2405 33.4378 14.756C34.0526 13.2716 34.9223 11.9776 36.0482 10.8727C37.1742 9.76781 38.5284 8.89116 40.1081 8.23997C41.6877 7.58878 43.4355 7.26389 45.3512 7.26389C47.267 7.26389 49.0441 7.58598 50.6392 8.22877C52.2329 8.87295 53.5969 9.7496 54.7313 10.8615C55.8642 11.9734 56.7423 13.2716 57.3641 14.756C57.9858 16.2405 58.2967 17.8173 58.2967 19.4838C58.2967 20.0104 58.2715 20.4277 58.2197 20.7344C58.1679 21.041 58.1133 21.3421 58.0559 21.6334H40.5688C40.7592 22.1894 41.0225 22.6935 41.3586 23.1473C41.6947 23.601 42.0756 23.9847 42.5 24.2998C42.9243 24.6149 43.385 24.8557 43.8822 25.0238C44.3793 25.1918 44.8835 25.2759 45.396 25.2759C46.2587 25.2759 46.9869 25.0938 47.5793 24.7269C48.1717 24.3614 48.6142 23.9231 48.9069 23.4105H57.6175C57.3108 24.4202 56.8165 25.4187 56.1359 26.406C55.4553 27.3933 54.5996 28.2783 53.5689 29.0612C52.5382 29.844 51.3338 30.477 49.96 30.9587C48.5848 31.4418 47.0485 31.6827 45.3526 31.6827C43.4369 31.6827 41.6919 31.3564 40.1193 30.7066C38.5466 30.0554 37.198 29.1788 36.0706 28.0739C34.9447 26.969 34.0708 25.6792 33.449 24.2018C32.8273 22.7243 32.5164 21.1517 32.5164 19.4852V19.4838ZM45.396 13.4719C44.2995 13.4719 43.3738 13.7211 42.6204 14.2183C41.867 14.7154 41.2858 15.3806 40.8755 16.2153H49.6085C49.2276 15.382 48.6898 14.7154 47.9952 14.2183C47.3006 13.7211 46.4338 13.4719 45.3947 13.4719H45.396Z" fill="${themeColor}"/>
<path d="M63.124 0H71.154V30.9139H63.124V0Z" fill="${queryThemeColor}"/>
<path d="M76.991 0H85.021V30.9139H76.991V0Z" fill="${queryThemeColor}"/>
<path d="M89.9141 19.4838C89.9141 17.8159 90.2208 16.2405 90.8356 14.756C91.4504 13.2716 92.3201 11.9776 93.446 10.8727C94.5719 9.76781 95.9261 8.89116 97.5058 8.23997C99.0855 7.58878 100.833 7.26389 102.749 7.26389C104.665 7.26389 106.442 7.58598 108.037 8.22877C109.631 8.87295 110.992 9.7496 112.118 10.8615C113.244 11.9734 114.118 13.2716 114.739 14.756C115.361 16.2405 115.672 17.8173 115.672 19.4838C115.672 21.1503 115.361 22.7495 114.739 24.234C114.118 25.7184 113.24 27.0138 112.107 28.1173C110.972 29.2222 109.608 30.0919 108.015 30.7276C106.419 31.3634 104.649 31.6813 102.704 31.6813C100.759 31.6813 99.0659 31.3592 97.4932 30.7164C95.9205 30.0736 94.5747 29.1998 93.4558 28.0949C92.3369 26.9914 91.4658 25.696 90.8454 24.2116C90.2236 22.7271 89.9127 21.1503 89.9127 19.4838H89.9141ZM97.9665 19.4614C97.9665 20.31 98.094 21.0747 98.3503 21.7539C98.6065 22.4344 98.9539 23.0114 99.3922 23.4876C99.8305 23.9637 100.343 24.3292 100.928 24.5841C101.514 24.8403 102.143 24.9678 102.815 24.9678C103.487 24.9678 104.12 24.8403 104.712 24.5841C105.305 24.3278 105.813 23.9623 106.237 23.4876C106.662 23.0128 106.998 22.4344 107.247 21.7539C107.496 21.0733 107.62 20.31 107.62 19.4614C107.62 18.6128 107.495 17.8747 107.247 17.2011C106.998 16.529 106.655 15.9548 106.216 15.4786C105.778 15.0039 105.266 14.6384 104.68 14.3821C104.095 14.1259 103.466 13.9984 102.794 13.9984C102.122 13.9984 101.47 14.1273 100.885 14.3821C100.3 14.6384 99.7913 14.9997 99.36 15.4688C98.9286 15.9366 98.5883 16.5107 98.3391 17.1913C98.0898 17.8719 97.9665 18.6282 97.9665 19.4628V19.4614Z" fill="${themeColor}"/>
<path d="M120.258 27.6454C120.258 27.1048 120.358 26.5964 120.555 26.1203C120.753 25.6456 121.034 25.2283 121.4 24.8698C121.765 24.5112 122.208 24.2256 122.727 24.0141C123.247 23.8026 123.828 23.6962 124.472 23.6962C125.117 23.6962 125.723 23.8026 126.249 24.0141C126.776 24.227 127.226 24.5112 127.598 24.8698C127.971 25.2283 128.256 25.6456 128.454 26.1203C128.651 26.5964 128.751 27.1048 128.751 27.6454C128.751 28.1859 128.651 28.7167 128.454 29.1928C128.256 29.6689 127.971 30.0849 127.598 30.4434C127.226 30.8019 126.775 31.0833 126.249 31.2878C125.723 31.4923 125.131 31.5945 124.472 31.5945C123.814 31.5945 123.251 31.4881 122.739 31.2766C122.226 31.0637 121.784 30.7795 121.411 30.4209C121.039 30.0624 120.753 29.6465 120.555 29.1704C120.358 28.6957 120.258 28.1873 120.258 27.6454ZM120.434 14.5026V1.07551H128.486V14.5474L127.433 21.1951H121.487L120.434 14.5026Z" fill="${themeColor}"/>
</g>
<defs>
<clipPath id="clip0_9_337">
<rect width="256" height="224" fill="white"/>
</clipPath>
</defs>
</svg>
                    </div>
                    <div id="assistant-embed" style="position:fixed;bottom:20px;right:20px;width:424px;height:660px;border:1px solid #ccc;border-radius:10px;display:none;background-color:${color};z-index:9999;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background: ${queryThemeColor};border-top-left-radius:10px;border-top-right-radius:10px;">
                            <h4 style="margin:0;color:${textColor};font-size:16px;">CollabAI Assistant</h4>
                            <button id="minimize-button" style="border:none;background:transparent;cursor:pointer;font-size:20px;">
                                <i class="fas fa-chevron-down" style="color:#ffffff;"></i>
                            </button>
                        </div>
                        <iframe id="chatbot-iframe" width="100%" height="100%" 
                            style="border: none; border-radius: 0 0 10px 10px; background-color: ${color};" 
                            title="Custom Chatbot">
                        </iframe>
                    </div>
                </div>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                        40% {transform: translateY(-10px);}
                        60% {transform: translateY(-5px);}
                    }
                </style>
            `;
            document.body.appendChild(container);

           
            const iframe = document.getElementById("chatbot-iframe");
            if (!iframe) {
                console.error("Chatbot iframe not found.");
                return;
            }

            const baseURL = `https://collaborativeai-dev.managedcoder.com/agents/${assistantId}`;
            const iframeSrc = `${baseURL}?color=${encodeURIComponent(color)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}&themeColor=${encodeURIComponent(queryThemeColor)}&embedded=true`;
            console.log(`Iframe source set to: ${iframeSrc}`);
            iframe.src = iframeSrc;


            const chatbotIcon = document.getElementById("chatbot-icon");
            chatbotIcon.onclick = function () {
                console.log("Chatbot icon clicked, opening chat window.");
                document.getElementById("assistant-embed").style.display = "block";
                chatbotIcon.style.display = "none";
            };

            const minimizeButton = document.getElementById("minimize-button");
            minimizeButton.onclick = function () {
                console.log("Minimize button clicked, closing chat window.");
                document.getElementById("assistant-embed").style.display = "none";
                chatbotIcon.style.display = "flex";
            };
        }
    };

    window.YourChatbot.init();
})(window);
