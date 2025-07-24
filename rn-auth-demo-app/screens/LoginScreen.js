import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { login } from "../api/auth.api";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const authCtx = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);

  const submitHandler = async ({ email, password }) => {
    try {
      setIsFetching(true);
      const token = await login({ email, password });
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later."
      );
      setIsFetching(false);
    }
  };

  if (isFetching) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={submitHandler} />;
}

export default LoginScreen;
