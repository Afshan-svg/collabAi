(function () {
  const fontAwesome = document.createElement("link");
  fontAwesome.rel = "stylesheet";
  fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
  document.head.appendChild(fontAwesome);

  const scriptTag = document.currentScript || document.querySelector('script[data-assistant-name][data-assistant-id]');
  const assistantName = scriptTag.getAttribute('data-assistant-name');
  const assistantId = scriptTag.getAttribute('data-assistant-id');
  const container = document.createElement("div");

  container.innerHTML = `
      <div id="assistant-embed-container">
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
          <iframe id="chatbot-iframe" width="100%" height="100%"
              style="border: none; border-radius: 0 0 10px 10px;" title="Custom Chatbot"></iframe>
        </div>
      </div>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform:translateY(0);}
          40% {transform:translateY(-10px);}
          60% {transform:translateY(-5px);}
        }
        #chatbot-icon {
          width: 150px;
          height: 150px;
        }
        #chatbot-icon img {
          width: 130px;
          height: 130px;
          object-fit: cover;
          border-radius: 0;
        }
        
        .container-fluid.CustomFlex {
        display: none !important;
        }
      </style>
  `;
  document.body.appendChild(container);

  if (assistantName && assistantId) {
      document.getElementById("chatbot-iframe").src = `https://collabai.buildyourai.consulting/agents/${assistantId}`;
  } else {
      console.error("Assistant name or ID not provided.");
  }

  document.getElementById("chatbot-icon").onclick = function () {
      document.getElementById("assistant-embed").style.display = "block";
      document.getElementById("chatbot-icon").style.display = "none";
  };
  document.getElementById("minimize-button").onclick = function () {
      document.getElementById("assistant-embed").style.display = "none";
      document.getElementById("chatbot-icon").style.display = "flex";
  };
})();
