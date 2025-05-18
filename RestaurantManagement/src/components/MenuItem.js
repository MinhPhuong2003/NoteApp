import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuItem = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <ImageBackground source={image} style={styles.imageBackground} imageStyle={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Icon name="chevron-forward" size={24} color="#fff" />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Overlay mờ
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MenuItem;
