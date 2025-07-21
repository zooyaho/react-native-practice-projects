import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

/**
 * 최근 비용 표시 화면
 */
const RecentExpenses = () => {
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
};

export default RecentExpenses;
