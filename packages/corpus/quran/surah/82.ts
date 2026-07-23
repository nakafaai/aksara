import { quranSurah82Verses1To6 } from "#corpus/quran/surah/82/1-6";
import { quranSurah82Verses7To12 } from "#corpus/quran/surah/82/7-12";
import { quranSurah82Verses13To18 } from "#corpus/quran/surah/82/13-18";
import { quranSurah82Verses19To19 } from "#corpus/quran/surah/82/19-19";

export const quranSurah82 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0625\u0646\u0641\u0637\u0627\u0631",
    short: "الإنفطار",
    translation: {
      en: "The Cleaving",
      id: "Terbelah",
    },
    transliteration: {
      en: "Al-Infitaar",
      id: "Al-Infitar",
    },
  },
  number: 82,
  numberOfVerses: 19,
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
  sequence: 82,
  tafsir: {
    id: "Surat ini terdiri atas 19 ayat, termasuk golongan surat-surat Makkiyah dan diturunkan sesudah surat An Naazi'aat. Al Infithaar yang dijadikan  nama untuk surat ini adalah kata asal dari kata Infatharat (terbelah)  yang terdapat pada ayat pertama.",
  },
  verses: [
    ...quranSurah82Verses1To6,
    ...quranSurah82Verses7To12,
    ...quranSurah82Verses13To18,
    ...quranSurah82Verses19To19,
  ],
};
