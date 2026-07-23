import { quranSurah49Verses1To6 } from "#corpus/quran/surah/49/1-6";
import { quranSurah49Verses7To12 } from "#corpus/quran/surah/49/7-12";
import { quranSurah49Verses13To18 } from "#corpus/quran/surah/49/13-18";

export const quranSurah49 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062d\u062c\u0631\u0627\u062a",
    short: "الحجرات",
    translation: {
      en: "The Inner Apartments",
      id: "Kamar-Kamar",
    },
    transliteration: {
      en: "Al-Hujuraat",
      id: "Al-Hujurat",
    },
  },
  number: 49,
  numberOfVerses: 18,
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
  sequence: 106,
  tafsir: {
    id: "Surat Al Hujuraat terdiri atas 18 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Mujaadalah. Dinamai Al Hujuraat diambil dari perkataan Al Hujuraat yang terdapat pada ayat 4 surat ini. Ayat tersebut mencela para sahabat yang memanggil Nabi Muhammad SAW yang sedang berada di dalam kamar rumahnya bersama isterinya. Memanggil Nabi Muhammad SAW dengan cara dan dalam keadaan yang demikian menunjukkan sifat kurang hormat kepada beliau dan mengganggu ketenteraman beliau.",
  },
  verses: [
    ...quranSurah49Verses1To6,
    ...quranSurah49Verses7To12,
    ...quranSurah49Verses13To18,
  ],
};
