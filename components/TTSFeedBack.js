//kullanıcıya sesli yanıt gönderir.
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import * as Speech from 'expo-speech';

const TTSFeedBack = ({ message }) => {
  useEffect(() => {
    if (message) {
      // Mesaj değiştiğinde sesli geri bildirim yapalım
      Speech.speak(message, { language: 'tr' }); // Türkçe dilinde konuşma
    }
  }, [message]);

  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
};

export default TTSFeedBack;
