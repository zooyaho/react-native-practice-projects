import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ExpensesSummary = ({ expenses, periodName }) => {
  const totalExpenses =
    expenses.length > 0
      ? expenses.reduce((sum, expense) => sum + expense.amount, 0)
      : 0;
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.total}>총 지출: {totalExpenses}원</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary700,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary900,
  },
});

export default ExpensesSummary;
