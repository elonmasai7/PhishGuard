import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from 
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Report phishing URL
export async function reportUrl(url) {
  await addDoc(collection(db, "reports"), {
    url,
    timestamp: new Date().toISOString()
  });
}

// Get all reports
export async function getReports() {
  const snapshot = await getDocs(collection(db, "reports"));
  return snapshot.docs.map(doc => doc.data());
}