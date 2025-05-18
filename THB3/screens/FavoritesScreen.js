import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const favoriteContacts = [
  {
    id: '1',
    name: 'Adam Thomsen',
    image: 'https://randomuser.me/api/portraits/men/0.jpg',
    phone: '123-456-7890',
    email: 'adam@example.com',
    workPhone: '111-222-3333',
    personalPhone: '444-555-6666',
  },
  {
    id: '2',
    name: 'Adrián Ruiz',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '222-333-4444',
    email: 'adrian@example.com',
    workPhone: '555-666-7777',
    personalPhone: '888-999-0000',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/0.jpg',
    phone: '333-444-5555',
    email: 'alice@example.com',
    workPhone: '666-777-8888',
    personalPhone: '999-000-1111',
  },
  {
    id: '4',
    name: 'Bob Smith',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    phone: '444-555-6666',
    email: 'bob@example.com',
    workPhone: '777-888-9999',
    personalPhone: '000-111-2222',
  },
  {
    id: '5',
    name: 'Barbara Lee',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    phone: '555-666-7777',
    email: 'barbara@example.com',
    workPhone: '888-999-0000',
    personalPhone: '111-222-3333',
  },
  {
    id: '6',
    name: 'Carlos García',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    phone: '666-777-8888',
    email: 'carlos@example.com',
    workPhone: '999-000-1111',
    personalPhone: '222-333-4444',
  },
  {
    id: '7',
    name: 'David Kim',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    phone: '777-888-9999',
    email: 'david@example.com',
    workPhone: '000-111-2222',
    personalPhone: '333-444-5555',
  },
  {
    id: '8',
    name: 'Diana Martinez',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    phone: '888-999-0000',
    email: 'diana@example.com',
    workPhone: '111-222-3333',
    personalPhone: '444-555-6666',
  },
  {
    id: '9',
    name: 'Eva Rodríguez',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    phone: '999-000-1111',
    email: 'eva@example.com',
    workPhone: '222-333-4444',
    personalPhone: '555-666-7777',
  },
  {
    id: '10',
    name: 'Ethan Lee',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    phone: '000-111-2222',
    email: 'ethan@example.com',
    workPhone: '333-444-5555',
    personalPhone: '666-777-8888',
  },
];

const FavoritesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ContactDetail', { contact: item })}>
        <View style={styles.contactItem}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderRow = ({ item }) => (
    <View style={styles.rowContainer}>
      {item.map((contact) => renderItem({ item: contact }))}
    </View>
  );

  const chunkedContacts = [];
  for (let i = 0; i < favoriteContacts.length; i += 3) {
    chunkedContacts.push(favoriteContacts.slice(i, i + 3));
  }

  return (
    <FlatList
      data={chunkedContacts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderRow}
      horizontal={false}
    />
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    width: '30%', // Mỗi mục chiếm 1/3 chiều rộng
    marginBottom: 10,
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa hình và tên theo chiều dọc
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa tên
  },
});

export default FavoritesScreen;
