import { quranSurah96Verses1To6 } from "#corpus/quran/surah/96/1-6";
import { quranSurah96Verses7To12 } from "#corpus/quran/surah/96/7-12";
import { quranSurah96Verses13To18 } from "#corpus/quran/surah/96/13-18";
import { quranSurah96Verses19To19 } from "#corpus/quran/surah/96/19-19";

export const quranSurah96 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0639\u0644\u0642",
    short: "العلق",
    translation: {
      en: "The Clot",
      id: "Segumpal Darah",
    },
    transliteration: {
      en: "Al-Alaq",
      id: "Al-'Alaq",
    },
  },
  number: 96,
  numberOfVerses: 19,
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
  sequence: 1,
  tafsir: {
    id: "Surat Al 'Alaq terdiri atas 19 ayat, termasuk golongan surat-surat Makkiyah. Ayat 1 sampai dengan 5 dari surat ini adalah ayat-ayat Al Quran yang pertama sekali diturunkan, yaitu di waktu Nabi Muhammad s.a.w. berkhalwat di gua Hira'. Surat ini dinamai Al 'Alaq (segumpal darah), diambil dari perkataan Alaq yang terdapat pada ayat 2 surat ini. Surat ini dinamai juga dengan Iqra atau Al Qalam.",
  },
  verses: [
    ...quranSurah96Verses1To6,
    ...quranSurah96Verses7To12,
    ...quranSurah96Verses13To18,
    ...quranSurah96Verses19To19,
  ],
};
