import { quranSurah75Verses1To6 } from "#corpus/quran/surah/75/1-6";
import { quranSurah75Verses7To12 } from "#corpus/quran/surah/75/7-12";
import { quranSurah75Verses13To18 } from "#corpus/quran/surah/75/13-18";
import { quranSurah75Verses19To24 } from "#corpus/quran/surah/75/19-24";
import { quranSurah75Verses25To30 } from "#corpus/quran/surah/75/25-30";
import { quranSurah75Verses31To36 } from "#corpus/quran/surah/75/31-36";
import { quranSurah75Verses37To40 } from "#corpus/quran/surah/75/37-40";

export const quranSurah75 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0642\u064a\u0627\u0645\u0629",
    short: "القيامة",
    translation: {
      en: "The Resurrection",
      id: "Hari Kiamat",
    },
    transliteration: {
      en: "Al-Qiyaama",
      id: "Al-Qiyamah",
    },
  },
  number: 75,
  numberOfVerses: 40,
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
  sequence: 31,
  tafsir: {
    id: "Surat Al Qiyaamah terdiri atas 40 ayat, termasuk golongan surat-surat Makkiyah, diturunkan sesudah surat Al Qaari'ah. Dinamai Al Qiyaamah (hari kiamat) diambil dari perkataan Al Qiyaamah yang terdapat pada ayat pertama surat ini.",
  },
  verses: [
    ...quranSurah75Verses1To6,
    ...quranSurah75Verses7To12,
    ...quranSurah75Verses13To18,
    ...quranSurah75Verses19To24,
    ...quranSurah75Verses25To30,
    ...quranSurah75Verses31To36,
    ...quranSurah75Verses37To40,
  ],
};
