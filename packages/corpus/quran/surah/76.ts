import { quranSurah76Verses1To6 } from "#corpus/quran/surah/76/1-6";
import { quranSurah76Verses7To12 } from "#corpus/quran/surah/76/7-12";
import { quranSurah76Verses13To18 } from "#corpus/quran/surah/76/13-18";
import { quranSurah76Verses19To24 } from "#corpus/quran/surah/76/19-24";
import { quranSurah76Verses25To30 } from "#corpus/quran/surah/76/25-30";
import { quranSurah76Verses31To31 } from "#corpus/quran/surah/76/31-31";

export const quranSurah76 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0627\u0646\u0633\u0627\u0646",
    short: "الانسان",
    translation: {
      en: "Man",
      id: "Manusia",
    },
    transliteration: {
      en: "Al-Insaan",
      id: "Al-Insan",
    },
  },
  number: 76,
  numberOfVerses: 31,
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
    arab: "\u0645\u062F\u064A\u0646\u0629",
    en: "Medinan",
    id: "Madaniyyah",
  },
  sequence: 98,
  tafsir: {
    id: "Surat Al Insaan terdiri atas 31 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Ar Rahmaan. Dinamai al Insaan (manusia) diambil dari perkataan Al Insaan yang terdapat pada ayat pertama surat ini.",
  },
  verses: [
    ...quranSurah76Verses1To6,
    ...quranSurah76Verses7To12,
    ...quranSurah76Verses13To18,
    ...quranSurah76Verses19To24,
    ...quranSurah76Verses25To30,
    ...quranSurah76Verses31To31,
  ],
};
