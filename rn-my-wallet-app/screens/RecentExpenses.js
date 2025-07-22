import { useContext } from "react";

import { ExpenseContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";

/**
 * 최근 비용 표시 화면
 */
const RecentExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date(); // 오늘 날짜(현재 시각) 객체 생성
    const sevenDaysAgo = getDateMinusDays(today, 7); // 7일 전 날짜 계산

    // 각 지출 항목의 날짜가 7일 전 이상이고 오늘 이하인 경우만 필터링
    return expense.date >= sevenDaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No recent expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
