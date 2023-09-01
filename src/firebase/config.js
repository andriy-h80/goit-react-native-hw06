// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR7IB3mdtuRl1yXBPZoTSQ3REfTKYkbDU",
  authDomain: "my-awesome-project-80.firebaseapp.com",
  databaseURL: "https://my-awesome-project-80-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-awesome-project-80",
  storageBucket: "my-awesome-project-80.appspot.com",
  messagingSenderId: "932758701593",
  appId: "1:932758701593:web:6fe677c6d859a983210c88",
  measurementId: "G-DT6F7F5E8K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
