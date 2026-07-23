import { quranSurah98Verses1To6 } from "#corpus/quran/surah/98/1-6";
import { quranSurah98Verses7To8 } from "#corpus/quran/surah/98/7-8";

export const quranSurah98 = {
  name: {
    long: "\u0633\u0648\u0631\u0629 \u0627\u0644\u0628\u064a\u0646\u0629",
    short: "البينة",
    translation: {
      en: "The Evidence",
      id: "Bukti Nyata",
    },
    transliteration: {
      en: "Al-Bayyina",
      id: "Al-Bayyinah",
    },
  },
  number: 98,
  numberOfVerses: 8,
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
  sequence: 100,
  tafsir: {
    id: "Surat Al Bayyinah terdiri atas 8 ayat, termasuk golongan surat-surat Madaniyyah, diturunkan sesudah surat Ath Thalaq. Dinamai Al Bayyinah (bukti yang nyata) diambil dari perkataan Al Bayyinah yang terdapat pada ayat pertama surat ini.",
  },
  verses: [...quranSurah98Verses1To6, ...quranSurah98Verses7To8],
};
