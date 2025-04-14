// App.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CameraView from "./components/CameraView";
import MicListener from "./components/MicListener";
import UploadStatus from "./components/UploadStatus";
import TTSFeedBack from "./components/TTSFeedBack";


export default function App() {
  const [status, setStatus] = useState("");

  const handleWake = async () => {
    setStatus("Komut alındı, video hazırlanıyor...");
    // Buraya video kaydını durdur, birleştir ve yükle işlemleri gelecek
    setStatus("Yüklendi 🎉");
  };

  return (
    <View style={styles.container}>
      <CameraView />
       <MicListener onWake={handleWake} />
      <TTSFeedBack message={status} />
      <UploadStatus status={status} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
