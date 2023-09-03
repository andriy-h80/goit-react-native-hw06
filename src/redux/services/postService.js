import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const writePostToFirestore = async (
  previewImage,
  title,
  locationName,
  location
) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      previewImage: previewImage,
      title: title,
      locationName: locationName,
      location: location,
      comments: [],
      likes: 0,
    });
    console.log("Document adding with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};
