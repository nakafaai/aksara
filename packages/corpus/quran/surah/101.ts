import { quranSurah101Verses1To6 } from "#corpus/quran/surah/101/1-6";
import { quranSurah101Verses7To11 } from "#corpus/quran/surah/101/7-11";

export const quranSurah101 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0642\u0627\u0631\u0639\u0629",
    short: "القارعة",
    translation: {
      en: "The Calamity",
      id: "Hari Kiamat",
    },
    transliteration: {
      en: "Al-Qaari'a",
      id: "Al-Qari'ah",
    },
  },
  number: 101,
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
  sequence: 30,
  tafsir: {
    id: "Surat ini terdiri atas 11 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Quraisy. Nama Al Qaari'ah diambil dari kata Al Qaari'ah yang terdapat pada ayat pertama, artinya mengetok dengan keras, kemudian kata ini dipakai untuk nama hari kiamat.",
  },
  verses: [...quranSurah101Verses1To6, ...quranSurah101Verses7To11],
};
