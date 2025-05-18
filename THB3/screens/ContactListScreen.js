import React, { useState } from 'react';
import {
    SectionList,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    StyleSheet,
    Alert,
    Button,
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ContactListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([
    {
        id: '1',
        name: 'Adam Thomsen',
        phone: '12321217',
        image: 'https://randomuser.me/api/portraits/men/0.jpg',
        email: 'adam.thomsen@example.com', // Thêm email
        workPhone: '12321217',           // Thêm số Work
        personalPhone: '27402053',       // Thêm số Personal
    },
    {
        id: '2',
        name: 'Adrián Ruiz',
        phone: '912-425-133',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        email: 'adrian.ruiz@example.com', // Thêm email
        workPhone: '912-425-133',        // Thêm số Work
        personalPhone: '27402054',       // Thêm số Personal
    },
    {
        id: '3',
        name: 'Adrien Thomas',
        phone: '05-73-09-10-61',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        email: 'adrien.thomas@example.com',
        workPhone: '05-73-09-10-61',
        personalPhone: '27402055',
    },
    {
        id: '4',
        name: 'Afşar Topaloğlu',
        phone: '(483)-096-7166',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        email: 'afşar.topaloğlu@example.com',
        workPhone: '(483)-096-7166',
        personalPhone: '27402056',
    },
    {
        id: '5',
        name: 'Ben Adams',
        phone: '234-567-8901',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        email: 'ben.adams@example.com',
        workPhone: '234-567-8901',
        personalPhone: '27402057',
    },
    {
        id: '6',
        name: 'Betty White',
        phone: '234-567-8902',
        image: 'https://randomuser.me/api/portraits/women/0.jpg',
        email: 'betty.white@example.com',
        workPhone: '234-567-8902',
        personalPhone: '27402058',
    },
    {
        id: '7',
        name: 'Chris Johnson',
        phone: '345-678-9012',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        email: 'chris.johnson@example.com',
        workPhone: '345-678-9012',
        personalPhone: '27402059',
    },
    {
        id: '8',
        name: 'Charlie Brown',
        phone: '345-678-9013',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        email: 'charlie.brown@example.com',
        workPhone: '345-678-9013',
        personalPhone: '27402060',
    },
    {
        id: '9',
        name: 'David Martin',
        phone: '456-789-0123',
        image: 'https://randomuser.me/api/portraits/men/7.jpg',
        email: 'david.martin@example.com',
        workPhone: '456-789-0123',
        personalPhone: '27402061',
    },
    {
        id: '10',
        name: 'Diana King',
        phone: '456-789-0124',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        email: 'diana.king@example.com',
        workPhone: '456-789-0124',
        personalPhone: '27402062',
    },
    {
        id: '11',
        name: 'Ethan Hughes',
        phone: '567-890-1234',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        email: 'ethan.hughes@example.com',
        workPhone: '567-890-1234',
        personalPhone: '27402063',
    },
    {
        id: '12',
        name: 'Emma Stone',
        phone: '567-890-1235',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        email: 'emma.stone@example.com',
        workPhone: '567-890-1235',
        personalPhone: '27402064',
    },
    {
        id: '13',
        name: 'Frank White',
        phone: '678-901-2345',
        image: 'https://randomuser.me/api/portraits/men/9.jpg',
        email: 'frank.white@example.com',
        workPhone: '678-901-2345',
        personalPhone: '27402065',
    },
    {
        id: '14',
        name: 'Fiona Green',
        phone: '678-901-2346',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        email: 'fiona.green@example.com',
        workPhone: '678-901-2346',
        personalPhone: '27402066',
    },
    {
        id: '15',
        name: 'George Clark',
        phone: '789-012-3456',
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        email: 'george.clark@example.com',
        workPhone: '789-012-3456',
        personalPhone: '27402067',
    },
    {
        id: '16',
        name: 'Grace Lee',
        phone: '789-012-3457',
        image: 'https://randomuser.me/api/portraits/women/4.jpg',
        email: 'grace.lee@example.com',
        workPhone: '789-012-3457',
        personalPhone: '27402068',
    },
    {
        id: '17',
        name: 'Helen King',
        phone: '890-123-4567',
        image: 'https://randomuser.me/api/portraits/women/5.jpg',
        email: 'helen.king@example.com',
        workPhone: '890-123-4567',
        personalPhone: '27402069',
    },
    {
        id: '18',
        name: 'Harry Potter',
        phone: '890-123-4568',
        image: 'https://randomuser.me/api/portraits/men/11.jpg',
        email: 'harry.potter@example.com',
        workPhone: '890-123-4568',
        personalPhone: '27402070',
    },
    {
        id: '19',
        name: 'Ivy Clark',
        phone: '901-234-5678',
        image: 'https://randomuser.me/api/portraits/women/6.jpg',
        email: 'ivy.clark@example.com',
        workPhone: '901-234-5678',
        personalPhone: '27402071',
    },
    {
        id: '20',
        name: 'Ian Smith',
        phone: '901-234-5679',
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        email: 'ian.smith@example.com',
        workPhone: '901-234-5679',
        personalPhone: '27402072',
    },
    {
        id: '21',
        name: 'Jack Johnson',
        phone: '012-345-6789',
        image: 'https://randomuser.me/api/portraits/men/13.jpg',
        email: 'jack.johnson@example.com',
        workPhone: '012-345-6789',
        personalPhone: '27402073',
    },
    {
        id: '22',
        name: 'Julia Roberts',
        phone: '012-345-6790',
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        email: 'julia.roberts@example.com',
        workPhone: '012-345-6790',
        personalPhone: '27402074',
    },
    {
        id: '23',
        name: 'Kevin Brown',
        phone: '123-456-7890',
        image: 'https://randomuser.me/api/portraits/men/14.jpg',
        email: 'kevin.brown@example.com',
        workPhone: '123-456-7890',
        personalPhone: '27402075',
    },
    {
        id: '24',
        name: 'Katherine Williams',
        phone: '123-456-7891',
        image: 'https://randomuser.me/api/portraits/women/8.jpg',
        email: 'katherine.williams@example.com',
        workPhone: '123-456-7891',
        personalPhone: '27402076',
    },
    {
        id: '25',
        name: 'Liam Neeson',
        phone: '234-567-8901',
        image: 'https://randomuser.me/api/portraits/men/15.jpg',
        email: 'liam.neeson@example.com',
        workPhone: '234-567-8901',
        personalPhone: '27402077',
    },
    {
        id: '26',
        name: 'Lily Allen',
        phone: '234-567-8902',
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
        email: 'lily.allen@example.com',
        workPhone: '234-567-8902',
        personalPhone: '27402078',
    },
    {
        id: '27',
        name: 'Michael Scott',
        phone: '345-678-9012',
        image: 'https://randomuser.me/api/portraits/men/16.jpg',
        email: 'michael.scott@example.com',
        workPhone: '345-678-9012',
        personalPhone: '27402079',
    },
    {
        id: '28',
        name: 'Maya Johnson',
        phone: '345-678-9013',
        image: 'https://randomuser.me/api/portraits/women/10.jpg',
        email: 'maya.johnson@example.com',
        workPhone: '345-678-9013',
        personalPhone: '27402080',
    },
    {
        id: '29',
        name: 'Nina Simone',
        phone: '456-789-0123',
        image: 'https://randomuser.me/api/portraits/women/11.jpg',
        email: 'nina.simone@example.com',
        workPhone: '456-789-0123',
        personalPhone: '27402081',
    },
    {
        id: '30',
        name: 'Nick Fury',
        phone: '456-789-0124',
        image: 'https://randomuser.me/api/portraits/men/17.jpg',
        email: 'nick.fury@example.com',
        workPhone: '456-789-0124',
        personalPhone: '27402082',
    },
    {
        id: '31',
        name: 'Oliver Twist',
        phone: '567-890-1234',
        image: 'https://randomuser.me/api/portraits/men/18.jpg',
        email: 'oliver.twist@example.com',
        workPhone: '567-890-1234',
        personalPhone: '27402083',
    },
    {
        id: '32',
        name: 'Olivia Wilde',
        phone: '567-890-1235',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
        email: 'olivia.wilde@example.com',
        workPhone: '567-890-1235',
        personalPhone: '27402084',
    },
    {
        id: '33',
        name: 'Paul Walker',
        phone: '678-901-2345',
        image: 'https://randomuser.me/api/portraits/men/19.jpg',
        email: 'paul.walker@example.com',
        workPhone: '678-901-2345',
        personalPhone: '27402085',
    },
    {
        id: '34',
        name: 'Penelope Cruz',
        phone: '678-901-2346',
        image: 'https://randomuser.me/api/portraits/women/13.jpg',
        email: 'penelope.cruz@example.com',
        workPhone: '678-901-2346',
        personalPhone: '27402086',
    },
    {
        id: '35',
        name: 'Quincy Adams',
        phone: '789-012-3456',
        image: 'https://randomuser.me/api/portraits/men/20.jpg',
        email: 'quincy.adams@example.com',
        workPhone: '789-012-3456',
        personalPhone: '27402087',
    },
    {
        id: '36',
        name: 'Quinn Sullivan',
        phone: '789-012-3457',
        image: 'https://randomuser.me/api/portraits/men/21.jpg',
        email: 'quinn.sullivan@example.com',
        workPhone: '789-012-3457',
        personalPhone: '27402088',
    },
    {
        id: '37',
        name: 'Rachel Green',
        phone: '890-123-4567',
        image: 'https://randomuser.me/api/portraits/women/14.jpg',
        email: 'rachel.green@example.com',
        workPhone: '890-123-4567',
        personalPhone: '27402089',
    },
    {
        id: '38',
        name: 'Roger Federer',
        phone: '890-123-4568',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        email: 'roger.federer@example.com',
        workPhone: '890-123-4568',
        personalPhone: '27402090',
    },
    {
        id: '39',
        name: 'Sam Smith',
        phone: '901-234-5678',
        image: 'https://randomuser.me/api/portraits/men/23.jpg',
        email: 'sam.smith@example.com',
        workPhone: '901-234-5678',
        personalPhone: '27402091',
    },
    {
        id: '40',
        name: 'Sophia Loren',
        phone: '901-234-5679',
        image: 'https://randomuser.me/api/portraits/women/15.jpg',
        email: 'sophia.loren@example.com',
        workPhone: '901-234-5679',
        personalPhone: '27402092',
    },
    {
        id: '41',
        name: 'Tom Hanks',
        phone: '012-345-6789',
        image: 'https://randomuser.me/api/portraits/men/24.jpg',
        email: 'tom.hanks@example.com',
        workPhone: '012-345-6789',
        personalPhone: '27402093',
    },
    {
        id: '42',
        name: 'Tina Fey',
        phone: '012-345-6790',
        image: 'https://randomuser.me/api/portraits/women/16.jpg',
        email: 'tina.fey@example.com',
        workPhone: '012-345-6790',
        personalPhone: '27402094',
    },
    {
        id: '43',
        name: 'Uma Thurman',
        phone: '123-456-7890',
        image: 'https://randomuser.me/api/portraits/women/17.jpg',
        email: 'uma.thurman@example.com',
        workPhone: '123-456-7890',
        personalPhone: '27402095',
    },
    {
        id: '44',
        name: 'Ursula Andress',
        phone: '123-456-7891',
        image: 'https://randomuser.me/api/portraits/women/18.jpg',
        email: 'ursula.andress@example.com',
        workPhone: '123-456-7891',
        personalPhone: '27402096',
    },
    {
        id: '45',
        name: 'Vince Vaughn',
        phone: '234-567-8901',
        image: 'https://randomuser.me/api/portraits/men/25.jpg',
        email: 'vince.vaughn@example.com',
        workPhone: '234-567-8901',
        personalPhone: '27402097',
    },
    {
        id: '46',
        name: 'Victoria Beckham',
        phone: '234-567-8902',
        image: 'https://randomuser.me/api/portraits/women/19.jpg',
        email: 'victoria.beckham@example.com',
        workPhone: '234-567-8902',
        personalPhone: '27402098',
    },
    {
        id: '47',
        name: 'Will Smith',
        phone: '345-678-9012',
        image: 'https://randomuser.me/api/portraits/men/26.jpg',
        email: 'will.smith@example.com',
        workPhone: '345-678-9012',
        personalPhone: '27402099',
    },
    {
        id: '48',
        name: 'Wendy Williams',
        phone: '345-678-9013',
        image: 'https://randomuser.me/api/portraits/women/20.jpg',
        email: 'wendy.williams@example.com',
        workPhone: '345-678-9013',
        personalPhone: '27402100',
    },
    {
        id: '49',
        name: 'Xander Cage',
        phone: '456-789-0123',
        image: 'https://randomuser.me/api/portraits/men/27.jpg',
        email: 'xander.cage@example.com',
        workPhone: '456-789-0123',
        personalPhone: '27402101',
    },
    {
        id: '50',
        name: 'Xena Warrior',
        phone: '456-789-0124',
        image: 'https://randomuser.me/api/portraits/women/21.jpg',
        email: 'xena.warrior@example.com',
        workPhone: '456-789-0124',
        personalPhone: '27402102',
    },
    {
        id: '51',
        name: 'Yara Shahidi',
        phone: '567-890-1234',
        image: 'https://randomuser.me/api/portraits/women/22.jpg',
        email: 'yara.shahidi@example.com',
        workPhone: '567-890-1234',
        personalPhone: '27402103',
    },
    {
        id: '52',
        name: 'Yvonne Strahovski',
        phone: '567-890-1235',
        image: 'https://randomuser.me/api/portraits/women/23.jpg',
        email: 'yvonne.strahovski@example.com',
        workPhone: '567-890-1235',
        personalPhone: '27402104',
    },
    {
        id: '53',
        name: 'Zane Grey',
        phone: '678-901-2345',
        image: 'https://randomuser.me/api/portraits/men/28.jpg',
        email: 'zane.grey@example.com',
        workPhone: '678-901-2345',
        personalPhone: '27402105',
    },
    {
        id: '54',
        name: 'Zoe Saldana',
        phone: '678-901-2346',
        image: 'https://randomuser.me/api/portraits/women/24.jpg',
        email: 'zoe.saldana@example.com',
        workPhone: '678-901-2346',
        personalPhone: '27402106',
    },
]);

  const handleContactPress = (contact) => {
    navigation.navigate('ContactDetail', { contact });
  };

  const handleDelete = (id) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa liên hệ này?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          setContacts((prev) => prev.filter((c) => c.id !== id));
          Alert.alert('Thành công', 'Liên hệ đã được xóa.');
        },
      },
    ]);
  };
  const handleUpdateContact = (updatedContact) => {
    setContacts(prev =>
      prev.map(c => (c.id === updatedContact.id ? updatedContact : c))
    );
  };

  const handleEdit = (contact) => {
  navigation.navigate('EditContact', {
    contact,
    onEditContact: handleUpdateContact, // truyền callback cập nhật
  });
};

  const handleAddContact = () => {
    navigation.navigate('AddContact', {
      onAddContact: (newContact) => {
        setContacts((prev) => [...prev, { ...newContact, id: Date.now().toString() }]);
      },
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  const sections = Object.keys(groupedContacts)
    .sort()
    .map(letter => ({
      title: letter,
      data: groupedContacts[letter],
    }));

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchBar}
        placeholder="Tìm kiếm liên hệ..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Image source={{ uri: item.image }} style={styles.contactImage} />
            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleContactPress(item)}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item)}>
  <Icon name="edit" size={24} color="blue" />
</TouchableOpacity>

<TouchableOpacity onPress={() => handleDelete(item.id, item.name)}>
  <Icon name="delete" size={24} color="red" />
</TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />

      {/* Nút thêm */}
      <TouchableOpacity style={styles.fab} onPress={handleAddContact}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
  },
  contactPhone: {
    fontSize: 12,
    color: 'gray',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  actionText: {
    marginHorizontal: 5,
    color: 'blue',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
  },
});