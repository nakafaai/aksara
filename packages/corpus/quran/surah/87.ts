import { quranSurah87Verses1To6 } from "#corpus/quran/surah/87/1-6";
import { quranSurah87Verses7To12 } from "#corpus/quran/surah/87/7-12";
import { quranSurah87Verses13To18 } from "#corpus/quran/surah/87/13-18";
import { quranSurah87Verses19To19 } from "#corpus/quran/surah/87/19-19";

export const quranSurah87 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0623\u0639\u0644\u0649",
    short: "الأعلى",
    translation: {
      en: "The Most High",
      id: "Maha Tinggi",
    },
    transliteration: {
      en: "Al-A'laa",
      id: "Al-A'la",
    },
  },
  number: 87,
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
  sequence: 8,
  tafsir: {
    id: "Surat ini terdiri atas 19 ayat, termasuk golongan surat-surat Makkiyyah, dan diturunkan sesudah surat At Takwiir. Nama Al A´laa diambil dari kata Al A´laa yang terdapat pada ayat pertama, berarti Yang Paling Tinggi. Muslim meriwayatkan dalam kitab Al Jumu'ah, dan diriwayatkan pula oleh Ashhaabus Sunan, dari Nu'man ibnu Basyir bahwa Rasulullah s.a.w. pada shalat dua hari Raya (Fitri dan Adha) dan shalat Jum'at membaca surat Al A´laa pada rakaat pertama, dan surat Al Ghaasyiyah pada rakaat kedua.",
  },
  verses: [
    ...quranSurah87Verses1To6,
    ...quranSurah87Verses7To12,
    ...quranSurah87Verses13To18,
    ...quranSurah87Verses19To19,
  ],
};
