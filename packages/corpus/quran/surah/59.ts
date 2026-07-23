import { quranSurah59Verses1To6 } from "#corpus/quran/surah/59/1-6";
import { quranSurah59Verses7To12 } from "#corpus/quran/surah/59/7-12";
import { quranSurah59Verses13To18 } from "#corpus/quran/surah/59/13-18";
import { quranSurah59Verses19To24 } from "#corpus/quran/surah/59/19-24";

export const quranSurah59 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062d\u0634\u0631",
    short: "الحشر",
    translation: {
      en: "The Exile",
      id: "Pengusiran",
    },
    transliteration: {
      en: "Al-Hashr",
      id: "Al-Hasyr",
    },
  },
  number: 59,
  numberOfVerses: 24,
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
  sequence: 101,
  tafsir: {
    id: "Surat Al Hasyr terdiri atas 24 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Bayyinah. \tDinamai surat Al Hasyr (pengusiran) diambil dari perkataan Al-Hasyr yang terdapat pada ayat 2 surat ini. Di dalam surat ini disebutkan  kisah pengusiran suatu suku Yahudi yang bernama Bani Nadhir yang berdiam  di sekitar kota Madinah.",
  },
  verses: [
    ...quranSurah59Verses1To6,
    ...quranSurah59Verses7To12,
    ...quranSurah59Verses13To18,
    ...quranSurah59Verses19To24,
  ],
};
