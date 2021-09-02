import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ImageList from "../components/ImageList";
import { Input, Button } from "react-native-elements";

import { getImages } from "../api/pexels";

export default function Home({ openSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);
    setPhotos(res.data.photos);
    setTotalResults(res.data.total_results);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () => await loadImages(searchTerm);

  return (
    <>
      {openSearch && (
        <View
          style={{
            backgroundColor: "#0D0D0D",
            width: "100%",
            paddingRight: 80,
            paddingLeft: 10,
            flex: 1 / 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Search a Term"
            style={{
              color: "#fff",
            }}
            leftIcon={{ type: "feather", name: "search", color: "#fff" }}
            onChangeText={(value) => setSearchTerm(value)}
            inputContainerStyle={{
              backgroundColor: "#2C292C",
              borderBottomWidth: 0,
              paddingHorizontal: 4,
            }}
            leftIconContainerStyle={{
              paddingStart: 10,
              marginRight: 7,
            }}
          />
          <Button
            title="Search"
            buttonStyle={{ backgroundColor: "#229783", marginBottom: 27 }}
            onPress={() => handleSearch()}
          />
        </View>
      )}
      <View style={styles.container}>
        {totalResults > 0 && (
          <Text style={{ color: "#D0D0D0", textAlign: "right", width: "100%" }}>
            {totalResults} Resultados
          </Text>
        )}
        <ImageList photos={photos} />
      </View>
    </>
  );
}

Home.defaultProps = {
  openSearch: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
});
