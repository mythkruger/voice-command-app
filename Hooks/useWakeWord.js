import { useState, useEffect } from "react";
import Voice from "@react-native-voice/voice";

const useWakeWord = (onWake) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    Voice.start("tr-TR");
    setIsListening(true);
  };

  const stopListening = () => {
    Voice.stop();
    setIsListening(false);
  };

  useEffect(() => {
    // Uygulamayı açtığımızda dinleme açılsın
    startListening();

    Voice.onSpeechResults = (event) => {
      const { value } = event;

      if (!value || value.length === 0) return; // input boş olursa:

      const lowerWords = value.map((w) => w.toLowerCase());

      // 'kayda başla' komutunu dinleyelim
      if (lowerWords.includes("kayda başla")) {
        onWake("START"); // 'Kayda başla' komutunu alır ve onWake'e 'START' gönderir
      } else if (lowerWords.includes("kaydı durdur")) {
        onWake("STOP"); // 'Kaydı durdur' komutunu alır ve onWake'e 'STOP' gönderir
      } else if (lowerWords.includes("gönder")) {
        onWake("SEND"); // 'Gönder' komutunu alır ve onWake'e 'SEND' gönderir
      } else if (lowerWords.includes("onaylıyorum")) {
        onWake("CONFIRM"); // 'Onaylıyorum' komutunu alır ve onWake'e 'CONFIRM' gönderir
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []); // Hook sadece bir kez çalışacak

  return { startListening, stopListening, isListening };
};

export default useWakeWord;
