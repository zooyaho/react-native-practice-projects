import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
class Place {
  constructor(title, imageUri, address, location) {
    this.id = uuidv4();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // { lat: number, lng: number } ex. { lat: 37.7749, lng: -122.4194 }
  }
}

export default Place;
