import axios from "axios";

const BASE_URL = "https://rn-my-wallet-app-default-rtdb.firebaseio.com";

/**
 * 지출 추가하는 api 함수
 * @param {Object} expenseData - 지출 데이터 객체
 * @param {number} expenseData.amount - 지출 금액
 * @param {string} expenseData.date - 지출 날짜 (YYYY-MM-DD 형식)
 * @param {string} expenseData.description - 지출 설명
 * @returns {Promise<Object>} - 추가된 지출 데이터 객체 (id 포함)
 */
export const addExpenseApi = async (expenseData) => {
  try {
    // 고유 id는 firebase에서 자동으로 생성되므로, 별도로 id를 생성할 필요가 없음.
    const response = await axios.post(BASE_URL + "/expenses.json", expenseData); // response.data { name: '-N7kXxYZABCD12345678' }
    const id = response.data.name; // Firebase에서 생성된 고유 id
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 지출 목록을 가져오는 api 함수
 * @returns {Promise<Array>} - 지출 데이터 배열
 */
export const getExpenseApi = async () => {
  try {
    const response = await axios.get(BASE_URL + "/expenses.json");

    if (!response.data) {
      return [];
    }

    // Firebase에서 가져온 데이터는 { id: { ...expenseData } } 형태이므로, 이를 배열로 변환
    const expenses = Object.keys(response.data).map((key) => ({
      id: key,
      ...response.data[key],
      date: new Date(response.data[key].date),
    }));

    return expenses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateExpenseApi = async (id, expenseData) => {
  try {
    return await axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteExpenseApi = async (id) => {
  try {
    return await axios.delete(`${BASE_URL}/expenses/${id}.json`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
