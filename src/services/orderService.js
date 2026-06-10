import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const saveOrder = async (orderData) => {
  try {
    const docRef = await addDoc(
      collection(db, "orders"),
      orderData
    );

    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};