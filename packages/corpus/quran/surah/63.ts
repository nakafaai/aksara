import { quranSurah63Verses1To6 } from "#corpus/quran/surah/63/1-6";
import { quranSurah63Verses7To11 } from "#corpus/quran/surah/63/7-11";

export const quranSurah63 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u0627\u0641\u0642\u0648\u0646",
    short: "المنافقون",
    translation: {
      en: "The Hypocrites",
      id: "Orang-Orang Munafik",
    },
    transliteration: {
      en: "Al-Munaafiqoon",
      id: "Al-Munafiqun",
    },
  },
  number: 63,
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
    arab: "\u0645\u062F\u064A\u0646\u0629",
    en: "Medinan",
    id: "Madaniyyah",
  },
  sequence: 104,
  tafsir: {
    id: "Surat ini terdiri atas 11 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Hajj. Surat ini dinamai Al-Munaafiquun  yang artinya orang-orang munafik, karena surat ini mengungkapkan  sifat-sifat orang-orang munafik.",
  },
  verses: [...quranSurah63Verses1To6, ...quranSurah63Verses7To11],
};
