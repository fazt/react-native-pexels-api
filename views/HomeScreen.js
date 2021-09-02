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
      {/* Searching Section */}
      {openSearch && (
        <View style={styles.searchSection}>
          <Input
            placeholder="Search a Term"
            style={styles.input}
            leftIcon={{ type: "feather", name: "search", color: "#fff" }}
            onChangeText={(value) => setSearchTerm(value)}
            inputContainerStyle={styles.searchInput}
            leftIconContainerStyle={styles.searchLeftIcon}
          />
          <Button
            title="Search"
            buttonStyle={styles.buttonSearch}
            onPress={() => handleSearch()}
          />
        </View>
      )}

      {/* Main Container */}
      <View style={styles.container}>
        {/* Total Result Text */}
        {totalResults > 0 && (
          <Text style={styles.totalResulText}>{totalResults} Resultados</Text>
        )}

        {/* Container List */}
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
  totalResulText: { color: "#D0D0D0", textAlign: "right", width: "100%" },
  searchSection: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    paddingRight: 80,
    paddingLeft: 10,
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#2C292C",
    borderBottomWidth: 0,
    paddingHorizontal: 4,
  },
  input: {
    color: "#fff",
  },
  searchLeftIcon: {
    paddingStart: 10,
    marginRight: 7,
  },
  buttonSearch: { backgroundColor: "#229783", marginBottom: 27 },
});
