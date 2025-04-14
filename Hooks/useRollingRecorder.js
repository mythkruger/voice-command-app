// Video parçalarını sıralı olarak tutar ve save çağrıldığında tek dosya haline getirir.

// Her 5 saniyede bir ses kaydını alıp FIFO buffer’a ekleyeceğiz.

// Her 10 saniyede bir bir bip sesi çalacağız.

// Buffer'da son 30 saniyelik kayıt tutulacak.

// useEffect ile başlatılacak, useState ile kayıtlar tutulacak.
import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const useRollingRecorder = () => {
  const [recordings, setRecordings] = useState([]);
  const recordingRef = useRef(null);

  // FIFO mantığıyla kayıtları güncelle
  const addToBuffer = (newRecording) => {
    setRecordings((prev) => {
      const updated = [...prev, newRecording];
      const maxSegments = 6; // 6 * 5 = 30 saniye
      return updated.slice(-maxSegments); // sadece son 30 saniye tut
    });
  };

  const playBeep = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/alert.mp3') // projenin assets klasöründeki kısa bip ses 
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Beep çalınamadı:', error);
    }
  };

  const startSegmentRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;

      setTimeout(async () => {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        addToBuffer({ uri, timestamp: Date.now() });
      }, 5000); // her segment 5 saniye
    } catch (error) {
      console.log('Kayıt sırasında hata:', error);
    }
  };

  useEffect(() => {
    const segmentInterval = setInterval(() => {
      startSegmentRecording();
    }, 5000);

    const beepInterval = setInterval(() => {
      playBeep();
    }, 15000);

    return () => {
      clearInterval(segmentInterval);
      clearInterval(beepInterval);
    };
  }, []);

  return {
    recordings,
  };
};

export default useRollingRecorder;
