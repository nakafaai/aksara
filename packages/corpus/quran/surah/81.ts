import { quranSurah81Verses1To6 } from "#corpus/quran/surah/81/1-6";
import { quranSurah81Verses7To12 } from "#corpus/quran/surah/81/7-12";
import { quranSurah81Verses13To18 } from "#corpus/quran/surah/81/13-18";
import { quranSurah81Verses19To24 } from "#corpus/quran/surah/81/19-24";
import { quranSurah81Verses25To29 } from "#corpus/quran/surah/81/25-29";

export const quranSurah81 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062a\u0643\u0648\u064a\u0631",
    short: "التكوير",
    translation: {
      en: "The Overthrowing",
      id: "Penggulungan",
    },
    transliteration: {
      en: "At-Takwir",
      id: "At-Takwir",
    },
  },
  number: 81,
  numberOfVerses: 29,
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
  sequence: 7,
  tafsir: {
    id: "Surat At Takwir terdiri atas 29 ayat dan termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Masadd. Kata At Takwir (terbelah) yang menjadi nama bagi surat ini adalah dari kata asal (mashdar) dari kata kerja kuwwirat (digulung) yang terdapat pada ayat pertama surat ini.",
  },
  verses: [
    ...quranSurah81Verses1To6,
    ...quranSurah81Verses7To12,
    ...quranSurah81Verses13To18,
    ...quranSurah81Verses19To24,
    ...quranSurah81Verses25To29,
  ],
};
