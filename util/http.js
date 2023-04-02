import axios from "axios";
const URL_FIREBASE =
  "https://react-native-course-45132-default-rtdb.asia-southeast1.firebasedatabase.app";
export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${URL_FIREBASE}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(URL_FIREBASE + "/expenses.json");
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(URL_FIREBASE + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(URL_FIREBASE + `/expenses/${id}.json`);
}
