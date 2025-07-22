import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "신발 삼",
    amount: 60000,
    date: new Date("2025-07-18"),
  },
  {
    id: "e2",
    description: "점심 짜장면",
    amount: 6000,
    date: new Date("2025-07-19"),
  },
  {
    id: "e3",
    description: "카페 아아",
    amount: 4500,
    date: new Date("2025-07-20"),
  },
  {
    id: "e4",
    description: "카페 라떼",
    amount: 5500,
    date: new Date("2025-05-20"),
  },
  {
    id: "e5",
    description: "카페 라떼",
    amount: 5500,
    date: new Date("2025-05-20"),
  },
  {
    id: "e6",
    description: "카페 라떼",
    amount: 5500,
    date: new Date("2025-05-20"),
  },
  {
    id: "e7",
    description: "카페 라떼",
    amount: 5500,
    date: new Date("2025-05-20"),
  },
  {
    id: "e8",
    description: "카페 라떼",
    amount: 5500,
    date: new Date("2025-05-20"),
  },
  {
    id: "e9",
    description: "카페 라떼",
    amount: 5500,
    date: new Date("2025-05-20"),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      const updatableExpenseIdx = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIdx];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.expenseData,
      };

      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIdx] = updatedItem;
      return updatedExpenses;
    default:
      state;
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  };
  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({
      type: "UPDATE",
      payload: { id, expenseData },
    });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return <ExpenseContext value={value}>{children}</ExpenseContext>;
};

export default ExpenseContextProvider;
