import { PermissionsAndroid, Platform } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";

// Mikrofon izni istemek (Android için PermissionsAndroid ve iOS için expo-av)
export const requestMicrophonePermission = async () => {
  if (Platform.OS === "android") {
    // Android için mikrofon izni kontrolü
    const micPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    if (!micPermission) {
      const request = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
      return request === PermissionsAndroid.RESULTS.GRANTED; // Eğer izin verilirse true döner
    }
    return true; // İzin zaten verilmişse true döner
  } else {
    // iOS'ta expo-av ile mikrofon izni istenir
    const { status } = await Audio.requestPermissionsAsync();
    return status === "granted"; // Eğer izin verilirse true döner
  }
};

// Kamera izni istemek
export const requestCameraPermission = async () => {
  if (Platform.OS === "android") {
    // Android için kamera izni kontrolü
    const cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (!cameraPermission) {
      const request = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      return request === PermissionsAndroid.RESULTS.GRANTED; // Eğer izin verilirse true döner
    }
    return true; // İzin zaten verilmişse true döner
  } else {
    // iOS için expo-camera izinleri otomatik olarak yönetilir
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === "granted"; // Eğer izin verilirse true döner
  }
};
