import { StyleSheet, Text, View, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const RenderExpenseItem = ({ item }) => {
  console.log("Rendering item:", item);
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={RenderExpenseItem}
    />
  );
};

export default ExpensesList;
