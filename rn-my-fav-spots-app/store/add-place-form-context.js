import { createContext, useState } from "react";

export const AddPlaceFormContext = createContext({
  title: "",
  imageUri: "",
  location: null,
  setTitle: () => {},
  setImageUri: () => {},
  setLocation: () => {},
});

const AddPlaceFormContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [location, setLocation] = useState(null); // { lat: number, lng: number }

  const value = {
    title,
    imageUri,
    location,
    setTitle,
    setImageUri,
    setLocation,
  };

  return <AddPlaceFormContext value={value}>{children}</AddPlaceFormContext>;
};

export default AddPlaceFormContextProvider;
