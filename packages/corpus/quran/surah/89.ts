import { quranSurah89Verses1To6 } from "#corpus/quran/surah/89/1-6";
import { quranSurah89Verses7To12 } from "#corpus/quran/surah/89/7-12";
import { quranSurah89Verses13To18 } from "#corpus/quran/surah/89/13-18";
import { quranSurah89Verses19To24 } from "#corpus/quran/surah/89/19-24";
import { quranSurah89Verses25To30 } from "#corpus/quran/surah/89/25-30";

export const quranSurah89 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0641\u062c\u0631",
    short: "الفجر",
    translation: {
      en: "The Dawn",
      id: "Fajar",
    },
    transliteration: {
      en: "Al-Fajr",
      id: "Al-Fajr",
    },
  },
  number: 89,
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
  sequence: 10,
  tafsir: {
    id: "Surat ini terdiri atas 30 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Lail. Nama Al Fajr diambil dari kata Al Fajr yang terdapat pada ayat pertama surat ini yang artinya fajar.",
  },
  verses: [
    ...quranSurah89Verses1To6,
    ...quranSurah89Verses7To12,
    ...quranSurah89Verses13To18,
    ...quranSurah89Verses19To24,
    ...quranSurah89Verses25To30,
  ],
};
