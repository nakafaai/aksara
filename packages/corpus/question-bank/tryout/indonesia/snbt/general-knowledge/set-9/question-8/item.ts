import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Der Wert mit Änderung, 25, lag über 18 und 20.",
        },
        {
          isCorrect: false,
          label:
            "Unterrichtsstunden mit vollständigem Lüftungsplan und kurze Aussagen von Nutzenden",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Kontrolle der Klassenraumbelüftung: zeitgesteuerte Erinnerungen zum Öffnen der Fenster",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "The intervention value, 25, exceeded both 18 and 20.",
        },
        {
          isCorrect: false,
          label:
            "lessons with a complete ventilation schedule and short comments from users",
        },
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of timed reminders to open the windows: classroom ventilation check",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nilai pada hari dengan perubahan, 25, melampaui 18 dan 20.",
        },
        {
          isCorrect: false,
          label:
            "periode belajar dengan jadwal ventilasi lengkap dan komentar singkat pengguna",
        },
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam pemantauan ventilasi kelas: pengingat waktu membuka jendela",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
