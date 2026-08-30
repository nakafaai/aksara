import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team prüfte zeitgesteuerte Erinnerungen zum Öffnen der Fenster (Kontrolle der Klassenraumbelüftung) und bewertete die Befunde vorsichtig.",
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
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 25, lag über 18 und 20.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team tested timed reminders to open the windows in the classroom ventilation check and interpreted the evidence cautiously.",
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
        {
          isCorrect: false,
          label: "The intervention value, 25, exceeded both 18 and 20.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim menguji pengingat waktu membuka jendela pada pemantauan ventilasi kelas dan menafsirkan buktinya secara hati-hati.",
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
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 25, melampaui 18 dan 20.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
