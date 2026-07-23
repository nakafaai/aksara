import { quranSurah62Verses1To6 } from "#corpus/quran/surah/62/1-6";
import { quranSurah62Verses7To11 } from "#corpus/quran/surah/62/7-11";

export const quranSurah62 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u062c\u0645\u0639\u0629",
    short: "الجمعة",
    translation: {
      en: "Friday",
      id: "Jumat",
    },
    transliteration: {
      en: "Al-Jumu'a",
      id: "Al-Jumu'ah",
    },
  },
  number: 62,
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
  sequence: 110,
  tafsir: {
    id: "Surat Al Jumu'ah ini terdiri atas 11 ayat, termasuk golongan-golongan surat-surat Madaniyyah dan diturunkan sesudah surat Ash Shaf. Nama surat Al Jumu'ah diambil dari kata Al Jumu'ah yang terdapat pada ayat 9 surat ini yang artinya: hari Jum'at.",
  },
  verses: [...quranSurah62Verses1To6, ...quranSurah62Verses7To11],
};
