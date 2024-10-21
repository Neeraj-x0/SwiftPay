import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import QRCode from 'react-native-qrcode-svg';
import { ArrowLeft } from 'lucide-react-native';

export default function CustomQRCodeScreen() {
  const [amount, setAmount] = useState('');

  const generateQRData = () => {
    const data = {
      contact: '',
      amount: amount
    };
    return Buffer.from(JSON.stringify(data)).toString('base64');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <QRCode
            value={generateQRData()}
            size={280}
            logo={{uri: 'https://example.com/your-logo.png'}}
            logoSize={40}
            logoBackgroundColor='white'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Set Amount</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
            placeholder="Enter amount"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Saved')}>
          <Text style={styles.saveButtonText}>Save ↓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  qrContainer: {
    marginBottom: 40,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#8A4FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});