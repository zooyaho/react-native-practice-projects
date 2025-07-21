import { StyleSheet, Text, View, FlatList } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

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

/**
 * 비용 출력 컴포넌트
 * - 모든 지출에 대한 요약, 모든 지출을 보여주는 컴포넌트
 */
const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      {/* Summary */}
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      {/* expenses list */}
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
});

export default ExpensesOutput;
