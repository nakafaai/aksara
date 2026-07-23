import { quranSurah60Verses1To6 } from "#corpus/quran/surah/60/1-6";
import { quranSurah60Verses7To12 } from "#corpus/quran/surah/60/7-12";
import { quranSurah60Verses13To13 } from "#corpus/quran/surah/60/13-13";

export const quranSurah60 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0645\u062a\u062d\u0646\u0629",
    short: "الممتحنة",
    translation: {
      en: "She that is to be examined",
      id: "Wanita Yang Diuji",
    },
    transliteration: {
      en: "Al-Mumtahana",
      id: "Al-Mumtahanah",
    },
  },
  number: 60,
  numberOfVerses: 13,
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
  sequence: 91,
  tafsir: {
    id: 'Surat Al Mumtahanah terdiri atas 13 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Al Ahzab. Dinamai Al Mumtahanah (wanita yang diuji), diambil dari kata "Famtahinuuhunna" yang berarti maka ujilah mereka, yang terdapat pada ayat 10 surat ini.',
  },
  verses: [
    ...quranSurah60Verses1To6,
    ...quranSurah60Verses7To12,
    ...quranSurah60Verses13To13,
  ],
};
