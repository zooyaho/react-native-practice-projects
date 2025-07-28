import { GOOGLE_API_KEY } from "@env";

export const getMapPreview = (location) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};
