import { quranSurah83Verses1To6 } from "#corpus/quran/surah/83/1-6";
import { quranSurah83Verses7To12 } from "#corpus/quran/surah/83/7-12";
import { quranSurah83Verses13To18 } from "#corpus/quran/surah/83/13-18";
import { quranSurah83Verses19To24 } from "#corpus/quran/surah/83/19-24";
import { quranSurah83Verses25To30 } from "#corpus/quran/surah/83/25-30";
import { quranSurah83Verses31To36 } from "#corpus/quran/surah/83/31-36";

export const quranSurah83 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0637\u0641\u0641\u064a\u0646",
    short: "المطففين",
    translation: {
      en: "Defrauding",
      id: "Orang-Orang Curang",
    },
    transliteration: {
      en: "Al-Mutaffifin",
      id: "Al-Mutaffifin",
    },
  },
  number: 83,
  numberOfVerses: 36,
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
  sequence: 86,
  tafsir: {
    id: "Surat ini terdiri atas 36 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al 'Ankabuut dan merupakan  surat yang terakhir di Mekkah sebelum hijrah. Al Muthaffifiin  yang dijadikan nama bagi surat ini diambil dari kata  Al Muthaffifiin yang terdapat pada ayat pertama.",
  },
  verses: [
    ...quranSurah83Verses1To6,
    ...quranSurah83Verses7To12,
    ...quranSurah83Verses13To18,
    ...quranSurah83Verses19To24,
    ...quranSurah83Verses25To30,
    ...quranSurah83Verses31To36,
  ],
};
