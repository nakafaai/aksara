import { quranSurah32Verses1To6 } from "#corpus/quran/surah/32/1-6";
import { quranSurah32Verses7To12 } from "#corpus/quran/surah/32/7-12";
import { quranSurah32Verses13To18 } from "#corpus/quran/surah/32/13-18";
import { quranSurah32Verses19To24 } from "#corpus/quran/surah/32/19-24";
import { quranSurah32Verses25To30 } from "#corpus/quran/surah/32/25-30";

export const quranSurah32 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0633\u062c\u062f\u0629",
    short: "السجدة",
    translation: {
      en: "The Prostration",
      id: "Sajdah",
    },
    transliteration: {
      en: "As-Sajda",
      id: "As-Sajdah",
    },
  },
  number: 32,
  numberOfVerses: 30,
  preBismillah: {
    audio: {
      primary: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/1",
      secondary: [
        "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
        "https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3",
      ],
    },
    text: {
      arab: "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650",
      transliteration: {
        en: "Bismillaahir Rahmaanir Raheem",
      },
    },
    translation: {
      en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      id: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
    },
  },
  revelation: {
    arab: "\u0645\u0643\u0629",
    en: "Meccan",
    id: "Makkiyyah",
  },
  sequence: 75,
  tafsir: {
    id: "Surat As Sajdah terdiri atas 30 ayat termasuk golongan surat Makkiyah diturunkan sesudah surat Al Mu'minuun. Dinamakan As Sajdah berhubung pada surat ini terdapat ayat sajdah, yaitu ayat yang kelima belas.",
  },
  verses: [
    ...quranSurah32Verses1To6,
    ...quranSurah32Verses7To12,
    ...quranSurah32Verses13To18,
    ...quranSurah32Verses19To24,
    ...quranSurah32Verses25To30,
  ],
};
