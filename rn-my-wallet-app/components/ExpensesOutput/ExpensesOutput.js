import { StyleSheet, Text, View, FlatList } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

/**
 * 비용 출력 컴포넌트
 * - 모든 지출에 대한 요약, 모든 지출을 보여주는 컴포넌트
 */
const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  const hasExpenses = expenses && expenses.length > 0;
  return (
    <View style={styles.container}>
      {/* Summary */}
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {/* expenses list */}
      {hasExpenses ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.fallbackText}>{fallbackText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 0,
    paddingHorizontal: 24,
  },
  fallbackText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    marginTop: 32,
  },
});

export default ExpensesOutput;
