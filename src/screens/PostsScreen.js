import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect } from "react";

import { db, auth } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        const currentUser = auth.currentUser;
        setUserData(currentUser);
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getDataFromFirestore = async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));
          const postsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          setPosts(postsList);
          return postsList;
        } catch (error) {
          throw error;
        }
      };

      getDataFromFirestore();
    }, [])
  );

  const logOut = async () => {
    await signOut(auth);
    setUserData([]);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleContainerText}>Публікації</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonLogOut}
          onPress={() => logOut()}>
          <Image
            style={styles.iconLogOut}
            source={require("../images/log-out.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.user}>
          <Image
            style={styles.userImage}
            source={require("../images/avatar.jpg")}
          />
          <View>
            <Text style={styles.userName}>
              {userData.displayName && userData.displayName}
            </Text>
            <Text style={styles.userEmail}>
              {userData.email}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.postView}>
          {posts && (
            <View style={styles.posts}>
            {posts.map((postItem) => (
              <View key={postItem.id} style={styles.post}>
              <TouchableOpacity
                style={styles.postImageLink}
                onPress={() => navigation.navigate("Comment", { postId: postItem.id })}
              >
              <Image
                style={styles.postImage}
                source={{ uri: postItem.data.previewImage }}
              />
              </TouchableOpacity>
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{postItem.data.title}</Text>
                <View style={styles.postMeta}>
                <TouchableOpacity style={styles.postComments} onPress={() => navigation.navigate("Comments", { postId: postItem.id })}>
                  <Image
                    style={styles.postIcon}
                    source={ postItem.data.comments.length !== 0
                      ? require("../images/comments.png")
                      : require("../images/comments-o.png")}
                  />
                  <Text style={styles.postCount}>
                    {postItem.data.comments.length}
                  </Text>
                </TouchableOpacity>
                <View style={styles.postLocationInfo}>
                  <Image
                    style={styles.postIcon}
                    source={require("../images/map.png")}
                  />
                  <TouchableOpacity onPress={() => navigation.navigate("Map", { postId: postItem.id })}>
                  <Text style={styles.postLocationAddress}>
                    {postItem.data.locationText}
                  </Text>
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            </View>
          ))}
          </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    paddingTop: 44,
    marginBottom: 16,
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
  },
  buttonLogOut: {
    position: "absolute",
    top: "50%",
    marginTop: 32,
    height: 24,
    right: 10,
  },
  iconLogOut: {
    width: 24,
    height: 24,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userImage: {
    borderRadius: 16,
    width: 60,
    height: 60,
    marginRight: 8,
  },
  userName: {
    lineHeight: 15,
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    lineHeight: 13,
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  posts: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    padding: 16,
  },
  postView: {

  },
  post: {
    marginBottom: 32,
  },
  postImageLink: {
    marginBottom: 8,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    width: "100%",
  },
  postContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  postTitle: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  postMeta: {
    flexDirection: "row",
    gap: 24,
  },
  postIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  postCount: {
    fontSize: 16,
    // lineHeight: 18,
    color: "#BDBDBD",
  },
  postComments: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  postLikes: {
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationInfo: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  postLocationAddress: {
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
