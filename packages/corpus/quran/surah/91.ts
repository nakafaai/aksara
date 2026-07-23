import { quranSurah91Verses1To6 } from "#corpus/quran/surah/91/1-6";
import { quranSurah91Verses7To12 } from "#corpus/quran/surah/91/7-12";
import { quranSurah91Verses13To15 } from "#corpus/quran/surah/91/13-15";

export const quranSurah91 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0634\u0645\u0633",
    short: "الشمس",
    translation: {
      en: "The Sun",
      id: "Matahari",
    },
    transliteration: {
      en: "Ash-Shams",
      id: "Asy-Syams",
    },
  },
  number: 91,
  numberOfVerses: 15,
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
  sequence: 26,
  tafsir: {
    id: "Surat Asy Syams terdiri atas 15 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Qadar.  Dinamai Asy Syams (matahari) diambil dari perkataan Asy Syams yang terdapat pada ayat permulaan surat ini.",
  },
  verses: [
    ...quranSurah91Verses1To6,
    ...quranSurah91Verses7To12,
    ...quranSurah91Verses13To15,
  ],
};
