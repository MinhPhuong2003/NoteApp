import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/avt.jpg')} // đường dẫn tương đối từ file hiện tại
        style={styles.profileImage}
      />
      <Text style={styles.name}>Võ Lê Minh Phương</Text>

      <View style={styles.infoContainer}>
        <Icon name="phone" size={20} color="gray" style={styles.icon} />
        <Text>
          <Text style={styles.label}>Phone: </Text>
          <Text style={styles.info}>0378256319</Text>
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Icon name="envelope" size={20} color="gray" style={styles.icon} />
        <Text>
          <Text style={styles.label}>Email: </Text>
          <Text style={styles.info}>2124802010356@student.tdmu.edu.vn</Text>
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Icon name="home" size={20} color="gray" style={styles.icon} />
        <Text>
          <Text style={styles.label}>Home: </Text>
          <Text style={styles.info}>Số 06 Trần Văn Ơn - Phú Hòa - Thủ Dầu Một - Bình Dương</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start', // Căn trái toàn bộ dòng
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
  info: {
    fontSize: 18,
    color: 'gray',
  },
});
