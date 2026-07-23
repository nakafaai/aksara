import { quranSurah93Verses1To6 } from "#corpus/quran/surah/93/1-6";
import { quranSurah93Verses7To11 } from "#corpus/quran/surah/93/7-11";

export const quranSurah93 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0636\u062d\u0649",
    short: "الضحى",
    translation: {
      en: "The Morning Hours",
      id: "Duha",
    },
    transliteration: {
      en: "Ad-Dhuhaa",
      id: "Ad-Duha",
    },
  },
  number: 93,
  numberOfVerses: 11,
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
  sequence: 11,
  tafsir: {
    id: "Surat ini terdiri atas 11 ayat, termasuk golongan surat Makiyyah dan diturunkan sesudah surat Al Fajr. Nama Adh Dhuhaa diambil dari kata yang terdapat pada ayat pertama, artinya : waktu matahari sepenggalahan naik.",
  },
  verses: [...quranSurah93Verses1To6, ...quranSurah93Verses7To11],
};
