import { exec } from 'child_process';
import fs from 'fs';

/**
 * Verilen video dosyalarını birleştirir.
 * @param {Array} inputFiles - Giriş video dosyalarının yolu.
 * @param {String} outputFile - Çıktı video dosyasının yolu.
 */
export const mergeVideos = (inputFiles, outputFile) => {
  const inputArgs = inputFiles.map(file => `-i ${file}`).join(' '); // input dosyalarını al
  const command = `ffmpeg ${inputArgs} -c:v copy -c:a copy ${outputFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`ffmpeg hata: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ffmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`ffmpeg çıktı: ${stdout}`);
  });
};

/**
 * Bir video dosyasını dönüştürür.
 * @param {String} inputFile - Giriş video dosyasının yolu.
 * @param {String} outputFile - Çıktı video dosyasının yolu.
 * @param {String} format - Çıktı formatı (örn. 'mp4', 'avi', vb.).
 */
export const convertVideoFormat = (inputFile, outputFile, format) => {
  const command = `ffmpeg -i ${inputFile} ${outputFile}.${format}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`ffmpeg hata: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ffmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`ffmpeg çıktı: ${stdout}`);
  });
};

/**
 * Video dosyasını ses dosyasına dönüştürür.
 * @param {String} inputFile - Giriş video dosyasının yolu.
 * @param {String} outputFile - Çıktı ses dosyasının yolu.
 */
export const extractAudioFromVideo = (inputFile, outputFile) => {
  const command = `ffmpeg -i ${inputFile} -q:a 0 -map a ${outputFile}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`ffmpeg hata: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`ffmpeg stderr: ${stderr}`);
      return;
    }
    console.log(`ffmpeg çıktı: ${stdout}`);
  });
};
