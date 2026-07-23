import { quranSurah67Verses1To6 } from "#corpus/quran/surah/67/1-6";
import { quranSurah67Verses7To12 } from "#corpus/quran/surah/67/7-12";
import { quranSurah67Verses13To18 } from "#corpus/quran/surah/67/13-18";
import { quranSurah67Verses19To24 } from "#corpus/quran/surah/67/19-24";
import { quranSurah67Verses25To30 } from "#corpus/quran/surah/67/25-30";

export const quranSurah67 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0643",
    short: "الملك",
    translation: {
      en: "The Sovereignty",
      id: "Kerajaan",
    },
    transliteration: {
      en: "Al-Mulk",
      id: "Al-Mulk",
    },
  },
  number: 67,
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
  sequence: 77,
  tafsir: {
    id: "Surat ini terdiri atas 30 ayat, termasuk golongan surat-surat  Makkiyah, diturunkan sesudah Ath Thuur. Nama Al Mulk diambil dari kata Al Mulk yang terdapat pada ayat pertama surat ini yang artinya kerajaan atau kekuasaan. Dinamai pula surat ini dengan At Tabaarak (Maha Suci).",
  },
  verses: [
    ...quranSurah67Verses1To6,
    ...quranSurah67Verses7To12,
    ...quranSurah67Verses13To18,
    ...quranSurah67Verses19To24,
    ...quranSurah67Verses25To30,
  ],
};
