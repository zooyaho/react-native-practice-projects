import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse(); // 최신 지출이 위에 오도록 역순 정렬
      return inverted;
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
  const [expensesState, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expenseData) => {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  };
  const setExpenses = (expenses) => {
    dispatch({
      type: "SET",
      payload: expenses,
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
    setExpenses: setExpenses,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return <ExpenseContext value={value}>{children}</ExpenseContext>;
};

export default ExpenseContextProvider;
