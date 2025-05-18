import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ContactDetailScreen({ route, navigation }) {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      {contact ? (
        <>
          {/* Thanh điều hướng tùy chỉnh */}
          <View style={styles.customHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{contact.name}</Text>
          </View>

          <View style={styles.header}>
            <Image source={{ uri: contact.image }} style={styles.contactImage} />
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.callButton}>
                <Icon name="phone" size={20} color="white" />
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Icon name="message" size={20} color="white" />
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={styles.detailContainer}>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icon name="email" size={16} color="gray" />
              </View>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailText}>{contact.email}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icon name="phone" size={16} color="gray" />
              </View>
              <Text style={styles.detailLabel}>Work</Text>
              <Text style={styles.detailText}>{contact.workPhone}</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icon name="phone" size={16} color="gray" />
              </View>
              <Text style={styles.detailLabel}>Personal</Text>
              <Text style={styles.detailText}>{contact.personalPhone}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text>Không tìm thấy liên hệ</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
  },
  contactImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 15,
    alignItems: 'center',
  },
  messageButton: {
    flexDirection: 'row',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  detailContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: 'gray',
    marginRight: 10,
    width: 80,
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
});