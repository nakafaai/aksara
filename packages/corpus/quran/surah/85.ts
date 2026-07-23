import { quranSurah85Verses1To6 } from "#corpus/quran/surah/85/1-6";
import { quranSurah85Verses7To12 } from "#corpus/quran/surah/85/7-12";
import { quranSurah85Verses13To18 } from "#corpus/quran/surah/85/13-18";
import { quranSurah85Verses19To22 } from "#corpus/quran/surah/85/19-22";

export const quranSurah85 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0628\u0631\u0648\u062c",
    short: "البروج",
    translation: {
      en: "The Constellations",
      id: "Gugusan Bintang",
    },
    transliteration: {
      en: "Al-Burooj",
      id: "Al-Buruj",
    },
  },
  number: 85,
  numberOfVerses: 22,
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
  sequence: 27,
  tafsir: {
    id: "Surat Al Buruuj terdiri atas 22 ayat, termasuk golongan surat-surat Makkiyyah diturunkan sesudah surat Asy-Syams.Dinamai Al Buruuj (gugusan bintang) diambil dari perkataan Al Buruuj yang terdapat pada ayat 1 surat ini.",
  },
  verses: [
    ...quranSurah85Verses1To6,
    ...quranSurah85Verses7To12,
    ...quranSurah85Verses13To18,
    ...quranSurah85Verses19To22,
  ],
};
