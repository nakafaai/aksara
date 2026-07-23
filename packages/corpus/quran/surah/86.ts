import { quranSurah86Verses1To6 } from "#corpus/quran/surah/86/1-6";
import { quranSurah86Verses7To12 } from "#corpus/quran/surah/86/7-12";
import { quranSurah86Verses13To17 } from "#corpus/quran/surah/86/13-17";

export const quranSurah86 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0637\u0627\u0631\u0642",
    short: "الطارق",
    translation: {
      en: "The Morning Star",
      id: "Yang Datang Di Malam Hari",
    },
    transliteration: {
      en: "At-Taariq",
      id: "At-Tariq",
    },
  },
  number: 86,
  numberOfVerses: 17,
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
  sequence: 36,
  tafsir: {
    id: "Surat Ath Thaariq terdiri atas 17 ayat, termasuk golongan surat-surat Makkiyah,  diturunkan sesudah surat Al Balad.  Dinamai Ath Thaariq (yang datang di malam hari) diambil dari  perkataan Ath Thaariq yang terdapat pada ayat 1 surat ini.",
  },
  verses: [
    ...quranSurah86Verses1To6,
    ...quranSurah86Verses7To12,
    ...quranSurah86Verses13To17,
  ],
};
