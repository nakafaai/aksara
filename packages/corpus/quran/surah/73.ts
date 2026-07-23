import { quranSurah73Verses1To6 } from "#corpus/quran/surah/73/1-6";
import { quranSurah73Verses7To12 } from "#corpus/quran/surah/73/7-12";
import { quranSurah73Verses13To18 } from "#corpus/quran/surah/73/13-18";
import { quranSurah73Verses19To20 } from "#corpus/quran/surah/73/19-20";

export const quranSurah73 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0632\u0645\u0644",
    short: "المزمل",
    translation: {
      en: "The Enshrouded One",
      id: "Orang Yang Berselimut",
    },
    transliteration: {
      en: "Al-Muzzammil",
      id: "Al-Muzzammil",
    },
  },
  number: 73,
  numberOfVerses: 20,
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
  sequence: 3,
  tafsir: {
    id: "Surat Al Muzzammil terdiri atas 20 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Qalam.Dinamai Al Muzzammil (orang yang berselimut) diambil dari perkataan Al Muzzammil yang terdapat pada ayat pertama surat ini. Yang dimaksud dengan orang yang berkemul ialah Nabi Muhammad s.a.w.",
  },
  verses: [
    ...quranSurah73Verses1To6,
    ...quranSurah73Verses7To12,
    ...quranSurah73Verses13To18,
    ...quranSurah73Verses19To20,
  ],
};
