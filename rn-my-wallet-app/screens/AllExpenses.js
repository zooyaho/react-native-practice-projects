import { useContext } from "react";

import { ExpenseContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

/**
 * 모든 비용을 표시하는 화면
 */
function AllExpenses() {
  const expenseCtx = useContext(ExpenseContext);
  const expenses = expenseCtx.expenses;

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText={"No registered expenses found!"}
    />
  );
}

export default AllExpenses;
