import { quranSurah104Verses1To6 } from "#corpus/quran/surah/104/1-6";
import { quranSurah104Verses7To9 } from "#corpus/quran/surah/104/7-9";

export const quranSurah104 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0647\u0645\u0632\u0629",
    short: "الهمزة",
    translation: {
      en: "The Traducer",
      id: "Pengumpat",
    },
    transliteration: {
      en: "Al-Humaza",
      id: "Al-Humazah",
    },
  },
  number: 104,
  numberOfVerses: 9,
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
  sequence: 32,
  tafsir: {
    id: "Surat Al Humazah terdiri atas 9 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Qiyaamah. Dinamai Al Humazah (pengumpat) diambil dari perkataan Humazah yang terdapat pada ayat pertama surat ini.",
  },
  verses: [...quranSurah104Verses1To6, ...quranSurah104Verses7To9],
};
