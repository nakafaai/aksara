import { quranSurah107Verses1To6 } from "#corpus/quran/surah/107/1-6";
import { quranSurah107Verses7To7 } from "#corpus/quran/surah/107/7-7";

export const quranSurah107 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0627\u0639\u0648\u0646",
    short: "الماعون",
    translation: {
      en: "Almsgiving",
      id: "Barang Yang Berguna",
    },
    transliteration: {
      en: "Al-Maa'un",
      id: "Al-Ma'un",
    },
  },
  number: 107,
  numberOfVerses: 7,
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
  sequence: 17,
  tafsir: {
    id: "Surat ini terdiri atas 7 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat At Taakatsur. Nama Al Maa'uun diambil dari kata Al Maa'uun yang terdapat pada ayat 7, artinya barang-barang yang berguna.",
  },
  verses: [...quranSurah107Verses1To6, ...quranSurah107Verses7To7],
};
