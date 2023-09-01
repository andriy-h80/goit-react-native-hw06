import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect  } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { loginDB } from "../redux/services/userService";
  
const LoginScreen = ({ navigation }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [togglePassword, setTogglePassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email !== "" && password !== "");
  }, [email, password]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  const signIn = async () => {
    if (isFormValid) {
    setEmail(email);
    setPassword(password);

    try {
      await loginDB(email, password);
    } catch (error) {
      console.log("There is no user in db");
    }
    }
  };

  const showPassword = () => {
    setTogglePassword(!togglePassword);
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/bg-img.jpg")}
          style={styles.imageBackground}
          imageStyle={{
            minHeight: 812,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.loginContainer}
          >
          <View style={styles.titleContainer}>
            <Text style={styles.loginTitle}>Увійти</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "email" && [styles.inputFocused],
              ]}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Адреса електронної пошти"
              name="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "password" && [styles.inputFocused],
              ]}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Пароль"
              name="password"
              value={password}
              secureTextEntry={togglePassword ? false : true}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <Pressable style={styles.showTextButton} onPress={showPassword}>
              <Text style={styles.showText}>
                {!togglePassword ? "Показати" : "Приховати"}
              </Text>
            </Pressable>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.loginButton} onPress={signIn}>
              <Text style={styles.loginButtonText}>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.redirection}>
              <Text style={styles.redirectionText}>Немає акаунту?</Text>
                <TouchableOpacity>
                  <Text style={styles.redirectionLink} onPress={() => navigation.navigate("Registration")}>
                    Зареєструватися
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    position: "relative",
    objectFit: "none",
  },
  loginContainer: {
     position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 32,
    padding: 16,
    minHeight: 489,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleContainer: {
    marginBottom: 33,
  },
  loginTitle: {
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  formContainer: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
    color: "#000",
  },
  showTextButton: {
    position: "absolute",
  },
  showText: {
    top: "50%",
    right: 16,
    lineHeight: 24,
    marginTop: 4,
    marginLeft: 275,
    color: "#1B4371",
    fontSize: 16,
  },
  actions: {
    overflow: "hidden",
  },
  loginButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    padding: 16,
    marginTop: 27,
  },
  loginButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  redirectionText: {
    fontSize: 16,
    color: "#1B4371",
  },
  redirectionLink: {
    fontSize: 16,
    color: "#1B4371",
     textDecorationLine: "underline",
  },
  redirection: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    gap: 5,
  },
});
