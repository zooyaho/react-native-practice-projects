import * as SQLite from "expo-sqlite";

let placesDB = null;

const getDB = async () => {
  if (!placesDB) {
    placesDB = await SQLite.openDatabaseAsync("places.db");
  }
  return placesDB;
};

export const initPlacesDB = async () => {
  const db = await getDB();
  try {
    await db.execAsync(`DROP TABLE IF EXISTS places;`); // 기존 테이블 삭제
    await db.execAsync(`PRAGMA journal_mode = WAL;`);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )
    `);
    console.log("DB 초기화 성공");
  } catch (error) {
    console.error("DB 초기화 실패:", error);
    throw error;
  }
};

function escapeQuotes(str) {
  if (typeof str !== "string") return "";
  return "'" + str.replace(/'/g, "''") + "'";
}

export const insertPlaceDB = async (place) => {
  const db = await getDB();

  const lat = Number(place.location.lat);
  const lng = Number(place.location.lng);

  if (isNaN(lat) || isNaN(lng)) {
    throw new Error("Invalid latitude or longitude value");
  }

  const safeId = escapeQuotes(place.id);
  const safeTitle = escapeQuotes(place.title);
  const safeImageUri = escapeQuotes(place.imageUri);
  const safeAddress = escapeQuotes(place.address);

  const sql = `
    INSERT INTO places (id, title, imageUri, address, lat, lng)
    VALUES (
      ${safeId},
      ${safeTitle},
      ${safeImageUri},
      ${safeAddress},
      ${lat},
      ${lng}
    );
  `;

  try {
    await db.execAsync(sql);
    // console.log("⭐️ 장소 삽입 성공");
    return true;
  } catch (error) {
    console.error("장소 삽입 실패:", error);
    throw error;
  }
};

/**
 * 데이터베이스에서 모든 장소를 조회하는 함수
 * @returns {Promise<Array>} 장소 목록 배열
 */
export const fetchPlacesDB = async () => {
  const db = await getDB();
  try {
    const allRows = await db.getAllAsync("SELECT * FROM places");
    const data = allRows.map((row) => ({
      id: row.id,
      title: row.title,
      imageUri: row.imageUri,
      address: row.address,
      location: { lat: row.lat, lng: row.lng },
    }));
    return data;
  } catch (error) {
    console.error("장소 조회 실패:", error);
    throw error;
  }
};
