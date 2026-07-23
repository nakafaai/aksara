import { quranSurah92Verses1To6 } from "#corpus/quran/surah/92/1-6";
import { quranSurah92Verses7To12 } from "#corpus/quran/surah/92/7-12";
import { quranSurah92Verses13To18 } from "#corpus/quran/surah/92/13-18";
import { quranSurah92Verses19To21 } from "#corpus/quran/surah/92/19-21";

export const quranSurah92 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0644\u064a\u0644",
    short: "الليل",
    translation: {
      en: "The Night",
      id: "Malam",
    },
    transliteration: {
      en: "Al-Lail",
      id: "Al-Lail",
    },
  },
  number: 92,
  numberOfVerses: 21,
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
  sequence: 9,
  tafsir: {
    id: "Surat ini terdiri atas 21 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al A'laa. Surat ini dinamai Al Lail (malam), diambil dari perkataan Al Lail yang terdapat pada ayat pertama surat ini",
  },
  verses: [
    ...quranSurah92Verses1To6,
    ...quranSurah92Verses7To12,
    ...quranSurah92Verses13To18,
    ...quranSurah92Verses19To21,
  ],
};
