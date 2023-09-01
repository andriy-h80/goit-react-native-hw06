import {
  ImageBackground,
  Image,
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
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { registerDB } from "../redux/services/userService";
  
const RegistrationScreen = ({ navigation }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [togglePassword, setTogglePassword] = useState(false);

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(login !== "" && email !== "" && password !== "");
  }, [login, email, password]);

  const addImage = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin("");
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  const showPassword = () => {
    setTogglePassword(!togglePassword);
  };
  
  const signUp = async () => {
    if (isFormValid) {
      await registerDB(email, password);
      updateProfile(auth.currentUser, {
        displayName: login,
      });
    }
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
          style={styles.registrtionContainer}
        >
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={require("../images/avatar.jpg")}
            />
            <TouchableOpacity style={styles.addButton} onPress={addImage}>
              <Image
                style={styles.addButtonIcon}
                source={require("../images/added.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.registrationTitle}>Реєстрація</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "login" && [styles.inputFocused],
              ]}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Логін"
              name="login"
              value={login}
              onChangeText={(text) => {
                setLogin(text);
              }}
              onFocus={() => setFocusedInput("login")}
              onBlur={() => setFocusedInput(null)}
            />
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
            <TouchableOpacity style={styles.registrationButton} onPress={signUp}>
              <Text style={styles.registrationButtonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <View style={styles.redirection}>
              <Text style={styles.redirectionText}>Вже є акаунт?</Text>
              <TouchableOpacity>
                <Text style={styles.redirectionLink} onPress={() => navigation.navigate("Login")}>
                  Увійти
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

export default RegistrationScreen;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    position: "relative",
  },
  registrtionContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: 549,
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "relative",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginBottom: 32,
    width: 120,
    aspectRatio: 1,
    marginTop: -76,
    marginLeft: "auto",
    marginRight: "auto",
  },
  addButton: {
    position: "absolute",
    width: 25,
    height: 25,
    right: -14,
    bottom: 14,
  },
  addButtonIcon: {
    width: 25,
    height: 25,
  },
  avatarImage: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  titleContainer: {
    marginBottom: 33,
  },
  registrationTitle: {
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
  registrationButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    padding: 16,
    marginTop: 27,
  },
  registrationButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  redirection: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    gap: 5,
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
});
