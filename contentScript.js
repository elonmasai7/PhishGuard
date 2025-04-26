const loadLibraries = () => {
    return new Promise((resolve) => {
      // Load TensorFlow.js first
      const tfScript = document.createElement('script');
      tfScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.18.0/dist/tf.min.js';
      
      tfScript.onload = () => {
        // Load Universal Sentence Encoder after TF.js
        const useScript = document.createElement('script');
        useScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder@1.3.3/dist/universal-sentence-encoder.js';
        
        useScript.onload = resolve;
        document.head.appendChild(useScript);
      };
      
      document.head.appendChild(tfScript);
    });
  };
  
  // Initialize model after libraries load
  let model;
  (async function initModel() {
    await loadLibraries();
    model = await window.use.load();
  })();
  
  // Phishing detection examples
  const phishingExamples = [
    "Your account has been compromised, click here to verify",
    "Urgent: Password reset required immediately",
    "Suspicious login attempt detected, confirm your identity"
  ];
  
  async function analyzeTextWithNLP(pageText) {
    const embeddings = await model.embed([pageText, ...phishingExamples]);
    const similarityMatrix = window.tf.matMul(
      embeddings.slice([0, 0], [1, embeddings.shape[1]]),
      embeddings.slice([1, 0], [phishingExamples.length, embeddings.shape[1]]),
      false, true
    );
    const similarities = await similarityMatrix.data();
    return Math.max(...similarities);
  }
  
  // Combined scanPage function
  async function scanPage() {
    // First check simple keywords
    const phishingKeywords = ["login", "password", "verify", "urgent"];
    const pageText = document.body.innerText.toLowerCase();
    const basicCheck = phishingKeywords.some(keyword => pageText.includes(keyword));
    
    if (basicCheck) {
      document.body.style.border = "5px solid red";
      chrome.runtime.sendMessage({ action: "showWarning" });
      
      // Then run NLP check if model is loaded
      if (model) {
        try {
          const nlpScore = await analyzeTextWithNLP(pageText);
          if (nlpScore > 0.65) {
            chrome.runtime.sendMessage({
              action: "showWarning",
              reason: "AI detected phishing-like language"
            });
          }
        } catch (error) {
          console.error('NLP analysis failed:', error);
        }
      }
    }
  }
  
  // Wait for both libraries and page to load
  window.addEventListener('load', async () => {
    await loadLibraries();
    scanPage();
  });