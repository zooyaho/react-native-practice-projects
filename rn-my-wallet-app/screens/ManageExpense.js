import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/common/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/common/Button";
import { ExpenseContext } from "../store/expense-context";

/**
 * 비용을 관리하는 화면
 * - 수정/추가 기능을 위한 페이지
 */
const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditMode = !!editedExpenseId;

  const deleteExpenseHandler = () => {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack(); // 모달 비활성화
  };

  const cancelHandler = () => {
    navigation.goBack(); // 모달 비활성화
  };

  const confirmHandler = () => {
    if (isEditMode) {
      expenseCtx.updateExpense(editedExpenseId, {
        // 수정할 지출 항목의 데이터
        // 예: { title: 'Updated Title', amount: 100, date: new Date() }
        description: "Updated Title",
        amount: 500,
        date: new Date("2025-07-22"),
      });
    } else {
      expenseCtx.addExpense({
        // 새로 추가할 지출 항목의 데이터
        description: "New Expense",
        amount: 200,
        date: new Date("2025-07-22"),
      });
    }
    navigation.goBack(); // 모달 비활성화
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add Expense",
      headerBackTitle: "Back",
    });
  }, [navigation, isEditMode]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} styleType="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditMode ? "Update" : "Add"}
        </Button>
      </View>
      {isEditMode && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash-outline"
            size={24}
            color={GlobalStyles.colors.gray500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary300,
    alignItems: "center",
  },
});

export default ManageExpense;
