import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({navigation}) => {
  return (
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
            <Text style={styles.titleContainerText}>Карта</Text>
        </View>
        </View>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 48.6251482,
          longitude: 22.2979421,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{ latitude: 48.6251482, longitude: 22.2979421 }}
          description='Hello'
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

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
    hesght: 44,
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
