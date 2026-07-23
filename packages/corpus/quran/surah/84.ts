import { quranSurah84Verses1To6 } from "#corpus/quran/surah/84/1-6";
import { quranSurah84Verses7To12 } from "#corpus/quran/surah/84/7-12";
import { quranSurah84Verses13To18 } from "#corpus/quran/surah/84/13-18";
import { quranSurah84Verses19To24 } from "#corpus/quran/surah/84/19-24";
import { quranSurah84Verses25To25 } from "#corpus/quran/surah/84/25-25";

export const quranSurah84 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0625\u0646\u0634\u0642\u0627\u0642",
    short: "الإنشقاق",
    translation: {
      en: "The Splitting Open",
      id: "Terbelah",
    },
    transliteration: {
      en: "Al-Inshiqaaq",
      id: "Al-Insyiqaq",
    },
  },
  number: 84,
  numberOfVerses: 25,
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
  sequence: 83,
  tafsir: {
    id: "Surat Al Insyiqaaq, terdiri atas 25 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Infithaarr. Dinamai Al Insyiqaaq (terbelah), diambil dari perkataan Insyaqqat yang terdapat pada permulaan surat ini, yang pokok katanya ialah insyiqaaq.",
  },
  verses: [
    ...quranSurah84Verses1To6,
    ...quranSurah84Verses7To12,
    ...quranSurah84Verses13To18,
    ...quranSurah84Verses19To24,
    ...quranSurah84Verses25To25,
  ],
};
