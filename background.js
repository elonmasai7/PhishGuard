let unsafeUrls = new Set();

// Check URL against Google Safe Browsing API
async function checkUrl(url) {
  const API_KEY = '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'; // Replace with your API key
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

  const requestBody = {
    client: { clientId: "PhishGuard", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    return data.matches ? true : false;
  } catch (error) {
    console.error('API Error:', error);
    return false;
  }
}


chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url).hostname;
    
    // Simple demo check - replace with real API call
    if (url.includes('phishing') || url.includes('malicious')) {
      unsafeUrls.add(url);
      chrome.action.setIcon({ path: "icons/shield-red.png" });
      chrome.tabs.sendMessage(details.tabId, { action: "showWarning" });
      return { cancel: true };
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
