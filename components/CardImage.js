import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardImage = ({ image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ImageScreen", { image })}
      style={styles.cardImage}
    >
      <Image
        source={{
          uri: image.src.small
            ? image.src.small
            : "https://cdn.iconscout.com/icon/free/png-512/no-image-1771002-1505134.png",
        }}
        style={{ height: 180, width: "100%", borderRadius: 5 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    display: "flex",
    width: "49.5%",
    margin: 4,
    justifyContent: "space-between",
    backgroundColor: "#2C292C",
    borderWidth: 0,
    borderRadius: 5,
  },
});

export default CardImage;
