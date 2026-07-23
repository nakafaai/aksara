import { quranSurah71Verses1To6 } from "#corpus/quran/surah/71/1-6";
import { quranSurah71Verses7To12 } from "#corpus/quran/surah/71/7-12";
import { quranSurah71Verses13To18 } from "#corpus/quran/surah/71/13-18";
import { quranSurah71Verses19To24 } from "#corpus/quran/surah/71/19-24";
import { quranSurah71Verses25To28 } from "#corpus/quran/surah/71/25-28";

export const quranSurah71 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0646\u0648\u062d",
    short: "نوح",
    translation: {
      en: "Noah",
      id: "Nuh",
    },
    transliteration: {
      en: "Nooh",
      id: "Nuh",
    },
  },
  number: 71,
  numberOfVerses: 28,
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
  sequence: 71,
  tafsir: {
    id: "Surat ini terdiri atas 28 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat An Nahl. Dinamakan dengan surat Nuh karena surat ini seluruhnya menjelaskan da'wah dan doa Nabi Nuh a.s.",
  },
  verses: [
    ...quranSurah71Verses1To6,
    ...quranSurah71Verses7To12,
    ...quranSurah71Verses13To18,
    ...quranSurah71Verses19To24,
    ...quranSurah71Verses25To28,
  ],
};
