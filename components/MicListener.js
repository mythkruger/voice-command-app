import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av"; // Mikrofonu kontrol etmek için expo-av kütüphanesi kullanılabilir

const MicListener = ({ onWake }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Audio.requestPermissionsAsync(); // Mikrofon izni al
      if (status === "granted") {
        setHasPermission(true); // Mikrofon izni verildiyse
      } else {
        setHasPermission(false); // Mikrofon izni verilmediyse
      }
    };

    getPermission();
  }, []);

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Mikrofon için izin durumu yükleniyor...</Text>
      ) : hasPermission === false ? (
        <Text>Mikrofon izni verilmedi!</Text>
      ) : (
        <Text>Dinleniyor...</Text> // Mikrofon izni verildiyse dinleme yapılabilir
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MicListener;
