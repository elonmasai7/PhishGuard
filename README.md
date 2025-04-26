# 🛡️ PhishGuard: AI-Powered Phishing Detection Chrome Extension

A cybersecurity project built for hackathons that combines real-time URL analysis, NLP-based content scanning, and crowdsourced threat reporting.
![demoscreenshot](https://github.com/user-attachments/assets/c63f2dbb-f326-4c39-b1e0-75a45f4e7b82)


## 🚀 Features
- **Real-Time Phishing Detection**
  - Blocks malicious URLs using Google Safe Browsing API
  - Detects phishing keywords (e.g., "urgent action required")
- **AI-Powered Analysis**
  - Uses TensorFlow.js and Universal Sentence Encoder for NLP
  - Compares page text against known phishing patterns
- **Mock Phishing Demo Site**
  - Test the extension's detection capabilities
- **Crowdsourced Dashboard**
  - View community-reported phishing attempts
- **Educational Popup**
  - Teaches users to spot phishing attempts

## ⚙️ Installation
1. **Clone Repository**
   ```bash
   git clone https://github.com/elonmasai7/PhishGuard.git
   cd phishguard
   ```

2. **Set Up API Keys**
   - Get a [Google Safe Browsing API Key](https://console.cloud.google.com/)
   - Create a Firebase Project (for the dashboard)
   - Add credentials to:
     - `background.js` (Google API key)
     - `firebase.js` (Firebase config)

3. **Load Chrome Extension**
   - Open Chrome → `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked" → Select the `extension/` folder

4. **Run Mock Phishing Site**
   ```bash
   cd mock-phishing-site
   python3 -m http.server 8000
   ```
   Visit `http://localhost:8000/mock-phishing.html`

## 🕹️ Usage
1. **Test Detection**
   - Visit any website or the mock phishing site
   - PhishGuard will:
     - Add red border to suspicious pages
     - Block known malicious URLs
     - Show popup warnings

2. **Report Phishing Attempt**
   - Click extension icon → "Report Phishing Site"
   - Reported URLs appear in the dashboard

3. **View Dashboard**
   ```bash
   cd dashboard
   python3 -m http.server 8001
   ```
   Open `http://localhost:8001/dashboard.html`

## 📁 Project Structure
```
phishguard/
├── extension/               # Chrome extension files
│   ├── manifest.json
│   ├── background.js        # URL checking logic
│   ├── contentScript.js     # Page analysis scripts
│   ├── popup/               # User interface
│   └── icons/
├── mock-phishing-site/      # Demo phishing page
│   └── mock-phishing.html
├── dashboard/               # Reporting dashboard
│   ├── dashboard.html
│   └── dashboard.js
└── README.md
```

## 🛠️ Tech Stack
- **Frontend**: HTML/CSS/JavaScript (Chrome Extension API)
- **AI**: TensorFlow.js, Universal Sentence Encoder
- **Backend**: Firebase (for reporting dashboard)
- **APIs**: Google Safe Browsing API

## 🐛 Troubleshooting
- **Content Security Policy Errors**:
  - Ensure `manifest.json` CSP allows `wasm-unsafe-eval`
  - Use `https://` for all external resources
- **TensorFlow.js Loading Issues**:
  - Check network connectivity
  - Verify CDN URLs in `contentScript.js`
- **Extension Not Loading**:
  - Reload extension after code changes
  - Check Chrome developer console (`Ctrl+Shift+J`)

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License
Distributed under MIT License. See `LICENSE` for details.

## 🙏 Acknowledgments
- FSC Supporting Women in Computing
- Google Developer Student Club
- TensorFlow.js documentation team
