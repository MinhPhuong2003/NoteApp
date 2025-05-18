import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào thầy Lê Thanh Phong!</Text>
      <Text style={styles.title}>Em tên là Võ Lê Minh Phương</Text>
      <Text style={styles.title}>MSSV: 2124802010356</Text>
      <Text style={styles.title}>Lớp: D21CNTT03</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});

export default HomeScreen;
