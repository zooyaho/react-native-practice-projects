import { createContext, useState } from "react";

export const AddPlaceFormContext = createContext({
  title: "",
  imageUri: "",
  location: null,
  address: "",
  setTitle: () => {},
  setImageUri: () => {},
  setLocation: () => {},
  setAddress: () => {},
  resetForm: () => {},
});

const AddPlaceFormContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [location, setLocation] = useState(null); // { lat: number, lng: number }
  const [address, setAddress] = useState("");

  const resetForm = () => {
    setTitle("");
    setImageUri("");
    setLocation(null);
    setAddress("");
  };

  const value = {
    title,
    imageUri,
    location,
    address,
    setTitle,
    setImageUri,
    setLocation,
    setAddress,
    resetForm,
  };

  return <AddPlaceFormContext value={value}>{children}</AddPlaceFormContext>;
};

export default AddPlaceFormContextProvider;
