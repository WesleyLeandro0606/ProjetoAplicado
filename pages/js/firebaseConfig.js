
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  

  const firebaseConfig = {
    apiKey: "AIzaSyAikI5eGdi_3xo-G3VNjIRf7SNrb24TY08",
    authDomain: "projeto-aplicado-87f85.firebaseapp.com",
    projectId: "projeto-aplicado-87f85",
    storageBucket: "projeto-aplicado-87f85.firebasestorage.app",
    messagingSenderId: "691018195412",
    appId: "1:691018195412:web:267083498425dc08c87641",
    measurementId: "G-B21GQF23QT"
  };

  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
