import { quranSurah72Verses1To6 } from "#corpus/quran/surah/72/1-6";
import { quranSurah72Verses7To12 } from "#corpus/quran/surah/72/7-12";
import { quranSurah72Verses13To18 } from "#corpus/quran/surah/72/13-18";
import { quranSurah72Verses19To24 } from "#corpus/quran/surah/72/19-24";
import { quranSurah72Verses25To28 } from "#corpus/quran/surah/72/25-28";

export const quranSurah72 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062c\u0646",
    short: "الجن",
    translation: {
      en: "The Jinn",
      id: "Jin",
    },
    transliteration: {
      en: "Al-Jinn",
      id: "Al-Jinn",
    },
  },
  number: 72,
  numberOfVerses: 28,
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
  sequence: 40,
  tafsir: {
    id: "Surat Al Jin terdiri atas 28 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al A'raaf. Dinamai Al Jin diambil dari perkataan Al Jin yang terdapat  pada ayat pertama surat ini. Pada ayat tersebut dan ayat-ayat berikutnya  diterangkan bahwa Jin sebagai makhluk halus telah mendengar pembacaan  Al Quran dan mereka mengikuti ajaran Al Quran tersebut.",
  },
  verses: [
    ...quranSurah72Verses1To6,
    ...quranSurah72Verses7To12,
    ...quranSurah72Verses13To18,
    ...quranSurah72Verses19To24,
    ...quranSurah72Verses25To28,
  ],
};
