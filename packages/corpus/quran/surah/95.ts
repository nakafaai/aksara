import { quranSurah95Verses1To6 } from "#corpus/quran/surah/95/1-6";
import { quranSurah95Verses7To8 } from "#corpus/quran/surah/95/7-8";

export const quranSurah95 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062a\u064a\u0646",
    short: "التين",
    translation: {
      en: "The Fig",
      id: "Buah Tin",
    },
    transliteration: {
      en: "At-Tin",
      id: "At-Tin",
    },
  },
  number: 95,
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
  sequence: 28,
  tafsir: {
    id: "Surat ini terdiri atas 8 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Buruuj. Nama At Tiin diambil dari kata At Tiin yang terdapat pada ayat pertama surat ini yang artinya buah Tin.",
  },
  verses: [...quranSurah95Verses1To6, ...quranSurah95Verses7To8],
};
