import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "planmäßig gepflegte Pflanzen und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 31, lag über 22 und 24.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Dachgarten einer Schule: Farbetiketten für den Lichtbedarf",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "plants cared for on schedule and short comments from users",
        },
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: true,
          label: "The intervention value, 31, exceeded both 22 and 24.",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of colour labels for light requirements: school rooftop garden",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "tanaman yang dirawat sesuai jadwal dan komentar singkat pengguna",
        },
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 22 dan 24.",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam kebun atap sekolah: label warna untuk kebutuhan cahaya",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
