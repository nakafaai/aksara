import { quranSurah1Verses1To6 } from "#corpus/quran/surah/1/1-6";
import { quranSurah1Verses7To7 } from "#corpus/quran/surah/1/7-7";

export const quranSurah1 = {
  name: {
    long: "\u0633\u064f\u0648\u0631\u064e\u0629\u064f \u0671\u0644\u0652\u0641\u064e\u0627\u062a\u0650\u062d\u064e\u0629\u0650",
    short: "الفاتحة",
    translation: {
      en: "The Opening",
      id: "Pembukaan",
    },
    transliteration: {
      en: "Al-Faatiha",
      id: "Al-Fatihah",
    },
  },
  number: 1,
  numberOfVerses: 7,
  preBismillah: null,
  revelation: {
    arab: "\u0645\u0643\u0629",
    en: "Meccan",
    id: "Makkiyyah",
  },
  sequence: 5,
  tafsir: {
    id: "Surat Al Faatihah (Pembukaan) yang diturunkan di Mekah dan terdiri dari 7 ayat adalah surat yang pertama-tama diturunkan dengan lengkap  diantara surat-surat yang ada dalam Al Quran dan termasuk golongan surat Makkiyyah. Surat ini disebut Al Faatihah (Pembukaan), karena dengan surat inilah dibuka dan dimulainya Al Quran. Dinamakan Ummul Quran (induk Al Quran) atau Ummul Kitaab (induk Al Kitaab) karena dia merupakan induk dari semua isi Al Quran, dan karena itu diwajibkan membacanya pada tiap-tiap sembahyang. Dinamakan pula As Sab'ul matsaany (tujuh yang berulang-ulang) karena ayatnya tujuh dan dibaca berulang-ulang dalam sholat.",
  },
  verses: [...quranSurah1Verses1To6, ...quranSurah1Verses7To7],
};
