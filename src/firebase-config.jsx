import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: "AIzaSyCs3SRTiJPuF8Ca3TdvCyW8xKQ8HZO8AvU",
    authDomain: "shareable-links-edd98.firebaseapp.com",
    projectId: "shareable-links-edd98",
    storageBucket: "shareable-links-edd98.firebasestorage.app",
    messagingSenderId: "186092393905",
    appId: "1:186092393905:web:9ba85cd67e3e5b4a9d9990",
};

const configuration = initializeApp(firebaseConfig);
const db = getFirestore(configuration);

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        "6LcHScAqAAAAAPm8C1Pfl-cH00nN4380RQi3OxRF"
    ),
    isTokenAutoRefreshEnabled: true,
});

export { configuration, db };
