//apiye yüklenme durumunu kullanıcıya belirtir.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadStatus = ({ status }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 18,
  },
});

export default UploadStatus;
