import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

const RenderExpenseItem = ({ item }) => {
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
