import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAelh8UNs473_Jc74YIlSnER5eqaLF8MvM",
  authDomain: "module2-fe024.firebaseapp.com",
  projectId: "module2-fe024",
  storageBucket: "module2-fe024.appspot.com",
  messagingSenderId: "707715432035",
  appId: "1:707715432035:web:18372fbfedf9fd4b174256",
  measurementId: "G-S75K1FSB6M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
  uploadToStorage: async (
    file: File,
    fallBackUrl: string = "https://www.shutterstock.com/image-vector/error-500-page-empty-symbol-260nw-1711106146.jpg"
  ) => {
    try {
      const typeFile = `.${file.type.split("/")[1]}`;
      const fileName = `picture_${Math.ceil(
        Date.now() * Math.random()
      )}${typeFile}`;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const res = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(res.ref)
        .then((res) => res)
        .catch((err) => fallBackUrl);
      return url;
    } catch (err) {
      return fallBackUrl;
    }
  },
};
