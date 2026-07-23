import { quranSurah90Verses1To6 } from "#corpus/quran/surah/90/1-6";
import { quranSurah90Verses7To12 } from "#corpus/quran/surah/90/7-12";
import { quranSurah90Verses13To18 } from "#corpus/quran/surah/90/13-18";
import { quranSurah90Verses19To20 } from "#corpus/quran/surah/90/19-20";

export const quranSurah90 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0628\u0644\u062f",
    short: "البلد",
    translation: {
      en: "The City",
      id: "Negeri",
    },
    transliteration: {
      en: "Al-Balad",
      id: "Al-Balad",
    },
  },
  number: 90,
  numberOfVerses: 20,
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
  sequence: 35,
  tafsir: {
    id: "Surat Al Balad terdiri atas 20 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Qaaf. Dinamai Al Balad, diambil dari perkataan Al Balad yang terdapat  pada ayat pertama surat ini. Yang dimaksud dengan kota di sini ialah kota Mekah.",
  },
  verses: [
    ...quranSurah90Verses1To6,
    ...quranSurah90Verses7To12,
    ...quranSurah90Verses13To18,
    ...quranSurah90Verses19To20,
  ],
};
