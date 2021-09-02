import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-elements";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const ImageScreen = ({ route }) => {
  const { image } = route.params;
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const res = await getImages();
    setImages(res.data.photos);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handlePress = async () =>
    await WebBrowser.openBrowserAsync(image.photographer_url);

  const downloadFile = async () => {
    let fileUri = FileSystem.documentDirectory + image.id + ".jpeg";

    try {
      const { uri } = await FileSystem.downloadAsync(
        image.src.portrait,
        fileUri
      );
      saveFile(uri);
    } catch (error) {
      console.error(error);
    }
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  const handleDownload = async () => {
    downloadFile();
  };

  return (
    <View style={styles.headerPhotographer}>
      <Image
        source={{
          uri: image.src.medium,
          height: 350,
          width: "100%",
        }}
      />
      <View
        style={{
          paddingVertical: 18,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Avatar
            rounded
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor: image.avg_color }}
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={{ backgroundColor: "#229783" }}
          onPress={() => handleDownload()}
        />
      </View>

      <View>
        <ImageList photos={images} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  textPhotographer: {
    fontSize: 18,
    marginStart: 5,
    color: "#7f8c8d",
    fontWeight: "bold",
  },
  cardImageText: {
    color: "#fff",
  },
});

export default ImageScreen;
