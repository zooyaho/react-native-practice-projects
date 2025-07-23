import { useContext, useEffect } from "react";

import { ExpenseContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getExpenseApi } from "../api/expenseApi";

/**
 * 모든 비용을 표시하는 화면
 */
function AllExpenses() {
  const expenseCtx = useContext(ExpenseContext);
  const expenses = expenseCtx.expenses;

  useEffect(() => {
    const getExpense = async () => {
      const expenses = await getExpenseApi();
      expenseCtx.setExpenses(expenses); // expenseCtx에 가져온 지출 목록 설정
    };

    getExpense();
  }, []);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText={"No registered expenses found!"}
    />
  );
}

export default AllExpenses;
