import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { formatDate } from "../../utils/date";
import { isValidDateYYYYMMDD } from "../../utils/valid";

import Input from "../common/Input";
import Button from "../common/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  defaultValues,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues?.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? formatDate(defaultValues?.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues?.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { ...prevState[inputIdentifier], value: enteredValue },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: parseFloat(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    // 유효성 검사!
    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid =
      expenseData.date.toString() !== "Invalid Date" &&
      isValidDateYYYYMMDD(expenseData.date.toString());
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert("잘못된 입력", "입력값을 확인하세요!", [
      //   { text: "확인", style: "default" },
      // ]);
      setInputs((prevState) => ({
        amount: { ...prevState.amount, isValid: isAmountValid },
        date: { ...prevState.date, isValid: isDateValid },
        description: { ...prevState.description, isValid: isDescriptionValid },
      }));
      return;
    }
    onSubmit?.(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (enteredValue) =>
              inputChangeHandler("amount", enteredValue),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredValue) =>
              inputChangeHandler("date", enteredValue),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: true, // default is true
          autoCapitalize: "sentences", // default is 'sentences'
          onChangeText: (enteredValue) =>
            inputChangeHandler("description", enteredValue),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>입력값을 확인하세요!</Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} styleType="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary700,
    marginBottom: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
