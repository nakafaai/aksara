import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte zeitgesteuerte Erinnerungen zum Öffnen der Fenster (Kontrolle der Klassenraumbelüftung) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 25, lag über 18 und 20.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Kontrolle der Klassenraumbelüftung: zeitgesteuerte Erinnerungen zum Öffnen der Fenster",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested timed reminders to open the windows in the classroom ventilation check and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 25, exceeded both 18 and 20.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of timed reminders to open the windows: classroom ventilation check",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji pengingat waktu membuka jendela pada pemantauan ventilasi kelas dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 25, melampaui 18 dan 20.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam pemantauan ventilasi kelas: pengingat waktu membuka jendela",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
