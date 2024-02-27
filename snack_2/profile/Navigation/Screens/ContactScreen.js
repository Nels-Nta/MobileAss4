// ContactScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactScreen() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.contactName}>{item.name}</Text>
      {item.phoneNumbers && item.phoneNumbers.map((phoneNumber, index) => (
        <Text key={index} style={styles.phoneNumber}>{phoneNumber.number}</Text>
      ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      {contacts.length === 0 ? (
        <Text>No contacts found.</Text>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#666666',
  },
});
