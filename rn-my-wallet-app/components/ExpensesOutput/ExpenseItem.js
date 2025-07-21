import { StyleSheet, Text, View, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { formatDate } from "../../utils/date";

const ExpenseItem = ({ description, date, amount }) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{formatDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}원</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.gray500,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    fontSize: 14,
    color: GlobalStyles.colors.primary700,
  },
});

export default ExpenseItem;
