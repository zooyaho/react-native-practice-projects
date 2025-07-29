import { GOOGLE_API_KEY } from "@env";

/**
 * 주어진 위치 정보를 기반으로 Google Static Maps API를 사용하여 지도 미리보기 이미지 URL을 반환합니다.
 *
 * @param {Object} location - 위치 정보 객체
 * @param {number} location.lat - 위도
 * @param {number} location.lng - 경도
 * @returns {string} 지도 미리보기 이미지의 URL
 */
export const getMapPreview = (location) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${location.lat},${location.lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

/**
 * Google Maps Geocoding API를 사용하여 주어진 위치의 주소를 비동기적으로 가져옵니다.
 *
 * @param {Object} location - 위치 정보 객체
 * @param {number} location.lat - 위도
 * @param {number} location.lng - 경도
 * @returns {Promise<string>} 위치의 주소 (formatted_address)
 * @throws {Error} 주소를 가져올 수 없는 경우 에러 발생
 */
export const getAddress = async (location) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_API_KEY}`
  );

  const data = await response.json();
  if (data.status === "OK") {
    return data.results[0].formatted_address;
  }
  throw new Error("Unable to retrieve address");
};
