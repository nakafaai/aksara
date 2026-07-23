import { quranSurah65Verses1To6 } from "#corpus/quran/surah/65/1-6";
import { quranSurah65Verses7To12 } from "#corpus/quran/surah/65/7-12";

export const quranSurah65 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0637\u0644\u0627\u0642",
    short: "الطلاق",
    translation: {
      en: "Divorce",
      id: "Talak",
    },
    transliteration: {
      en: "At-Talaaq",
      id: "At-Talaq",
    },
  },
  number: 65,
  numberOfVerses: 12,
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
  sequence: 99,
  tafsir: {
    id: "Surat ini terdiri atas 12 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Insaan. Dinamai surat Ath Thalaaq karena kebanyakan ayat-ayatnya mengenai masalah talak dan yang berhubungan dengan masalah itu.",
  },
  verses: [...quranSurah65Verses1To6, ...quranSurah65Verses7To12],
};
