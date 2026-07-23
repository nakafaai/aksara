import { quranSurah88Verses1To6 } from "#corpus/quran/surah/88/1-6";
import { quranSurah88Verses7To12 } from "#corpus/quran/surah/88/7-12";
import { quranSurah88Verses13To18 } from "#corpus/quran/surah/88/13-18";
import { quranSurah88Verses19To24 } from "#corpus/quran/surah/88/19-24";
import { quranSurah88Verses25To26 } from "#corpus/quran/surah/88/25-26";

export const quranSurah88 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u063a\u0627\u0634\u064a\u0629",
    short: "الغاشية",
    translation: {
      en: "The Overwhelming",
      id: "Hari Kiamat",
    },
    transliteration: {
      en: "Al-Ghaashiya",
      id: "Al-Gasyiyah",
    },
  },
  number: 88,
  numberOfVerses: 26,
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
  sequence: 68,
  tafsir: {
    id: "Surat ini terdiri atas 26 ayat, termasuk surat-surat Makkiyah, diturunkan sesudah surat Adz Dzaariat. Nama Ghaasyiyah diambil dari kata Al Ghaasyiyah yang terdapat pada ayat pertama surat ini yang  artinya peristiwa yang dahsyat, tapi yang dimaksud adalah hari kiamat. Surat ini adalah surat yang kerap kali dibaca Nabi pada rakaat kedua  pada shalat hari-hari Raya dan shalat Jum'at",
  },
  verses: [
    ...quranSurah88Verses1To6,
    ...quranSurah88Verses7To12,
    ...quranSurah88Verses13To18,
    ...quranSurah88Verses19To24,
    ...quranSurah88Verses25To26,
  ],
};
