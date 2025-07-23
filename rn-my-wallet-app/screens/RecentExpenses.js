import { useContext, useEffect, useState } from "react";

import { ExpenseContext } from "../store/expense-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";
import { getExpenseApi } from "../api/expenseApi";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ErrorOverlay from "../components/common/ErrorOverlay";

/**
 * 최근 비용 표시 화면
 */
const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date(); // 오늘 날짜(현재 시각) 객체 생성
    const sevenDaysAgo = getDateMinusDays(today, 7); // 7일 전 날짜 계산

    // 각 지출 항목의 날짜가 7일 전 이상이고 오늘 이하인 경우만 필터링
    return expense.date >= sevenDaysAgo && expense.date <= today;
  });

  const errorHandler = () => {
    setError(null); // 에러 상태 초기화, ErrorOverlay 비활성화
  };

  useEffect(() => {
    const getExpense = async () => {
      try {
        setIsFetching(true);
        const expenses = await getExpenseApi();
        expenseCtx.setExpenses(expenses); // expenseCtx에 가져온 지출 목록 설정
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    };

    getExpense();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No recent expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
