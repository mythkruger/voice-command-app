import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera"; // Expo'dan Camera import et
import useWakeWord from "../Hooks/useWakeWord";  // Hook'u import et

const CameraView = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      // Kamera izni alınıyor
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };

    getPermission();
  }, []);

  const startRecording = async () => {
    if (!cameraRef || !cameraReady || hasPermission === false) {
      setStatusMessage("Kamera hazır değil.");
      return;
    }

    try {
      setIsRecording(true);
      const video = await cameraRef.recordAsync();
      console.log("Video kaydı başlatıldı:", video.uri);
      setStatusMessage("Video kaydı başlatıldı...");
    } catch (error) {
      console.log("Kayıt başlatılırken hata:", error);
      setStatusMessage("Kayıt başlatılamadı.");
    }
  };

  const stopRecording = () => {
    if (cameraRef && isRecording) {
      cameraRef.stopRecording();
      setIsRecording(false);
      setStatusMessage("Video kaydı durduruldu.");
    }
  };

  // useWakeWord hook'unu kullanarak sesli komutlarla kaydı başlat/durdur
  const { onWake } = useWakeWord({
    onWake: (action) => {
      switch (action) {
        case "START":
          startRecording();
          break;
        case "STOP":
          stopRecording();
          break;
        case "SEND":
          // "Gönder" komutu geldiğinde yapılacak işlemler
          console.log("Gönder komutu alındı.");
          setStatusMessage("Veri gönderiliyor...");
          break;
        case "CONFIRM":
          // "Onaylıyorum" komutu geldiğinde yapılacak işlemler
          console.log("Onaylıyorum komutu alındı.");
          setStatusMessage("İşlem onaylandı.");
          break;
        default:
          console.log("Tanımlanmamış komut:", action);
          break;
      }
    }
  });

  if (hasPermission === null) {
    return (
      <View>
        <Text style={styles.permis}>Kamera için izin durumu yükleniyor...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text style={styles.permis}>Kamera izni verilmedi!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={setCameraRef}
        onCameraReady={() => setCameraReady(true)}
      />
      <Text style={styles.statusText}>{statusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  statusText: {
    fontSize: 18,
    color: "green",
    textAlign: "center",
    marginTop: 10,
  },
  permis: {
    marginTop: 30,
  },
});

export default CameraView;
