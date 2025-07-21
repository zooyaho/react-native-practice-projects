import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

/**
 * 모든 비용을 표시하는 화면
 */
function AllExpenses() {
  return <ExpensesOutput expensesPeriod="Total" />;
}

export default AllExpenses;
