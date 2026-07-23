import { quranSurah102Verses1To6 } from "#corpus/quran/surah/102/1-6";
import { quranSurah102Verses7To8 } from "#corpus/quran/surah/102/7-8";

export const quranSurah102 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062a\u0643\u0627\u062b\u0631",
    short: "التكاثر",
    translation: {
      en: "Competition",
      id: "Bermegah-Megahan",
    },
    transliteration: {
      en: "At-Takaathur",
      id: "At-Takasur",
    },
  },
  number: 102,
  numberOfVerses: 8,
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
  sequence: 16,
  tafsir: {
    id: "Surat At Takaatsur terdiri atas 8 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Kautsar. Dinamai At Takaatsur (bermegah-megahan) diambil dari perkataan At Takaatsur yang terdapat pada ayat pertama surat ini.",
  },
  verses: [...quranSurah102Verses1To6, ...quranSurah102Verses7To8],
};
