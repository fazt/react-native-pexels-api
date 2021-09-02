import React from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import CardImage from "../components/CardImage";

const ImageList = ({ photos }) => {
  const renderItem = ({ item, index }) => <CardImage image={item} />;

  if (photos.length === 0) return <Text>Loading</Text>;

  return (
    <FlatList
      data={photos}
      style={styles.container}
      renderItem={renderItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageList;
