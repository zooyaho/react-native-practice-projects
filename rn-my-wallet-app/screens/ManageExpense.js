import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect, useContext, useState } from "react";
import IconButton from "../components/common/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import LoadingOverlay from "../components/common/LoadingOverlay";
import ErrorOverlay from "../components/common/ErrorOverlay";
import {
  addExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
} from "../api/expenseApi";

/**
 * 비용을 관리하는 화면
 * - 수정/추가 기능을 위한 페이지
 */
const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditMode = !!editedExpenseId;
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const deleteExpenseHandler = async () => {
    try {
      setIsSubmitting(true);
      await deleteExpenseApi(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack(); // 모달 비활성화
    } catch (error) {
      setError("Could not delete expense!");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack(); // 모달 비활성화
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpenseApi(editedExpenseId, expenseData);
      } else {
        // 새 지출 항목 추가
        const id = await addExpenseApi(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack(); // 모달 비활성화
    } catch (error) {
      setError("Could not save expense data!");
      setIsSubmitting(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add Expense",
      headerBackTitle: "Back",
    });
  }, [navigation, isEditMode]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValues={selectedExpense}
        submitButtonLabel={isEditMode ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
      {/* 삭제 버튼 */}
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary700,
    alignItems: "center",
  },
});

export default ManageExpense;
