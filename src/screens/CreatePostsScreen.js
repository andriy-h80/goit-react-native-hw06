import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Camera, CameraType  } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/slices/postSlice";
  
const CreatePostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [focusedInput, setFocusedInput] = useState(false);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [location, setLocation] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
  
        setHasPermission(status === "granted");
      })();
    } catch (error) {
      console.log('Error permissions camera: ', error.message);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
      })();
    } catch (error) {
      console.log('Error permissions location: ', error.message);
    }
  }, []);

  useEffect(() => {
    setIsFormValid(photo !== "" && title && locationName);
  }, [photo, title, locationName]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      
      const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    try {
      const locationData = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationData.coords;
      setLocation({ latitude, longitude });
    } catch (error) {
      console.error('Error getting location', error);
    }

      setPhoto(uri);
    }
  };

  const publishPost = () => {
    if (isFormValid) {
      dispatch(addPost({photo, title, locationName, location}))

      navigation.navigate("Home");
    }
  };

  const deletePost = () => {
    setPhoto('');
    setTitle('');
    setLocationName('');
    setLocation('');
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonReturn}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              style={styles.iconReturn}
              source={require("../images/arrow-return.png")}
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleContainerText}>Створити публікацію</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.publicationContainer}>
            <View style={styles.imageContainer}>
              <Camera
                style={styles.camera}
                type={type}
                ratio={"1:1"}
                ref={setCameraRef}
              >
              <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePhoto}
              >
                <View style={styles.cameraButtonIcon}>
                  <Image
                    style={styles.cameraImage}
                    source={require("../images/camera.png")}
                    />
                </View>
              </TouchableOpacity>
              {photo && (
                    <Image
                      style={styles.previewImageThmb}
                      source={{ uri: photo }}
                    />
                  )}
                  <TouchableOpacity
                    style={styles.cameraRotate}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  ></TouchableOpacity>
              </View>
              </Camera>
            </View>
            <TouchableOpacity onPress={deletePost}>         
            <Text style={styles.text}>
              {photo ? "Редагувати фото" : "Завантажте фото"}
            </Text>
            </TouchableOpacity>          
          </View>

          <View style={styles.inputHolder}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "title" && [styles.inputFocused],
              ]}
              name="title"
              value={title}
              placeholder="Назва..."
              onChangeText={(text) => {
                setTitle(text);
              }}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
          </View>
          <View style={styles.inputHolder}>
            <Image
              style={styles.mapImage}
              source={require("../images/map.png")}
            />
            <TextInput
              style={[
                [styles.inputMap],
                focusedInput === "locationName" && [styles.inputFocused],
              ]}
              name="locationName"
              value={locationName}
              placeholder="Місцевість"
              onChangeText={(text) => {
                setLocationName(text);
              }}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, isFormValid && styles.buttonValid ]}
            onPress={publishPost}
            disabled={!isFormValid}
          >
            <Text style={[styles.buttonText, isFormValid && styles.buttonTextValid]}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtonDel}>
          <TouchableOpacity style={styles.buttonDel} onPress={deletePost}>
            <Image
              style={styles.buttonDelIcon}
              source={require("../images/trash.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
  
export default CreatePostsScreen;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 44,
    paddingBottom: 22,
  },
  header: {
    position: "relative",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    height: 44,
  },
  buttonReturn: {
    position: "absolute",
    marginTop: 10,
    height: 24,
    left: 16,
  },
  iconReturn: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    width: 175,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  titleContainerText: {
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    paddingBottom: 11,
    paddingTop: 11,
  },
  mainContent: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  },
  publicationContainer: {
    marginBottom: 32,
  },
  imageContainer: {
    width: 343,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  photoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  cameraButtonIcon: {
    tintColor: "#FFFFFF",
  },
  cameraImage: {
    width: 24,
    height: 24,
  },
  previewImageThmb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  cameraRotate: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  inputHolder: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    fontFamily: "Roboto-Regular",
    minWidth: 343,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingBottom: 16,
    paddingTop: 16,
  },
  inputFocused: {
    color: "#000",
  },
  mapImage: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: 24,
    height: 24,
    marginTop: -12,
  },
  inputMap: {
    minWidth: 343,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingLeft: 28,
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "center",
    // color: "#212121",
  },
  button: {
    backgroundColor: "#E8E8E8",
    borderRadius: 100,
    minWidth: 343,
    padding: 16,
    marginTop: 27,
  },
  buttonValid: {
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  buttonTextValid: {
    color: '#FFFFFF'
  },
  containerButtonDel: {
    marginTop: "auto",
  },
  buttonDel: {
    width: 70,
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: "#E8E8E8",
    marginRight: "auto",
    marginLeft: "auto",
  },
  buttonDelIcon: {
    width: 24,
    height: 24,
  },
});
