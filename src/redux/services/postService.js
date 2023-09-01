import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const writePostToFirestore = async (
  previewImage,
  title,
  locationText,
  location
) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      previewImage: previewImage,
      title: title,
      locationText: locationText,
      location: location,
      comments: [],
      likes: 0,
    });
    console.log("Document adding with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};
